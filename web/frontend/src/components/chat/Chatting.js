import React from 'react';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';
import client from '../../lib/chat/client';

const Chatting = ({ userId }) => {
  return (
    <Chat client={client}>
      <ChannelList
        filters={{
          members: {
            $in: [userId.replace(/@/g, '').replace(/\./g, '')],
          },
        }}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default Chatting;
