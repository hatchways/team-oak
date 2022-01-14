import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  left: {
    padding: theme.spacing(15, 15, 0),

    [theme.breakpoints.down('md')]: {
      display: 'grid',
      placeItems: 'center',
    },
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(),
  },
  imageWrapper: {
    width: '100%',
    height: '100vh',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  submitBtn: {
    '&.MuiButton-root': {
      boxShadow: 'none',
      fontWeight: 500,
      padding: '15px',
      width: 210,
      height: 56,
      marginTop: theme.spacing(3),
    },
  },
}));
