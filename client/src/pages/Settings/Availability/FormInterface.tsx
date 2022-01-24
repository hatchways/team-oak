import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Field } from 'formik';

const twentyFourHours = () => {
  const output = [];
  for (let i = 0; i < 24; i++) {
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
      opacity: values[`${day}Checkbox`] ? 1 : 0.4,
    }}
  >
    <FormGroup sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%' }}>
      <FormControlLabel
        control={
          <Field
            id={`${day}Checkbox`}
            name={`${day}Checkbox`}
            checked={values[`${day}Checkbox`]}
            onChange={(e: any) => {
              if (!e.target.checked) {
                setFieldValue(`${day}From`, '0');
                setFieldValue(`${day}To`, '0');
              } else {
                setFieldValue(`${day}From`, '10');
                setFieldValue(`${day}To`, '22');
              }
              setFieldValue(`${day}Checkbox`, e.target.checked);
              handleSubmit();
            }}
            sx={{ marginLeft: '1.5rem' }}
            type="checkbox"
            component={Checkbox}
          />
        }
        label={<Typography sx={{ fontSize: '15px', fontWeight: 500 }}>{day}</Typography>}
        sx={{ fontSize: '25px', fontWeight: 700 }}
      />
    </FormGroup>

    <FormControlLabel
      labelPlacement="start"
      control={
        <Field
          id={`${day}From`}
          name={`${day}From`}
          type="time"
          onChange={(e: any) => {
            if (values[`${day}Checkbox`]) {
              const val = e.target.value;
              if (val == '23') {
                setFieldValue(`${day}To`, '0');
              } else if (val >= parseInt(values[`${day}To`])) {
                setFieldValue(`${day}To`, (parseInt(val) + 1).toString());
              }
              setFieldValue(`${day}From`, val);
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
          {twentyFourHours()}
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
          id={`${day}To`}
          name={`${day}To`}
          type="time"
          onChange={(e: any) => {
            if (values[`${day}Checkbox`]) {
              const val = e.target.value;
              if (val == '0') {
                setFieldValue(`${day}From`, '23');
              } else if (val <= parseInt(values[`${day}From`])) {
                setFieldValue(`${day}From`, (parseInt(val) - 1).toString());
              }
              setFieldValue(`${day}To`, val);
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
          {twentyFourHours()}
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
