import React, { useRef, useEffect } from 'react';
import { ContentsBlock } from '../common/Contents';
import { StudyButton } from '../common/Button';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetector = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

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
    }
  };

  const detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      renderPredictions(predictions);
      requestAnimationFrame(() => {
        detectFrame(video, model);
      });
    });
  };

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

  return (
    <ContentsBlock>
      <div
        style={{
          width: 'auto',
          height: '500px',
          position: 'relative',
          top: '0px',
          left: '0px',
        }}
      >
        <video
          className="size"
          autoPlay
          playsInline
          muted={true}
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
      </div>
      <StudyButton to="/home" type="stop" />
    </ContentsBlock>
  );
};

export default ObjectDetector;
