import useStyles from './useStyles';
import { Box, Typography, Select, MenuItem, OutlinedInput, Grid, Button, Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useFormik } from 'formik';

const bookDetail = {
  rate: 14,
};
const timeSlot = [...Array(24).keys()].map((number) => {
  if (number == 0) {
    return {
      time: '12:00 AM',
      value: number,
    };
  } else if (number < 12) {
    return {
      time: number.toString() + ':00 AM',
      value: number,
    };
  } else if (number === 12) {
    return {
      time: number.toString() + ':00 PM',
      value: number,
    };
  } else {
    return {
      time: (number - 12).toString() + ':00 PM',
      value: number,
    };
  }
});

const BookingForm = (): JSX.Element => {
  const classes = useStyles();

  const bookForm = useFormik({
    initialValues: {
      startDate: '',
      startTime: 'placeholder',
      endDate: '',
      endTime: 'placeholder',
    },
    onSubmit: (values) => {
      alert(`
        startDate: ${values.startDate}\n
        startTime: ${values.startTime}\n
        endDate: ${values.endDate}\n
        endTime: ${values.endTime}
      `);
      bookForm.resetForm();
    },
  });

  return (
    <Card className={classes.bookingFormCard}>
      <form onSubmit={bookForm.handleSubmit} className={classes.bookingForm}>
        <Typography className={classes.userRateText}>{bookDetail.rate}/hr</Typography>
        <Rating defaultValue={4.5} precision={0.5} readOnly />
        <Box className={classes.profileDetailsForm}>
          <Typography className={classes.profileDetailsLabel}>drop off</Typography>
          <Grid className={classes.profileDetailsFormContainer}>
            <OutlinedInput
              type="date"
              name="startDate"
              className={classes.profileDetailsFormInput}
              value={bookForm.values.startDate}
              onChange={bookForm.handleChange}
            ></OutlinedInput>
            <Select
              variant="outlined"
              name="startTime"
              className={classes.profileDetailsFormSelect}
              value={bookForm.values.startTime}
              onChange={bookForm.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                start time
              </MenuItem>
              {timeSlot.map((time) => (
                <MenuItem value={time.value} key={time.value}>
                  {time.time}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Box>

        <Box className={classes.profileDetailsForm}>
          <Typography className={classes.profileDetailsLabel}>pick up</Typography>
          <Grid className={classes.profileDetailsFormContainer}>
            <OutlinedInput
              type="date"
              name="endDate"
              className={classes.profileDetailsFormInput}
              value={bookForm.values.endDate}
              onChange={bookForm.handleChange}
            ></OutlinedInput>
            <Select
              variant="outlined"
              name="endTime"
              className={classes.profileDetailsFormSelect}
              value={bookForm.values.endTime}
              onChange={bookForm.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                end time
              </MenuItem>
              {timeSlot.map((time) => (
                <MenuItem value={time.value} key={time.value}>
                  {time.time}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Box>

        <Button type="submit" className={classes.requestFormButton}>
          send request
        </Button>
      </form>
    </Card>
  );
};

export default BookingForm;
