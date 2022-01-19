import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  bookingFormCard: {
    width: '100%',
    justifySelf: 'flex-end',
  },
  bookingForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userRateText: {
    color: 'black',
    fontWeight: '500',
  },
  profileDetailsForm: {
    width: '100%',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileDetailsLabel: {
    color: 'black',
    marginBotton: '2rem',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  profileDetailsFormContainer: {
    width: '50%',
    display: 'grid',
  },
  profileDetailsFormInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileDetailsFormSelect: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonContainer: {
    marginTop: 20,
  },
}));

export default useStyles;
