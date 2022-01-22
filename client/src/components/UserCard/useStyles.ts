import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  userCard: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    height: 400,
    paddingTop: theme.spacing(3),
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  name: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginTop: theme.spacing(2),
      color: '#000',
    },
  },
  desc: {
    '&.MuiTypography-root': {
      color: theme.palette.grey[600],
    },
  },
  about: {
    color: '#000',
    width: '60%',
    fontSize: '1rem',
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    borderTop: '1px solid #c7c5c570',
    padding: theme.spacing(3),
    color: theme.palette.grey[600],
  },
}));
