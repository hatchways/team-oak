import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Settings from '../pages/Settings/Settings';
import LandingPage from '../pages/LandingPage/LandingPage';
import { AccountType } from '../types/AccountType';
import ProfileDetail from '../pages/ProfileDetail/ProfileDetail';
import Bookings from '../pages/Bookings/Bookings';

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
    to: '/profile/:userId',
    component: ProfileDetail,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: false,
  },
  {
    to: '/bookings',
    component: Bookings,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    exact: false,
  },
];
