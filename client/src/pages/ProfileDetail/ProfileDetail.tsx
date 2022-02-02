import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStyles from './useStyles';
import BookingForm from './BookingForm/BookingForm';
import { RouteComponentProps, withRouter } from 'react-router';
import getProfileFromId from '../../helpers/APICalls/getProfileFromId';

interface IProfile {
  name: string;
  photo: string;
  backgroundPhoto: string;
  about: string;
  address: string;
  description: string;
  aboutImages: Array<string>;
  rate: number;
  rating: number;
}
interface RouterProps {
  userId: string;
}

const ProfileDetail: React.FC<RouteComponentProps<RouterProps>> = ({ match }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    photo: '',
    backgroundPhoto: '',
    about: '',
    address: '',
    description: '',
    aboutImages: [],
    rate: 0,
    rating: 0,
  });

  const getProfile = useCallback(async () => {
    setLoading(true);
    try {
      const userId = match.params.userId;
      const response = await getProfileFromId(userId);
      setProfile(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [match.params.userId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />;
  }

  return (
    <Grid container className={classes.rootContainer}>
      <Grid item xs={12} sm={12} md={7} lg={7} sx={{ m: 1 }}>
        <Box className={classes.boxProfile}>
          <Card className={classes.profileCard}>
            <CardMedia
              className={classes.backgroundImg}
              component="img"
              image={profile.backgroundPhoto}
              title="Profile background image"
            />
            <CardContent className={classes.topCardContent}>
              <CardMedia className={classes.userImg} component="img" image={profile.photo} title="Profile image" />
              <Typography variant="h6" className={classes.userNameText}>
                {profile.name}
              </Typography>
              <Typography className={classes.userTitleText}>{profile.description}</Typography>
              <Box className={classes.boxLocation}>
                <LocationOnIcon className={classes.userLocationIcon} />
                <Typography className={classes.userLocationText}>{profile.address}</Typography>
              </Box>
            </CardContent>
            <CardContent className={classes.bottomCardContent}>
              <Box className={classes.boxBottomCard}>
                <Typography variant="h5" className={classes.userDescriptionHeaderText}>
                  About me
                </Typography>
                <Typography variant="body1">{profile.about}</Typography>
              </Box>
              <Box width="100%" display="flex" alignItems="center" marginBottom="15px">
                {profile.aboutImages.map((image) => (
                  <CardMedia
                    key={image}
                    component="img"
                    className={classes.userAdditionalPhoto}
                    image={image}
                    title="user's additional photo"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} sx={{ m: 1 }}>
        <BookingForm rate={profile.rate} rating={profile.rating} sitterId={match.params.userId} />
      </Grid>
    </Grid>
  );
};

export default withRouter(ProfileDetail);
