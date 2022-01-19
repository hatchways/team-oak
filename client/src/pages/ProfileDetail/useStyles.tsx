import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    marginTop: '1em',
    justifyContent: 'center',
    alignItems: 'flex-start',
    spacing: 1,
    marginBottom: '1em',
  },
  profileCard: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxProfile: {
    margin: '0 auto',
    display: 'grid',
  },
  topCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxLocation: {
    marginTop: '1.25rem',
    display: 'flex',
  },
  backgroundImg: {
    width: '100%',
    height: '30vh',
    objectFit: 'cover',
  },
  userImg: {
    width: '20vh',
    height: '20vh',
    objectFit: 'cover',
    borderRadius: '50%',
    border: 'white 2px solid',
    boxSizing: 'border-box',
    marginTop: '-15vh',
    boxShadow: 'rgba(0, 0, 0, 0.50) 0px 3px 8px',
  },
  userNameText: {
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  userTitleText: {
    color: 'darkGrey',
    fontSize: 16,
  },
  userLocationText: {
    color: 'darkGrey',
    fontSize: 14,
  },
  userLocationIcon: {
    height: 20,
    width: 'auto',
    marginRight: 5,
    color: theme.palette.primary.main,
  },
  bottomCardContent: {
    padding: 10,
  },
  boxBottomCard: {
    width: '100%',
    textAlign: 'left',
    marginBottom: '1.875rem',
  },
  userDescriptionHeaderText: {
    color: 'black',
    fontWeight: 'bold',
  },
  userDescriptionText: {
    marginTop: 10,
    color: 'black',
  },
  userAdditionalPhoto: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    marginRight: 20,
    borderRadius: 5,
  },
}));

export default useStyles;
