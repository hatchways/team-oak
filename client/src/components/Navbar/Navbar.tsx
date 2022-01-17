import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
  SwipeableDrawer,
  useMediaQuery,
} from '@mui/material';
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import { useStyles } from './useStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, Logout, Person, Menu as MenuIcon } from '@mui/icons-material';
import { Box } from '@mui/system';

const NavbarButton = styled(Button)({
  padding: '10px 0',
});

const menuItems = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: null,
    authenticated: false,
  },
  {
    item: 'My Jobs',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource: string;
  item: string | JSX.Element;
}> = ({ resource, item }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <NavLink
        className={clsx(classes.navbarItem, location.pathname === '/' && classes.transparentNavbarItem)}
        to={resource}
      >
        {item}
      </NavLink>
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [displayDrawer, setDisplayDrawer] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 600px)');

  const toggleDrawer = (toggle: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDisplayDrawer(toggle);
  };

  return (
    <Grid
      className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}
      justifyContent="space-between"
      alignItems="center"
      container
    >
      <Grid xs={4} md={6} item>
        <img className={classes.navbarLogo} src={lovingSitterLogo} />
      </Grid>
      <Grid xs={8} md={6} item display="flex" justifyContent="flex-end">
        {isDesktop ? (
          <MenuItems />
        ) : (
          <Box>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: '#000', fontSize: '30px' }} />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={displayDrawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              className={classes.drawer}
            >
              <MenuItems />
            </SwipeableDrawer>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export { Navbar };

const MenuItems = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { loggedInUser, logout } = useAuth();
  const open = Boolean(anchorEl);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = () => {
    setAnchorEl(menuRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const renderMenuItems = () => {
    // TODO: conditionally render based on profile type
    return menuItems.map((menu) => {
      if (menu.authenticated) {
        return loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      } else {
        return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      }
    });
  };

  return (
    <Grid
      container
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      gap={{ xs: 4, sm: 2 }}
      justifyContent="flex-end"
      ref={menuRef}
    >
      {renderMenuItems()}
      {loggedInUser && (
        <Grid xs={2} item>
          <>
            <IconButton
              size="large"
              aria-label="account profile picture"
              aria-controls="menu-navbar"
              arais-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <img style={{ width: 50 }} src={`https://robohash.org/${loggedInUser.email}`} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </DropdownMenuItem>
              <Divider />
              <DropdownMenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </DropdownMenuItem>
            </Menu>
          </>
        </Grid>
      )}
    </Grid>
  );
};
