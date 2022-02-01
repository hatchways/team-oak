import Button from '@mui/material/Button';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import { Box } from '@mui/material';
import { getLink } from './../../helpers/APICalls/stripe';
import { StripeLink } from '../../interface/StripeLink';

interface StripeProps {
  header: string;
}

export const ConnectStripe: React.FC<StripeProps> = ({ header }) => {
  const { profile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const clickHandler = async () => {
    await getLink().then((data: StripeLink) => {
      if (data.success) {
        window.location.href = data.success.accountLink.url;
      } else if (data.error) {
        updateSnackBarMessage('An error occured while connecting Stripe');
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
