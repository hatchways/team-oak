import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { Button, CircularProgress, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import FormInput from '../../../components/FormInput/FormInput';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { Input } from '@mui/material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface AvailabilityProps {
  header: string;
}

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const defaultStartTime = new Date(0, 0, 0, 10);
const defaultEndTime = new Date(0, 0, 0, 22);

const generateInput = (day: string): JSX.Element => {
  return (
    <Grid
      container
      columns={3}
      sx={{
        height: '5rem',
        display: 'flex',
        borderBottom: '1px solid #dbdbdb',
      }}
    >
      <FormGroup sx={{ marginTop: 'auto', marginBottom: 'auto', width: '30%' }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="primary"
              sx={{
                marginLeft: '2rem',
              }}
            />
          }
          label={<Typography sx={{ fontSize: '15px', fontWeight: 500 }}>{day}</Typography>}
          sx={{ fontSize: '25px', fontWeight: 700 }}
        />
      </FormGroup>
      <TextField defaultChecked name={`${day}Start`} type="time" sx={{ marginTop: 'auto', marginBottom: 'auto' }} />
    </Grid>
  );
};

const Availability: React.FC<AvailabilityProps> = ({ header }) => {
  return (
    <Box>
      <SettingHeader header={header} />
      <Typography alignItems="center" variant="h3" sx={{ fontWeight: 500, fontSize: '20px', marginBottom: 4 }}>
        Working Schedule
      </Typography>
      <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
        {week.map((day) => generateInput(day))}
      </Box>
    </Box>
  );
};

export default Availability;
