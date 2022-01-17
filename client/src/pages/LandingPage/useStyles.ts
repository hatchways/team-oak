import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  left: {
    paddingTop: theme.spacing(15),
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(10),

    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(6),
    },

    [theme.breakpoints.down('md')]: {
      display: 'grid',
      placeItems: 'center',
      paddingRight: theme.spacing(10),
    },

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(),
    },
  },
  heading: {
    '&.MuiTypography-root': {
      marginBottom: theme.spacing(7),
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 600,
      color: '#000',
      lineHeight: '4rem',

      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        lineHeight: '3rem',
      },
    },
  },
  formWrapper: {
    width: '65%',

    [theme.breakpoints.down('lg')]: {
      width: '75%',
    },
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
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

      [theme.breakpoints.down('md')]: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  },
}));
