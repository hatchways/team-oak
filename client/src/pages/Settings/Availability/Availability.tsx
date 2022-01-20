import { Button } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenerateFormInterface from './FormInterface';

const savedSchedules = ['Working hours', 'Holidays'];
const currentSchedule = 'Working hours';
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateSchedules = (scheduleName: string): JSX.Element => {
  return (
    <MenuItem key={scheduleName} value={scheduleName}>
      {scheduleName}
    </MenuItem>
  );
};

interface AvailabilityProps {
  header: string;
}

const Availability: React.FC<AvailabilityProps> = ({ header }) => {
  return (
    <Box>
      <SettingHeader header={header} />
      <Select
        id="scheduleSelect"
        sx={{ height: '35px', width: 'auto', marginRight: '1rem', fontWeight: 700 }}
        name="currentSchedule"
        defaultValue={currentSchedule}
      >
        {savedSchedules.map((schedule) => generateSchedules(schedule))}
      </Select>
      <Button variant="contained" color="primary" sx={{ height: '35px' }} disableElevation>
        + New Schedule
      </Button>
      <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '18px', marginTop: 4, marginBottom: 2 }}>
        Set your weekly hours
      </Typography>
      <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
        {week.map((day) => GenerateFormInterface({ day }))}
      </Box>
    </Box>
  );
};

export default Availability;
