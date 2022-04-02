import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ContentsBlock } from '../common/Contents';
import { createClient } from './../../lib/socket/client';

const VideoViewer = () => {
  const { userId } = useParams();

  const [loading, setLoading] = useState(true); // 카메라, 모델 로딩
  const [client, setClient] = useState(createClient()); // 소켓 클라이언트
  const peerConnectionRef = useRef(); // peer 연결
  const [dataChannel, setDataChannel] = useState();
  const videoRef = useRef();

  const handleIce = useCallback(
    (data) => {
      client.send(
        '/pub/study/message',
        JSON.stringify({ userId, type: 'ice', ice: data.candidate }),
        {},
      );
    },
    [client, userId],
  );

  // const handleAddStream = useCallback((data) => {
  //   videoRef.current.srcObject = data.stream;
  //   setLoading(false);
  // }, []);
  const handleOnTrack = useCallback((data) => {
    videoRef.current.srcObject = data.streams[0];
    setLoading(false);
  }, []);

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
    //peerConnection.addEventListener('addstream', handleAddStream);
    peerConnection.ontrack = handleOnTrack;

    // videoRef.current.srcObject
    //   .getVideoTracks()
    //   .forEach((track) => peerConnection.addTrack(track, videoRef));

    peerConnectionRef.current = peerConnection;
  }, [handleIce, handleOnTrack]);

  const receiveOffer = useCallback(
    async (offer) => {
      peerConnectionRef.current.addEventListener('datachannel', (e) => {
        setDataChannel(e.channel);
        dataChannel.addEventListener('message', console.log);
      });
      peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      peerConnectionRef.current.setLocalDescription(answer);
      // answer 전달
      client.send(
        '/pub/study/message',
        JSON.stringify({ userId, type: 'answer', answer }),
        {},
      );
    },
    [client, dataChannel, userId],
  );

  // 구독중인 룸의 메시지 수신 이벤트 핸들러
  const handleMessage = useCallback(
    (msg) => {
      const message = JSON.parse(msg.body);
      console.log(message);
      switch (message.type) {
        case 'enter':
          // offer를 받을 것이므로 enter 수신해도 offer 전송 x
          break;
        case 'offer':
          receiveOffer(message.offer);
          break;
        case 'answer':
          // answer를 전달하는 주체이므로 수신해도 동작 x
          break;
        case 'ice':
          peerConnectionRef.current.addIceCandidate(message.ice);
          break;
        default:
          console.log(`Unexpected message type : ${message.type}`);
          break;
      }
    },
    [receiveOffer],
  );

  useEffect(() => {
    client.connect({}, () => {
      // 메시지 구독
      client.subscribe(`/sub/study/room/${userId}`, handleMessage);

      // 학부모, 멘토는 enter 메시지 전송
      if (userId) {
        client.send(
          '/pub/study/message',
          JSON.stringify({ userId, type: 'enter' }),
          {},
        );
      }
    });
    return () => {
      if (client && client.connected) {
        client.unsubscribe({});
        client.disconnect();
      }
    };
  }, [client, userId, handleMessage]);

  useEffect(() => {
    createPeer();
  }, [createPeer]);

  return (
    <ContentsBlock>
      <div
        style={{
          width: 'auto',
          height: 'auto',
          marginTop: '150px',
        }}
      >
        {loading && <div>카메라를 불러오는 중입니다...</div>}
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={videoRef}
          width="568"
          height="500"
          style={{ display: 'inline' }}
        />
      </div>
    </ContentsBlock>
  );
};

export default VideoViewer;
