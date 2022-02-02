import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Settings from '../pages/Settings/Settings';
import LandingPage from '../pages/LandingPage/LandingPage';
import { AccountType } from '../types/AccountType';
import CustomerBookings from '../pages/Customer Bookings/CustomerBookings';

export interface AppRouteType {
  to: string;
  component: React.ComponentType;
  canView: Array<string>;
  exact: boolean;
}

export const appRoutes: AppRouteType[] = [
  {
    to: '/',
    component: LandingPage,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: true,
  },
  {
    to: '/login',
    component: Login,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: true,
  },
  {
    to: '/signup',
    component: Signup,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: true,
  },
  {
    to: '/dashboard',
    component: Dashboard,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: true,
  },
  {
    to: '/profile/settings',
    component: Settings,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: false,
  },
  {
    to: '/mysitters',
    component: CustomerBookings,
    canView: [AccountType.PET_OWNER],
    exact: false,
  },
];
