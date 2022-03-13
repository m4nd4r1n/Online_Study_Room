import { useRef } from 'react';
import { isSupported } from '../../lib/utils';

const useNotification = () => {
  const notificationRef = useRef(null);

  if (isSupported() && Notification.permission !== 'granted') {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (error) {
      if (error instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.error(error);
      }
    }
  }

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };

  const fireNotification = (title, options = {}) => {
    if (!isSupported()) alert(options.body);
    if (Notification.permission !== 'granted') return;
    const newOption = {
      badge: '',
      icon: '',
      ...options,
    };

    notificationRef.current = new Notification(title, newOption);

    setNotificationClickEvent();
  };

  return { fireNotification };
};

export default useNotification;
