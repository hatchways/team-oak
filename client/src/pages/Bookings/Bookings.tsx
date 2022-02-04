import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { Box, Card, CircularProgress, Grid } from '@mui/material';
import Calendar from '../../components/Calendar/Calendar';
import PageContainer from '../../components/PageContainer/PageContainer';
import NextBooking from '../../components/NextBookings/NextBooking';
import { Booking } from '../../interface/Booking';
import BookingList from '../../components/BookingList/BookingList';
import { getBookings } from '../../helpers/APICalls/requests';
import { useState, useEffect, useCallback } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';

const Bookings = () => {
  const { loggedInUser } = useAuth();
  const history = useHistory();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { updateSnackBarMessage } = useSnackBar();

  const fetchBookings = useCallback(async () => {
    try {
      const response = await getBookings();
      const { success } = response;
      if (success) {
        success.requests.forEach((request) => {
          const { start, end } = request;
          request.start = new Date(start);
          request.end = new Date(end);
        });
        setBookings(success.requests);
      } else {
        updateSnackBarMessage('Error fetching bookings from server');
      }
    } catch (e) {
      const { message } = e as Error;
      updateSnackBarMessage(message);
    }
  }, [updateSnackBarMessage]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loggedInUser === undefined || !bookings) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }
  const highlightedDates = bookings.filter((b) => b.status !== 'declined').map((b) => b.start.toString().slice(0, 10));

  const currentBookings: Booking[] = [];
  const pastBookings: Booking[] = [];

  const now = new Date();
  for (const booking of bookings) {
    if (booking.start < now) pastBookings.push(booking);
    else currentBookings.push(booking);
  }

  const nextBooking = currentBookings.shift();

  const scrollableCardStyles = {
    padding: '0px 10px 10px 10px',
    height: '300px',
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: 6,
      bgcolor: 'rgba(0, 0, 0, 0.26)',
      borderRadius: 2,
    },
    '::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0, 0, 0, 0.21)', borderRadius: 2 },
  };

  return (
    <PageContainer>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          {nextBooking && <NextBooking booking={nextBooking} />}
          <Box sx={{ height: '20px' }} />
          <Card sx={scrollableCardStyles}>
            <BookingList type="current" bookings={currentBookings} />
            <BookingList type="past" bookings={pastBookings} />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Calendar highlightedDates={highlightedDates} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Bookings;
