/**
 * StompJs를 사용한 socket통신
 *
 * https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html 참고
 *
 * https://dev-gorany.tistory.com/235 백서버는 여기 참고
 */

import { Client } from '@stomp/stompjs';

const client = new Client({
  brokerURL: 'ws://localhost:8080/', // endpoint
  connenctHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: (str) => {
    console.log(str);
  },
  reconnectDelay: 5000, // 자동 재연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// 연결 시 실행할 함수
client.onConnect = (frame) => {
  console.log('Connection successful');
};

// 에러처리 함수
client.onStompError = (frame) => {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

// 활성화
client.activate();

// 비활성화
//client.deactivate();

export default client;
