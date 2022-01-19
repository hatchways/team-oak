import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const demo = async (): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '',
    credentials: 'include',
  };
  return await fetch(`/auth/demo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default demo;
