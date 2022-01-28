import { Button } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenerateFormInterface from './FormInterface';
import { Formik, FormikHelpers, Field, validateYupSchema } from 'formik';
import React, { useState } from 'react';

const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

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
  monday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  tuesday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  wednesday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  thursday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  friday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  saturday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  sunday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
}

const Availability: React.FC<AvailabilityProps> = ({ header }) => {
  const [schedules, setSchedules] = useState(['Working hours', 'Holidays']);

  return (
    <Box>
      <SettingHeader header={header} />
      <Formik
        initialValues={{
          scheduleSelect: schedules[0],
          monday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          tuesday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          wednesday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          thursday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          friday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          saturday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          sunday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
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
