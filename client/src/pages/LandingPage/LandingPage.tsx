import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useStyles } from './useStyles';
import landingPage from '../../images/landing/landing_page.webp';
import FormInput from '../../components/FormInput/FormInput';

const LandingPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container sx={{ marginTop: -10 }}>
      <Grid item xs={12} md={6} className={classes.left}>
        <Typography className={classes.heading}>Find the care your dog deserves</Typography>

        <Box className={classes.formWrapper}>
          <FormInput id="Where" label="Where" placeholder="Anywhere" />

          <Box className={classes.inputWrapper}>
            <FormInput id="Drop In" label="Drop In" placeholder="mm/dd/yyyy" />
            <Box sx={{ width: 10 }} />
            <FormInput id="Drop Off" label="Drop Off" placeholder="mm/dd/yyyy" />
          </Box>

          <Button type="submit" variant="contained" size="large" className={classes.submitBtn}>
            Find my dog sitter
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box className={classes.imageWrapper}>
          <img src={landingPage} alt="landing" className={classes.image} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
