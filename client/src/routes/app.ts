import Login from '../pages/Login/Login';
import Signup from '../pages/SignUp/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Settings from '../pages/Settings/Settings';
import { AccountType } from '../types/AccountType';

export interface appRouteType {
  to: string;
  component: React.ComponentType;
  canView: Array<string>;
  exact: boolean;
}

export const appRoutes = [
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
    authenticated: true,
    exact: true,
  },
  {
    to: '/profile/settings',
    component: Settings,
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    authenticaed: true,
    exact: false,
  },
];
