import { Button } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenerateFormInterface from './FormInterface';
import { Formik, FormikHelpers, Field, validateYupSchema } from 'formik';
import React, { useState } from 'react';

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

interface Values {
  scheduleSelect: string;
  MondayCheckbox: boolean;
  TuesdayCheckbox: boolean;
  WednesdayCheckbox: boolean;
  ThursdayCheckbox: boolean;
  FridayCheckbox: boolean;
  SaturdayCheckbox: boolean;
  SundayCheckbox: boolean;
  MondayFrom: string;
  TuesdayFrom: string;
  WednesdayFrom: string;
  ThursdayFrom: string;
  FridayFrom: string;
  SaturdayFrom: string;
  SundayFrom: string;
  MondayTo: string;
  TuesdayTo: string;
  WednesdayTo: string;
  ThursdayTo: string;
  FridayTo: string;
  SaturdayTo: string;
  SundayTo: string;
}

const Availability: React.FC<AvailabilityProps> = ({ header }) => {
  const [schedules, setSchedules] = useState(['Working hours', 'Holidays']);

  return (
    <Box>
      <SettingHeader header={header} />
      <Formik
        initialValues={{
          scheduleSelect: schedules[0],
          MondayCheckbox: true,
          TuesdayCheckbox: true,
          WednesdayCheckbox: true,
          ThursdayCheckbox: true,
          FridayCheckbox: true,
          SaturdayCheckbox: true,
          SundayCheckbox: true,
          MondayFrom: '10',
          TuesdayFrom: '10',
          WednesdayFrom: '10',
          ThursdayFrom: '10',
          FridayFrom: '10',
          SaturdayFrom: '10',
          SundayFrom: '10',
          MondayTo: '22',
          TuesdayTo: '22',
          WednesdayTo: '22',
          ThursdayTo: '22',
          FridayTo: '22',
          SaturdayTo: '22',
          SundayTo: '22',
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form>
            <Field
              id="scheduleSelect"
              sx={{ height: '35px', width: 'auto', marginRight: '1rem', fontWeight: 700 }}
              name="scheduleSelect"
              as={Select}
            >
              {schedules.map((schedule) => generateSchedules(schedule))}
            </Field>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: '35px' }}
              disableElevation
              onClick={() => setSchedules(schedules.concat(['New Schedule']))}
            >
              + New Schedule
            </Button>
            <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '18px', marginTop: 4, marginBottom: 2 }}>
              Set your weekly hours
            </Typography>
            <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
              {week.map((day) => GenerateFormInterface(day, values, setFieldValue, handleSubmit))}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Availability;
