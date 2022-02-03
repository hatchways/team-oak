import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';

const startHours = () => {
  const output = [];
  for (let i = 0; i < 24; i++) {
    const listItem = <MenuItem value={i}>{`${i}:00`}</MenuItem>;
    output.push(listItem);
  }
  return output;
};

const endHours = () => {
  const output = [];
  for (let i = 1; i < 25; i++) {
    const listItem = <MenuItem value={i}>{`${i}:00`}</MenuItem>;
    output.push(listItem);
  }
  return output;
};

const GenerateFormInterface = (day: string, values: any, setFieldValue: any, handleSubmit: any) => (
  <Grid
    container
    columns={3}
    sx={{
      height: '4.5rem',
      display: 'flex',
      borderBottom: '1px solid #dbdbdb',
      opacity: values[day].active ? 1 : 0.4,
    }}
  >
    <FormGroup sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%' }}>
      <FormControlLabel
        control={
          <Field
            id={`${day}.active`}
            name={`${day}.active`}
            checked={values[day].active}
            onChange={(e: any) => {
              if (!e.target.checked) {
                setFieldValue(`${day}.startTime`, '0');
                setFieldValue(`${day}.endTime`, '0');
              } else {
                setFieldValue(`${day}.startTime`, '10');
                setFieldValue(`${day}.endTime`, '22');
              }
              setFieldValue(`${day}.active`, e.target.checked);
              handleSubmit();
            }}
            sx={{ marginLeft: '1.5rem' }}
            type="checkbox"
            component={Checkbox}
          />
        }
        label={<Typography sx={{ fontSize: '15px', fontWeight: 500, textTransform: 'capitalize' }}>{day}</Typography>}
        sx={{ fontSize: '25px', fontWeight: 700 }}
      />
    </FormGroup>

    <FormControlLabel
      labelPlacement="start"
      control={
        <Field
          id={`${day}.startTime`}
          name={`${day}.startTime`}
          type="time"
          onChange={(e: any) => {
            if (values[day].active) {
              const val = e.target.value;
              if (val >= parseInt(values[day].endTime)) {
                setFieldValue(`${day}.endTime`, (parseInt(val) + 1).toString());
              }
              setFieldValue(`${day}.startTime`, val);
              handleSubmit();
            }
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
          as={Select}
        >
          {startHours()}
        </Field>
      }
      label={
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          from
        </Typography>
      }
      sx={{ fontSize: '25px', fontWeight: 700, width: '35%' }}
    />
    <FormControlLabel
      labelPlacement="start"
      control={
        <Field
          id={`${day}.endTime`}
          name={`${day}.endTime`}
          type="time"
          onChange={(e: any) => {
            if (values[day].active) {
              const val = e.target.value;
              if (val <= parseInt(values[day].startTime)) {
                setFieldValue(`${day}.startTime`, (parseInt(val) - 1).toString());
              }
              setFieldValue(`${day}.endTime`, val);
              handleSubmit();
            }
          }}
          sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
          as={Select}
        >
          {endHours()}
        </Field>
      }
      label={
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            marginLeft: '1rem',
            marginRight: '0.5rem',
            textTransform: 'uppercase',
          }}
        >
          to
        </Typography>
      }
      sx={{ fontSize: '25px', fontWeight: 700, width: '30%' }}
    />
  </Grid>
);

export default GenerateFormInterface;
