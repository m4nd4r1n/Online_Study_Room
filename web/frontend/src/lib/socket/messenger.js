import client from './client';

/**
 * 메시지 구독
 * JSON 객체 수신 시 JSON.parse(message.body) 필요
 * frontend\src\containers\messenger\MessengerContainer.js 에서
 * onMessage 함수 확인가능
 *
 * @param {onMessage} 메시지 수신 시 실행하는 콜백함수
 */
export const subscribe = ({ messengerId, onMessage }) =>
  client.subscribe(`/messenger/${messengerId}`, onMessage);

/**
 * 메시지 송신
 * JSON 객체 전송 시 JSON.stringify(JSON객체)
 */
export const sendMessage = ({ messengerId, message }) =>
  client.publish({
    destination: `/messenger/${messengerId}`,
    body: message,
    skipContentLengthHeader: true,
  });
