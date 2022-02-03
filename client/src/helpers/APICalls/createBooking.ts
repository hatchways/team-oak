import { FetchOptions } from '../../interface/FetchOptions';

const register = async ({ start, end, sitterId }: { start: Date; end: Date; sitterId: string }): Promise<Request> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start, end }),
    credentials: 'include',
  };
  return await fetch(`/requests/${sitterId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default register;
