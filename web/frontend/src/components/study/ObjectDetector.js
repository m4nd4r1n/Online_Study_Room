import React, { useRef, useState, useEffect, useCallback } from 'react';
import '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import { ContentsBlock } from '../common/Contents';
import TimerContainer from '../../containers/timer/TimerContainer';
import { StudyButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../lib/socket/client';
import { setStudyState, uploadFrame } from '../../lib/api/study';
import useInterval from '../timer/useInterval';

const ObjectDetector = ({ user }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const capture = useRef();
  const peerConnectionRef = useRef(); // peer 연결
  const navigate = useNavigate();
  const [client, setClient] = useState(createClient()); // 소켓 클라이언트
  const [rejectedFrame, setRejectedFrame] = useState(null); // 인증 거부된 프레임
  const [loading, setLoading] = useState(true); // 카메라, 모델 로딩
  const [object, setObject] = useState({ 'cell phone': 0, noPerson: 0 });

  const { userId } = user;
  const { 'cell phone': cell_phone, noPerson } = object;

  const listener = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', listener);
    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, []);

  const handleIce = useCallback(
    (data) => {
      client.send(
        '/pub/study/message',
        JSON.stringify({
          userId,
          type: 'ice',
          ice: data.candidate,
        }),
        {},
      );
    },
    [client, userId],
  );

  const createPeer = useCallback(() => {
    const peerConnection = new RTCPeerConnection({
      // 테스트용 구글 STUN 서버
      // 실사숑 시 개인 STUN 서버 운용 필요
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            //'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });

    // IceCandidate 설정
    peerConnection.onicecandidate = handleIce;
    webcamRef.current.video.srcObject
      .getVideoTracks()
      .forEach((track) =>
        peerConnection.addTrack(track, webcamRef.current.video.srcObject),
      );

    peerConnectionRef.current = peerConnection;
  }, [handleIce]);

  const sendOffer = useCallback(async () => {
    // offer 생성 (초대장)
    const offer = await peerConnectionRef.current.createOffer();
    peerConnectionRef.current.setLocalDescription(offer);
    // room에 offer 전달
    client.send(
      '/pub/study/message',
      JSON.stringify({ userId, type: 'offer', offer }),
      {},
    );
  }, [client, userId]);

  // 구독중인 룸의 메시지 수신 이벤트 핸들러
  const handleMessage = useCallback(
    (msg) => {
      const message = JSON.parse(msg.body);
      switch (message.type) {
        // 누군가 입장 시 offer 전달
        case 'enter':
          createPeer();
          sendOffer();
          break;
        case 'offer':
          // 학습페이지에서는 offer 수신해도 동작 x
          break;
        case 'answer':
          peerConnectionRef.current.setRemoteDescription(message.answer);
          break;
        case 'ice':
          peerConnectionRef.current.addIceCandidate(message.ice);
          break;
        default:
          console.log(`Unexpected message type : ${message.type}`);
          break;
      }
    },
    [createPeer, sendOffer],
  );

  useEffect(() => {
    client &&
      client.connect({}, () => {
        // 메시지 구독
        client.subscribe(`/sub/study/room/${userId}`, handleMessage);
      });
    return () => {
      if (client && client.connected) {
        client.unsubscribe({});
        client.disconnect();
      }
    };
  }, []);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load({ base: 'mobilenet_v2' });
    console.log('model loaded.');
    //  Loop and detect object
    setLoading(false);
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const drawRect = (detections, ctx) => {
    // Loop through each prediction
    detections.forEach((prediction) => {
      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox'];
      const text = prediction['class'];
      if (text === 'cell phone') {
        setObject((prev) => ({ ...prev, [text]: prev[text] + 1 }));
      }

      // Set styling
      ctx.strokeStyle = '#009f9f';
      ctx.font = '18px Arial';

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = '#00ffff';
      ctx.fillText(text, x, y + 15);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext('2d');
      drawRect(obj, ctx);
      if (!obj.find((elem) => elem.class === 'person')) {
        setObject((prev) => ({ ...prev, noPerson: prev.noPerson + 1 }));
      }
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  // 프레임 캡쳐
  const captureFrame = () => {
    // 몇몇 브라우저에서 이미지캡쳐 api 지원 X
    const sUsrAg = navigator.userAgent;

    if (
      sUsrAg.indexOf('Chrome') > -1 ||
      sUsrAg.indexOf('Edg') > -1 ||
      sUsrAg.indexOf('Opera') > -1
    ) {
      new ImageCapture(webcamRef.current.video.srcObject.getVideoTracks()[0])
        .grabFrame()
        .then((data) =>
          new Promise((res) => {
            // 이미지 크기 조정
            capture.current.width = 300;
            capture.current.height = 200;

            // imagebitmap to blob
            const ctx = capture.current.getContext('bitmaprenderer');
            if (ctx) {
              ctx.width = 300;
              ctx.height = 200;
              ctx.transferFromImageBitmap(data);
            }
            capture.current.toBlob(res);
          }).then((blob) => {
            setRejectedFrame(blob);
          }),
        );
    }
  };

  useEffect(() => {
    if (
      (cell_phone > 0 && cell_phone % 10 === 0) ||
      (noPerson > 0 && noPerson % 10 === 0)
    ) {
      captureFrame();
    }
    console.log(cell_phone, noPerson);
  }, [cell_phone, noPerson]);

  useInterval(async () => {
    if (cell_phone > 300 || noPerson > 300) {
      console.log('학습 미인정');
      await uploadFrame(rejectedFrame);
    } else {
      console.log('학습 인정');
    }
    setObject(() => ({ 'cell phone': 0, noPerson: 0 }));
  }, 1000 * 60 * 10);

  return (
    <ContentsBlock>
      <canvas ref={capture} className="hidden" />
      <div className="relative mt-16 flex flex-col items-center justify-center">
        {loading && <div>카메라를 불러오는 중입니다...</div>}
        <Webcam ref={webcamRef} muted className="ml-auto mr-auto" />
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 z-10 ml-auto mr-auto"
        />
      </div>
      <TimerContainer isStudy />
      <StudyButton
        onClick={() => {
          if (window.confirm('학습을 종료하시겠습니까?')) {
            setStudyState().then(() => {
              navigate('/', { replace: true });
              window.location.reload();
            });
          }
        }}
        type="stop"
      />
    </ContentsBlock>
  );
};

export default ObjectDetector;
