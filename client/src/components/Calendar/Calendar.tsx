import { useState } from 'react';
import { Box, Card } from '@mui/material';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';

interface PropTypes {
  highlightedDates: string[];
}

const Calendar = ({ highlightedDates }: PropTypes) => {
  const currentMonth = new Date();
  currentMonth.setDate(1);
  const [date, setDate] = useState(currentMonth);
  return (
    <Card sx={{ minWidth: '385px', width: '100%', padding: '1.50rem' }}>
      <CalendarHead date={date} setDate={setDate} />
      <Box sx={{ height: '20px' }} />
      <CalendarBody selectedMonth={date} highlightedDates={highlightedDates} />
    </Card>
  );
};
export default Calendar;
