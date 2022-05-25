import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Chatting from '../../components/chat/Chatting';
import client from '../../lib/chat/client';
import { getUserInfo } from '../../modules/userInfo';

const ChatContainer = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, info } = useSelector(({ user, userInfo }) => ({
    user: user.user,
    info: userInfo.info,
  }));

  useEffect(() => {
    if (!info) {
      dispatch(getUserInfo());
    }
  }, [dispatch, info]);

  useEffect(() => {
    (async () => {
      await client.connectUser(
        {
          id: user?.userId.replace(/@/g, '').replace(/\./g, ''),
          name: info?.name,
        },
        client.devToken(user?.userId.replace(/@/g, '').replace(/\./g, '')),
      );
      if (user?.role === '멘티' && info?.mtrId) {
        const channel = client.channel('messaging', {
          name: info?.name,
          members: [
            user?.userId?.replace(/@/g, '')?.replace(/\./g, ''),
            info?.mtrId?.replace(/@/g, '')?.replace(/\./g, ''),
          ],
        });
        await channel.create();
      }
      if (userId && info) {
        const name = info?.menteeList?.find((data) => data.id === userId)?.name;
        if (name) {
          const channel = client.channel('messaging', {
            name,
            members: [
              user?.userId?.replace(/@/g, '')?.replace(/\./g, ''),
              userId.replace(/@/g, '').replace(/\./g, ''),
            ],
          });
          await channel.create();
        }
      }
    })();
    return () => {
      client.disconnectUser();
    };
  }, []);

  return <Chatting userId={user?.userId} />;
};

export default ChatContainer;
