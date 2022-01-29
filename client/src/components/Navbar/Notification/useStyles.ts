import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  notification: {
    position: 'absolute',
    top: '12px',
    right: '5px',
    backgroundColor: '#1FC413',
    width: 6,
    height: 6,
    borderRadius: '50%',
    zIndex: -100,
  },
  btn: {
    position: 'relative',
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      color: 'black',
      fontSize: '0.9rem',
      padding: 0,
    },
  },
  menu: {
    width: '450px',
  },
  desc: {
    '&>.MuiTypography-root': {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: 'black',
    },
  },
  title: {
    '&>.MuiTypography-root': {
      fontSize: '0.7rem',
      marginTop: theme.spacing(-0.5),
      marginBottom: theme.spacing(),
    },
  },
  date: {
    '&>.MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
}));
