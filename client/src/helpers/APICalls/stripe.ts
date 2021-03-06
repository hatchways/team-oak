import { FetchOptions } from '../../interface/FetchOptions';
import { StripeLink } from '../../interface/StripeLink';

const getLink = async (): Promise<StripeLink> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/connect/stripe`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getLink;
