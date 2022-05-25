import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(process.env.REACT_APP_CHAT_API);

export default client;
