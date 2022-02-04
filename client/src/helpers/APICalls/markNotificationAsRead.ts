import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

const markNotificationAsRead = async (id: string): Promise<Notification[]> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    credentials: 'include',
  };
  return await fetch(`/notifications/markAsRead`, fetchOptions)
    .then((res) => res.json())
    .then((res) => res.data.notification)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default markNotificationAsRead;
