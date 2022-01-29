import { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useStyles } from './useStyles';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import getUnreadNotifications from '../../../helpers/APICalls/getUnreadNotifications';
import { Notification as INotification } from '../../../interface/Notification';
import markNotificationAsRead from '../../../helpers/APICalls/markNotificationAsRead';

const Notification: React.FC<{ notif: INotification }> = ({ notif }) => {
  const classes = useStyles();
  const handleClose = () => null;

  const date = new Date(notif.date);
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  const route = notif.type === 'booking' ? '/bookings' : notif.type === 'user' ? '/messages' : {};

  return (
    <DropdownMenuItem component={NavLink} to={route} onClick={handleClose}>
      <ListItemAvatar sx={{ marginRight: 2 }}>
        <Avatar variant="square" src={notif.senderPhoto} alt="sender" sx={{ width: 60, height: 60 }} />
      </ListItemAvatar>
      <Box>
        <ListItemText className={classes.desc}>{notif.description}</ListItemText>
        <ListItemText className={classes.title}>{notif.title}</ListItemText>
        <ListItemText className={classes.date}>{`${month + 1}/${day}/${year}`}</ListItemText>
      </Box>
    </DropdownMenuItem>
  );
};

const Notifications = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [notifs, setNotifs] = useState<INotification[]>([]);
  const [active, setActive] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const notifRef = useRef<HTMLButtonElement>(null);

  const handleOpen = async () => {
    setAnchorEl(notifRef.current);

    try {
      await Promise.all(notifs.map((notif) => markNotificationAsRead(notif._id)));
      setActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifs([]);
  };

  const socket = io();
  socket.on('newNotification', async () => {
    try {
      const unreadNotifs = await getUnreadNotifications();
      if (unreadNotifs) {
        setNotifs(unreadNotifs);
        setActive(true);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box>
      <Button
        variant="text"
        size="large"
        aria-label="notifications"
        aria-controls="notifications"
        arais-haspopup="true"
        onClick={handleOpen}
        className={classes.btn}
        ref={notifRef}
      >
        <Box sx={{ display: active ? 'block' : 'none' }} className={classes.notification} />
        Notifications
      </Button>
      <Menu
        id="notifications-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
      >
        {notifs.length > 0 ? (
          notifs.map((notif: INotification) => <Notification key={notif._id} notif={notif} />)
        ) : (
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>No new notifications</Typography>
        )}
      </Menu>
    </Box>
  );
};

export default Notifications;
