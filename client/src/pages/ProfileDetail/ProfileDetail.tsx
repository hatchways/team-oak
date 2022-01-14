import { Grid, Box, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import useStyles from './useStyles';
import BookingForm from './BookingForm/BookingForm';

const baseUrl = 'https://images.pexels.com/photos/';

const profile = {
  name: 'Norma Byers',
  description:
    'Animals are my passion! I will look after your pets with loving care. I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!',
  aboutMe: 'Loving pet sitter',
  imageImg: baseUrl + '1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&h=650&w=650',
  backgroundImg: baseUrl + '3299905/pexels-photo-3299905.jpeg?auto=compress&cs=tinysrgb',
  location: 'Toronto, Ontario',
  aboutImg: [
    '2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb',
    '4681107/pexels-photo-4681107.jpeg?auto=compress&cs=tinysrgb',
    '2007/animal-dog-pet-cute.jpg?auto=compress&cs=tinysrgb',
    '2623968/pexels-photo-2623968.jpeg?auto=compress&cs=tinysrgb',
  ],
};

const ProfileDetail = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container className={classes.rootContainer} justify="space-evenly">
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <Box margin="0 auto" display="grid">
          <Card className={classes.profileCard}>
            <CardMedia
              className={classes.backgroundImg}
              image={profile.backgroundImg}
              title="Profile background image"
            />
            <CardContent className={classes.topCardContent}>
              <CardMedia className={classes.userImg} image={profile.imageImg} title="Profile image" />
              <Typography className={classes.userNameText}>{profile.name}</Typography>
              <Typography className={classes.userTitleText}>{profile.aboutMe}</Typography>
              <Box marginTop="20px" display="flex">
                <RoomIcon className={classes.userLocationIcon} />
                <Typography className={classes.userLocationText}>{profile.location}</Typography>
              </Box>
            </CardContent>
            <CardContent className={classes.bottomCardContent}>
              <Box marginTop="10px" width="100%" textAlign="left" marginBottom="30px">
                <Typography variant="h5" className={classes.userDescriptionHeaderText}>
                  About me
                </Typography>
                <Typography variant="body1">{profile.description}</Typography>
              </Box>
              <Box width="100%" display="flex" alignItems="center" marginBottom="15px">
                {profile.aboutImg.map((image) => (
                  <CardMedia
                    key={image}
                    className={classes.userAdditionalPhoto}
                    image={baseUrl + image}
                    title="user's additional photo"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <BookingForm></BookingForm>
      </Grid>
    </Grid>
  );
};

export default ProfileDetail;
