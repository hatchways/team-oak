import { useState } from 'react';
import useStyles from './useStyles';
import {
  CardContent,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  Rating,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import createBooking from '../../../helpers/APICalls/createBooking';
import { Formik } from 'formik';

interface Props {
  rate: number;
  rating: number;
  sitterId: string;
}

const BookingForm = ({ rate, rating, sitterId }: Props): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async ({ start, end, sitterId }: { start: Date; end: Date; sitterId: string }) => {
    const data = {
      start,
      end,
      sitterId,
    };
    try {
      await createBooking(data);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card className={classes.bookingFormCard}>
      <CardContent>
        <Formik
          initialValues={{
            start: new Date(),
            end: new Date(),
            sitterId: sitterId,
          }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box className={classes.bookingForm}>
                <Typography variant="h4" className={classes.userRateText}>
                  {rate}/hr
                </Typography>
                <Rating defaultValue={0} value={rating} precision={0.5} readOnly />
                <Box className={classes.profileDetailsForm}>
                  <Grid className={classes.profileDetailsFormContainer}>
                    <Typography variant="h6" className={classes.profileDetailsLabel}>
                      Drop off
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={values.start}
                        onChange={(value) => setFieldValue('start', value)}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Box>

                <Box className={classes.profileDetailsForm}>
                  <Grid className={classes.profileDetailsFormContainer}>
                    <Typography variant="h6" className={classes.profileDetailsLabel}>
                      Pick up
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={values.end}
                        onChange={(value) => setFieldValue('end', value)}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Box>
                <Grid className={classes.buttonContainer}>
                  <Button size="large" variant="contained" type="submit">
                    {isSubmitting ? <CircularProgress /> : 'Send Request'}
                  </Button>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </CardContent>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Booking created successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default BookingForm;
