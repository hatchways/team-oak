import * as React from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import BookingsWrapper from './InvoiceWrapper';
import TabsWrapper from './TabsWrapper';
import { Grid, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Formik, FormikHelpers } from 'formik';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

export default function CustomerBookings(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const BookingPreview = (
    name: string,
    photo: string,
    start: Date,
    end: Date,
    description: string,
    hours: number,
    rate: number,
    status: string,
  ) => {
    const formatDate = (date: Date) => {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    };

    const startDate = new Date(start);
    const endDate = new Date(end);

    return (
      <Box
        sx={{ paddingBottom: '1rem', '&:hover': { backgroundColor: '#eee' } }}
        onClick={() => {
          setPetSitterName(name);
          setpetSitterDescription(description);
          setpetSitterRate(rate);
          setpetSitterPhoto(photo);
          setBookingHours(hours);
          setPaymentStatus(status);
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 500, paddingLeft: '0.5rem' }}>{name}</Typography>
        <Typography sx={{ fontSize: '15px', paddingLeft: '0.5rem' }}>{`${formatDate(startDate)} - ${formatDate(
          endDate,
        )}`}</Typography>
      </Box>
    );
  };

  const handleChangeTabs = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const currentBookings = [
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-2-3',
      end: '2022-2-3',
      hours: 4,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Jane Doe',
      description: 'I sit dogs',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      start: '2022-2-15',
      end: '2022-2-16',
      hours: 2,
      rate: 25,
      status: 'current',
    },
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-3-3',
      end: '2022-3-4',
      hours: 27,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Jane Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I sit dogs',
      start: '2022-4-5',
      end: '2022-4-5',
      hours: 5,
      rate: 25,
      status: 'current',
    },
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-04-15',
      end: '2022-4-16',
      hours: 17,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Jane Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I sit dogs',
      start: '2022-5-12',
      end: '2022-5-12',
      hours: 10,
      rate: 25,
      status: 'current',
    },
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-6-26',
      end: '2022-6-27',
      hours: 10,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Jane Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I sit dogs',
      start: '2022-7-01',
      end: '2022-7-3',
      hours: 48,
      rate: 25,
      status: 'current',
    },
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-8-26',
      end: '2022-8-26',
      hours: 2,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Jane Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I sit dogs',
      start: '2022-9-09',
      end: '2022-9-10',
      hours: 12,
      rate: 25,
      status: 'current',
    },
  ];
  const pastDueBookings = [
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
      start: '2022-8-26',
      end: '2022-8-26',
      hours: 7,
      rate: 22,
      status: 'past-due',
    },
    {
      name: 'Jane Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I sit dogs',
      start: '2022-9-09',
      end: '2022-9-10',
      hours: 24,
      rate: 25,
      status: 'past-due',
    },
  ];
  const paidBookings = [
    {
      name: 'Mark M',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFYkvkn6EBRxJBi9YMgqzzdhI2BhJ6UWNWw&usqp=CAU',
      description: 'I would rather be a dev',
      start: '2022-1-10',
      end: '2022-1-11',
      hours: 12,
      rate: 15,
      status: 'paid',
    },
    {
      name: 'Joe J',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogkUgsVlIXfl9zhqxShKXzxNzKCfgdg427Q&usqp=CAU',
      description: 'I walk dogs',
      start: '2022-1-10',
      end: '2022-1-10',
      hours: 9,
      rate: 29,
      status: 'paid',
    },
  ];

  interface formValues {
    paymentMethodRadio: any;
  }

  const [tabValue, setTabValue] = React.useState(0);
  const [petSitterName, setPetSitterName] = React.useState('Jennifer Lawrence');
  const [petSitterDescription, setpetSitterDescription] = React.useState('Most popular dog-sitter');
  const [petSitterRate, setpetSitterRate] = React.useState(22);
  const [petSitterPhoto, setpetSitterPhoto] = React.useState(
    'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
  );
  const [bookingHours, setBookingHours] = React.useState(4);
  const [paymentStatus, setPaymentStatus] = React.useState('Current');

  const platformFee = 5;
  const amount = bookingHours * petSitterRate;
  const invoiceTotal = platformFee + amount;
  const cards = ['VISA - 1234', 'MASTERCARD - 1234', 'AMEX - 1234'];
  const defaultCard = 'AMEX - 1234';

  const makePaymentRadioButton = (card: string) => {
    return <FormControlLabel value={card.toString()} control={<Radio />} label={card} />;
  };

  const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  return (
    <PageContainer>
      <Grid sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} container>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: '30px',
              textAlign: 'center',
              margin: '0 auto 1em',
              textTransform: 'capitalize',
            }}
          >
            your bookings
          </Typography>
        </Grid>
        <Grid item xs={3.75}>
          <TabsWrapper>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  scrollButtons={false}
                  value={tabValue}
                  onChange={handleChangeTabs}
                  aria-label="basic tabs example"
                >
                  <Tab label="Current" />
                  <Tab label="Past-Due" />
                  <Tab label="Paid" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Box maxHeight="600px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                  {currentBookings.map((booking: any) =>
                    BookingPreview(
                      booking.name,
                      booking.photo,
                      booking.start,
                      booking.end,
                      booking.description,
                      booking.hours,
                      booking.rate,
                      booking.status,
                    ),
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Box maxHeight="600px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                  {pastDueBookings.map((booking: any) =>
                    BookingPreview(
                      booking.name,
                      booking.photo,
                      booking.start,
                      booking.end,
                      booking.description,
                      booking.hours,
                      booking.rate,
                      booking.status,
                    ),
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Box maxHeight="600px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                  {paidBookings.map((booking: any) =>
                    BookingPreview(
                      booking.name,
                      booking.photo,
                      booking.start,
                      booking.end,
                      booking.description,
                      booking.hours,
                      booking.rate,
                      booking.status,
                    ),
                  )}
                </Box>
              </TabPanel>
            </Box>
          </TabsWrapper>
        </Grid>
        <Grid item xs={8.25}>
          <BookingsWrapper>
            <Grid>
              <Box sx={{ display: 'flex' }}>
                <Grid item xs={11}>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar
                      id="photo"
                      src={petSitterPhoto}
                      sx={{
                        width: 100,
                        height: 100,
                        marginRight: '1rem',
                      }}
                    />
                    <Box sx={{ display: 'block' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: '30px',
                        }}
                      >
                        {petSitterName}
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 400,
                          fontSize: '20px',
                          display: 'block',
                        }}
                      >
                        {petSitterDescription}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box display="flex" justifyContent="flex-end">
                    <Chip
                      label={paymentStatus}
                      color="primary"
                      sx={{ fontWeight: 700, fontSize: '15px', textTransform: 'capitalize', marginRight: '1rem' }}
                    />
                  </Box>
                </Grid>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  fontSize: '20px',
                  display: 'block',
                  marginTop: '3rem',
                  marginBottom: '3rem',
                  textTransform: 'capitalize',
                }}
              >
                payment details
              </Typography>

              <TableContainer>
                <Table sx={{ minWidth: 300, border: '1px solid #dbdbdb' }} aria-label="spanning table">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: '#eeeeee',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                        Hours
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                        Description
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                        Hourly Rate
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                        {bookingHours}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }}>Dog-sitting service</TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="right">
                        {ccyFormat(petSitterRate)}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #dbdbdb' }} align="right">
                        {ccyFormat(amount)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ borderBottom: 'none' }} colSpan={2} />
                      <TableCell align="right" sx={{ borderBottom: 'none' }}>
                        Platform Fee
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid #dbdbdb' }}>
                        {ccyFormat(platformFee)}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ border: 'none' }}>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ textTransform: 'uppercase', fontSize: '15px', fontWeight: 500 }}>
                        Total
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: '#eeeeee',
                          fontSize: '15px',
                          fontWeight: 500,
                          border: '1px solid #dbdbdb',
                        }}
                        align="right"
                      >
                        {ccyFormat(invoiceTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Formik
                initialValues={{
                  paymentMethodRadio: defaultCard.toString(),
                }}
                onSubmit={(values: formValues, { setSubmitting }: FormikHelpers<formValues>) => {
                  updateSnackBarMessage('Payment submitted for processing');
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 500);
                }}
              >
                {({ values, setFieldValue, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="flex-end">
                      <FormControl disabled={paymentStatus === 'paid' ? true : false} sx={{ marginTop: '3rem' }}>
                        <FormLabel
                          sx={{ textTransform: 'capitalize', color: '#000000', fontSize: '15px', fontWeight: 500 }}
                        >
                          payment method
                        </FormLabel>
                        <RadioGroup
                          name="paymentMethodRadio"
                          value={values.paymentMethodRadio.toString()}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                            const message = `You have selected ${e.target.value}, which is not your default card (${defaultCard})`;
                            if (e.target.value !== defaultCard.toString()) {
                              updateSnackBarMessage(message);
                            }
                          }}
                        >
                          {cards.map((card) => makePaymentRadioButton(card))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        type="submit"
                        size="large"
                        variant="outlined"
                        disableElevation
                        disabled={paymentStatus === 'paid' ? true : false}
                        sx={{
                          fontSize: '17px',
                          marginRight: '2rem',
                          marginTop: '1.5rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {paymentStatus === 'paid' ? 'paid - thank you' : `Pay - $${invoiceTotal.toFixed(2)}`}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Grid>
          </BookingsWrapper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
