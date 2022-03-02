import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ContentsBlock } from '../common/Contents';
import { StudyButton } from '../common/Button';
import useInterval from '../timer/useInterval';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetector = () => {
  let captureFlag = true; // 캡쳐 제한 플래그
  let rejectCount = 0; // 학습인증 실패 횟수

  const [loading, setLoading] = useState(true); // 카메라, 모델 로딩
  const [rejectedFrame, setRejectedFrame] = useState(null); // 인증 거부된 프레임
  const [track, setTrack] = useState(); // 비디오 트랙
  const videoRef = useRef();
  const canvasRef = useRef();
  const capture = useRef();

  // 실공시간 체크
  const checkActualStudyTime = (predictions) => {
    let studyFlag = false;
    const person = predictions.filter(
      (prediction) => prediction.class === 'person',
    );
    const items = predictions.filter(
      (prediction) =>
        prediction.class === 'laptop' || prediction.class === 'book',
    );

    // // 사람, 학습도구 미인식 시
    // if (person && items.length > 0) {
    //   items.forEach((item) => {
    //     const x0 =
    //       item.bbox[0] > person.bbox[0] ? item.bbox[0] : person.bbox[0];
    //     const y0 =
    //       item.bbox[1] > person.bbox[1] ? item.bbox[1] : person.bbox[1];
    //     const x1 =
    //       item.bbox[0] + item.bbox[2] < person.bbox[0] + person.bbox[2]
    //         ? item.bbox[0] + item.bbox[2]
    //         : person.bbox[0] + person.bbox[2];
    //     const y1 =
    //       item.bbox[1] + item.bbox[3] > person.bbox[1] + person.bbox[3]
    //         ? item.bbox[1] + item.bbox[3]
    //         : person.bbox[1] + person.bbox[3];

    //     // 각 영역이 겹치지 않을 시
    //     if (x0 > x1 || y0 > y1) return;

    //     const personArea = person.bbox[1] * person.bbox[3];
    //     const overlapppingArea = (x1 - x0) * (y1 - y0);

    //     // 사람과 물건 영역이 30% 이상 곂치면 학습인정
    //     if (overlapppingArea / personArea > 0.3) studyFlag = true;
    //   });
    // }

    // 학습 인정 X, 최대 1분에 한번 캡쳐 (+ 후 프레임 전송)
    //if (!studyFlag && captureFlag) {
    if (person.length === 0 || items.length === 0) {
      if (captureFlag === true) {
        captureFlag = false;
        captureFrame();
      }
      rejectCount = rejectCount + 1; // 거부횟수
    }
  };

  // 프레임 캡쳐
  const captureFrame = () => {
    console.log('캡쳐');

    // 몇몇 브라우저에서 이미지캡쳐 api 지원 X
    const sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf('Firefox') > -1) {
      console.log('browser error');
      return;
    }

    setTrack(videoRef.current.srcObject.getVideoTracks()[0]);

    new ImageCapture(track).grabFrame().then((data) =>
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
  };

  // 웹캠 및 텐서플로우 객체감지 수행 함수
  const run = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'user',
          },
        })
        .then((stream) => {
          window.stream = stream;
          videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = cocoSsd.load();

      Promise.all([modelPromise, webCamPromise])
        .then((values) => {
          detectFrame(videoRef.current, values[0]);
        })
        .catch((error) => {
          console.error(error);
        });

      // 로딩 해제
      setLoading(false);
    }
  };

  // 프레임 객체 감지
  const detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      renderPredictions(predictions); // 객체 박스 렌더링 필요 x 시 삭제
      checkActualStudyTime(predictions);

      // 다음 리페인트 전에 애니메이션 업데이트 콜백함수 실행
      requestAnimationFrame(() => {
        detectFrame(video, model);
      });
    });
  };

  // 예측 객체 렌더링
  const renderPredictions = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // font options
    const font = '16px sans-serif';
    ctx.font = font;
    ctx.textBaseline = 'top';
    predictions.forEach((prediction) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];

      // 박스 그리기
      ctx.strockeStyle = '#00FFFF';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // 백그라운드 라벨 그리기
      ctx.fillStyle = '#00FFFF';
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach((prediction) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];

      // 텍스트가 맨 위에 오도록
      ctx.fillStyle = '#000000';
      ctx.fillText(prediction.class, x, y);
    });
  };

  useEffect(() => {
    run();
  });

  useInterval(() => {
    console.log(rejectCount);
    //captureFrame(); // 캡쳐 테스트
    captureFlag = true; // 캡쳐가능
    setRejectedFrame(); // 캡쳐화면 초기화
  }, 60000); // 1분 = 1000(1초) * 60

  useInterval(() => {
    if (rejectCount > 7) {
      // 10분간 학습 비인정 8번 이상 발생 시 학습 미인정
      console.log('학습 인정 x');
    } else {
      // 학습 인정
      console.log('학습 인정');
    }
    rejectCount = 0; // 인증 X 카운트 초기화
  }, 600000); // 10분 = 1000(1초) * 60 * 10

  return (
    <ContentsBlock>
      <canvas ref={capture} style={{ display: '' }} />
      <div
        style={{
          width: 'auto',
          height: '500px',
          position: 'relative',
          top: '0px',
          left: '0px',
        }}
      >
        {loading ? (
          <div>로딩중입니다...</div>
        ) : (
          <>
            <video
              className="size"
              autoPlay
              playsInline
              muted
              ref={videoRef}
              width="568"
              height="500"
              style={{ position: 'absolute', top: '0px', left: '0px' }}
            />
            <canvas
              className="size"
              ref={canvasRef}
              width="568"
              height="500"
              style={{ position: 'absolute', top: '0px', left: '0px' }}
            />
          </>
        )}
      </div>
      <StudyButton to="/home" type="stop" />
    </ContentsBlock>
  );
};

export default ObjectDetector;
