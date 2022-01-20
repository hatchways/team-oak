import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface GenerateFormInterface {
  day: string;
}

const GenerateFormInterface: React.FC<GenerateFormInterface> = ({ day }) => {
  const [from, setFrom] = useState('10');
  const [to, setTo] = useState('22');
  const [checked, setChecked] = useState(true);

  const twentyFourHours = () => {
    const output = [];
    for (let i = 0; i < 24; i++) {
      const listItem = <MenuItem value={i}>{`${i}:00`}</MenuItem>;
      output.push(listItem);
    }
    return output;
  };

  return (
    <Grid
      container
      columns={3}
      sx={{
        height: '4.5rem',
        display: 'flex',
        borderBottom: '1px solid #dbdbdb',
        opacity: checked ? 1 : 0.4,
      }}
    >
      <FormGroup sx={{ marginTop: 'auto', marginBottom: 'auto', width: '25%' }}>
        <FormControlLabel
          control={
            <Checkbox
              id={`${day}Checkbox`}
              checked={checked}
              onClick={() => {
                if (checked) {
                  setFrom('0');
                  setTo('0');
                }
                setChecked(!checked);
              }}
              sx={{ marginLeft: '1.5rem' }}
            />
          }
          label={<Typography sx={{ fontSize: '15px', fontWeight: 500 }}>{day}</Typography>}
          sx={{ fontSize: '25px', fontWeight: 700 }}
        />
      </FormGroup>

      <FormControlLabel
        labelPlacement="start"
        control={
          <Select
            id={`${day}StartTime`}
            name={`${day}StartTime`}
            type="time"
            value={from}
            onChange={(e) => {
              if (checked) {
                setFrom(e.target.value);
                console.log('yep it is checked');
              }
              if (checked && e.target.value == '23') {
                setTo('0');
                console.log('yep program also thinks to should be midnight');
              } else if (parseInt(e.target.value) >= parseInt(to)) {
                setTo((parseInt(e.target.value) + 1).toString());
                console.log('whoa program did some weird math here');
              }
            }}
            sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
          >
            {twentyFourHours()}
          </Select>
        }
        label={
          <Typography sx={{ fontSize: '12px', fontWeight: 700, marginLeft: '1rem', marginRight: '0.5rem' }}>
            FROM
          </Typography>
        }
        sx={{ fontSize: '25px', fontWeight: 700, width: '35%' }}
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Select
            id={`${day}EndTime`}
            name={`${day}EndTime`}
            type="time"
            value={to}
            onChange={(e) => {
              if (checked) {
                setTo(e.target.value);
              }
              if (checked && e.target.value == '0') {
                setFrom('23');
              } else if (parseInt(e.target.value) <= parseInt(from)) {
                setFrom((parseInt(e.target.value) - 1).toString());
              }
            }}
            sx={{ marginTop: 'auto', marginBottom: 'auto', width: '100px', height: '30px' }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
          >
            {twentyFourHours()}
          </Select>
        }
        label={
          <Typography sx={{ fontSize: '12px', fontWeight: 700, marginLeft: '1rem', marginRight: '0.5rem' }}>
            TO
          </Typography>
        }
        sx={{ fontSize: '25px', fontWeight: 700, width: '30%' }}
      />
    </Grid>
  );
};

export default GenerateFormInterface;
