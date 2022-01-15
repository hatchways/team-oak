import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface ProfilePhotoProps {
  header: string;
  imageUrl: string;
}

const openFileSelector = () => {
  document.getElementById('photoInput')?.click();
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, imageUrl }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: '20px',
          marginBottom: 6,
        }}
      >
        {header}
      </Typography>

      <Avatar
        id="photo"
        src={imageUrl}
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

      <Input id="photoInput" type="file" sx={{ display: 'block', visibility: 'hidden' }} />

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
