import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  notification: {
    position: 'absolute',
    top: '3px',
    right: '-4px',
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
      display: 'block',
      margin: theme.spacing(0, 'auto'),

      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
      },
    },
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid black',
    margin: theme.spacing(0, 'auto'),
  },
  menu: {
    width: '450px',
    borderTop: '3px solid black',
    marginTop: theme.spacing(0.625),
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
