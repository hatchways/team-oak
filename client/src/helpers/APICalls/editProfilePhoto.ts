import { PhotoLink } from '../../interface/PhotoLink';
import { PhotoUpload } from '../../interface/FetchOptions';

const editProfilePhoto = async (data: FormData): Promise<PhotoLink> => {
  const fetchOptions: PhotoUpload = {
    method: 'POST',
    body: data,
    credentials: 'include',
  };
  return await fetch(`/profilePhoto/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editProfilePhoto;
