import Button from '@mui/material/Button';
import { useAuth } from '../../context/useAuthContext';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import { Box } from '@mui/material';
import getLink from './../../helpers/APICalls/stripe';
import { StripeLink } from '../../interface/StripeLink';

interface StripeProps {
  header: string;
}

export const ConnectStripe: React.FC<StripeProps> = ({ header }) => {
  const { profile } = useAuth();

  const clickHandler = async () => {
    await getLink().then((data: StripeLink) => {
      console.log(data);
      if (data.success) {
        window.location.href = data.success.accountLink.url;
      }
    });
  };

  const checkStatus = profile.stripeAccountId !== '';

  return (
    <Box sx={{ textAlign: 'center' }}>
      <SettingHeader header={header} />

      <Button
        onClick={clickHandler}
        disabled={checkStatus}
        size="large"
        variant="contained"
        color="primary"
        disableElevation
        sx={{
          width: 200,
          height: 56,
          fontSize: 15,
          fontWeight: 'bold',
        }}
      >
        Connect to Stripe
      </Button>
    </Box>
  );
};
