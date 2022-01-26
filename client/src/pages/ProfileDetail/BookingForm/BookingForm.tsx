import { useState } from 'react';
import useStyles from './useStyles';
import { CardContent, Box, Typography, Grid, Button, Card, Rating } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useFormik } from 'formik';

interface Props {
  rate: number;
  rating: number;
}

const BookingForm = ({ rate, rating }: Props): JSX.Element => {
  const classes = useStyles();

  const bookForm = useFormik({
    initialValues: {
      startDateTime: '',
      endDateTime: '',
    },
    onSubmit: (values) => {
      alert(`
        startDateTime: ${values.startDateTime}\n
        endDateTime: ${values.endDateTime}\n
      `);
      bookForm.resetForm();
    },
  });

  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());

  return (
    <Card className={classes.bookingFormCard}>
      <CardContent>
        <form onSubmit={bookForm.handleSubmit} className={classes.bookingForm}>
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
                  value={startDateTime}
                  onChange={(date) => {
                    setStartDateTime(date);
                  }}
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
                  value={endDateTime}
                  onChange={(date) => {
                    setEndDateTime(date);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Box>
          <Grid className={classes.buttonContainer}>
            <Button size="large" variant="contained" type="submit">
              Send Request
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
