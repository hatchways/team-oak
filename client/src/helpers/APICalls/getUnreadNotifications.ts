import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

const getUnreadNotifications = async (): Promise<Notification[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notifications/getUnread`, fetchOptions)
    .then((res) => res.json())
    .then((res) => res.data.notifications)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUnreadNotifications;
