import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Platform, Dimensions, LogBox } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import tw from 'twrnc';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Canvas from 'react-native-canvas';

LogBox.ignoreLogs([
  'tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead',
]);

let frame = 0;
const computeRecognitionEveryNFrames = 10;

const { width, height } = Dimensions.get('window');

const TensorCamera = cameraWithTensors(Camera);
const textureDims =
  Platform.OS === 'ios'
    ? {
        height: 1920,
        width: 1080,
      }
    : {
        height: 1200,
        width: 1600,
      };

const ObjectDetect = ({ navigation: { replace } }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState();
  let context = useRef();
  let canvas = useRef();
  const handleCameraStream = (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (model) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          if (nextImageTensor) {
            model
              .detect(nextImageTensor)
              .then((prediction) => {
                console.log(prediction);
                draw(prediction, nextImageTensor);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        frame += 1;
        frame = frame % computeRecognitionEveryNFrames;
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  const draw = (predictions, nextImageTensor) => {
    if (!context.current || !canvas.current) return;
    const scaleWidth = width / nextImageTensor.shape[1];
    const scaleHeight = height / nextImageTensor.shape[0];
    const flipHorizontal = Platform.OS === 'ios' ? false : true;

    context.current.clearRect(0, 0, width, height);

    for (const prediction of predictions) {
      const [x, y, width, height] = prediction.bbox;
      const boundingBoxX = flipHorizontal
        ? canvas.current.width - x * scaleWidth - width * scaleWidth
        : x * scaleWidth;
      const boundingBoxY = y * scaleHeight;

      context.current.strokeRect(
        boundingBoxX,
        boundingBoxY,
        width * scaleWidth,
        height * scaleHeight,
      );

      context.current.strokeText(
        prediction.class,
        boundingBoxX - 5,
        boundingBoxY - 5,
      );
    }
  };

  const handleCanvas = async (can) => {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx = can.getContext('2d');
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.lineWidth = 3;
      context.current = ctx;
      canvas.current = can;
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await tf.ready();
      setModel(await cocossd.load({ base: 'mobilenet_v2' }));
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!model) {
    return <Text>Model not loaded</Text>;
  }
  return (
    <View style={tw`flex-1`}>
      <Button onPress={() => replace('Login')}>로그인 화면 이동</Button>
      <TensorCamera
        style={tw`flex-1`}
        type={Camera.Constants.Type.back}
        onReady={handleCameraStream}
        autorender={true}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeDepth={3}
        resizeHeight={200}
        resizeWidth={152}
        useCustomShadersToResize={false}
      />
      <Canvas style={tw`absolute z-50 w-full h-full`} ref={handleCanvas} />
    </View>
  );
};

export default ObjectDetect;
