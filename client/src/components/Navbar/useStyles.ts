import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(0, 4),
    background: 'white',
    height: '80px',
    position: 'sticky',
  },
  transparentNavbar: {
    boxShadow: 'none',
    background: 'none',
  },
  navbarItem: {
    color: theme.palette.grey[900],
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  transparentNavbarItem: {
    color: 'white',

    '&>.MuiButton-outlined': {
      color: 'white',
      borderColor: 'white',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    [theme.breakpoints.down('md')]: {
      color: 'black',

      '&>.MuiButton-outlined': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  navbarLogo: {
    width: 180,
  },
  drawer: {
    '&>.MuiPaper-root': {
      width: 140,
      display: 'block',

      '&>.MuiGrid-root': {
        padding: theme.spacing(5),
        justifyContent: 'center',
      },
    },
  },
}));
