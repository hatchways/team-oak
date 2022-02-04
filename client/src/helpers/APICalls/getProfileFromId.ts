import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';

const getProfileFromId = async (userId: string): Promise<Profile> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/${userId}`, fetchOptions)
    .then((res) => res.json())
    .then((res) => res.data.profile)
    .catch(() => ({
      error: { message: 'Profile not found' },
    }));
};

export default getProfileFromId;
