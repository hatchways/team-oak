import { Typography } from '@mui/material';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import editProfilePhoto from '../../../helpers/APICalls/editProfilePhoto';
import { PhotoLink } from '../../../interface/PhotoLink';
import React, { useState } from 'react';

interface ProfilePhotoProps {
  header: string;
}

const openFileSelector = () => {
  document.getElementById('photoInput')?.click();
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header }) => {
  const { updateSnackBarMessage } = useSnackBar();
  const { profile } = useAuth();
  const [preview, setPreview] = useState('');

  const uploadHandler = async (e: any) => {
    const file = e.target.files[0];
    if (file['type'].split('/')[0] === 'image') {
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('image', file);

      await editProfilePhoto(formData).then((data: PhotoLink) => {
        if (data.success) {
          updateSnackBarMessage('Profile photo updated!');
        } else if (data.error) {
          updateSnackBarMessage('An error occured while uploading your photo');
        }
      });
    } else {
      updateSnackBarMessage('Please upload image files only');
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <SettingHeader header={header} />
      <Avatar
        id="photo"
        src={preview || profile?.photo || ''}
        sx={{
          width: 100,
          height: 100,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          fontSize: '13px',
          marginTop: '1rem',
          color: '#aaaaaa',
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        Be sure to use a photo that clearly shows your face
      </Typography>

      <Input id="photoInput" type="file" sx={{ display: 'block', visibility: 'hidden' }} onChange={uploadHandler} />

      <Button
        sx={{
          textTransform: 'none',
          marginBottom: '2rem',
          height: 50,
          width: 250,
          border: '1px solid #f14140',
        }}
        onClick={openFileSelector}
      >
        Upload a file from your device
      </Button>

      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          mx: 'auto',
          width: '105px',
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 400,
            fontSize: '13px',
            color: '#aaaaaa',
            marginLeft: '1rem',
          }}
        >
          Delete photo
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
