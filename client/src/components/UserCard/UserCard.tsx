import { Box } from '@mui/system';
import { useStyles } from './useStyles';
import { Avatar, Typography } from '@mui/material';
import { Star, LocationOn } from '@mui/icons-material';

interface Props {
  photo: string;
  name: string;
  description: string;
  rating: number;
  about: string;
  location: string;
  rate: number;
}

const UserCard = ({ photo, name, description, rating, about, location, rate }: Props): JSX.Element => {
  const classes = useStyles();

  const greyStars = new Array(5).fill('#c5c5c5');
  const stars = rating && greyStars.fill('#ffc720', 0, rating);

  return (
    <Box className={classes.userCard}>
      <Avatar src={photo} sx={{ width: 100, height: 100 }} />

      <Typography className={classes.name}>{name}</Typography>

      <Typography className={classes.desc}>{description}</Typography>

      <Box sx={{ marginTop: 1 }}>
        {rating
          ? stars && stars.map((color, idx) => <Star key={idx} sx={{ color: { color } }} />)
          : greyStars.map((color, idx) => <Star key={idx} sx={{ color: { color } }} />)}
      </Box>

      <Typography className={classes.about}>{about}</Typography>

      <Box className={classes.footer}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ color: '#f14140', marginRight: 1 }} />
          <Typography>{location}</Typography>
        </Box>

        <Typography sx={{ fontWeight: 'bold', color: '#000' }}>{`$${rate}/hr`}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
