import React, { useEffect, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import tw from 'twrnc';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

let frame = 0;
const computeRecognitionEveryNFrames = 10;

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

const ObjectClassify = ({ navigation: { replace } }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState();
  const [objects, setObjects] = useState([]);
  const handleCameraStream = (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (model) {
        if (frame % computeRecognitionEveryNFrames === 0) {
          if (nextImageTensor) {
            model
              .classify(nextImageTensor)
              .then((prediction) => {
                console.log(prediction);
                setObjects(prediction);
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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await tf.ready();
      setModel(await mobilenet.load({ version: 2, alpha: 1.0 }));
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
      {objects?.map((data, i) => (
        <View key={i} style={tw`flex-row`}>
          <Text>{data.className}</Text>
          <Text> </Text>
          <Text>{data.probability}</Text>
        </View>
      ))}
    </View>
  );
};

export default ObjectClassify;
