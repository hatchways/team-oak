import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    marginTop: '2em',
  },
  profileCard: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2em',
  },
  topCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundImg: {
    width: '100%',
    height: '25vh',
    objectFit: 'cover',
  },
  userImg: {
    width: '15vh',
    height: '15vh',
    objectFit: 'cover',
    borderRadius: '50%',
    border: 'white 7px solid',
    boxSizing: 'border-box',
    marginTop: '-6vh',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  userNameText: {
    marginTop: 20,
    color: 'black',
    fontSize: 22,
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
    padding: 30,
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
