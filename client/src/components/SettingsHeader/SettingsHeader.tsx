import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface SettingHeaderProps {
  header: string;
}

const SettingHeader: React.FC<SettingHeaderProps> = ({ header }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: '22px',
          textAlign: 'center',
          marginBottom: 6,
        }}
      >
        {header}
      </Typography>
    </Box>
  );
};

export default SettingHeader;
