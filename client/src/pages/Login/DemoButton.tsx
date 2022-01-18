import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useStyles from './LoginForm/useStyles';

interface DemoButtonProps {
  handleClick: VoidFunction;
}

function DemoButton(props: DemoButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        marginTop: 4,
        fontSize: 20,
      }}
    >
      <Button
        type="submit"
        size="large"
        variant="contained"
        className={classes.demo}
        disableElevation
        sx={{ backgroundColor: '#f89c9b' }}
        onClick={props.handleClick}
      >
        Demo
      </Button>
    </Box>
  );
}

export default DemoButton;
