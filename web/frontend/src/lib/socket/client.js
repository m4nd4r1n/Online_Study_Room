/**
 * StompJs를 사용한 socket통신
 *
 * https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html 참고
 *
 * https://dev-gorany.tistory.com/235 백서버는 여기 참고
 */
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

// 클라이언트 생성
export const createClient = () => {
  let url = '/stomp';
  if (process.env.NODE_ENV === 'production') {
    url = 'http://localhost:8080/stomp';
  }
  const sock = new SockJS(url);
  const client = webstomp.over(sock, { debug: false });

  return client;
};
