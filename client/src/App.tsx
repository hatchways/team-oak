import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import NotFound from './pages/NotFound/NotFound';
import { appRouteType, appRoutes } from './routes/app';

function renderRoute(route: appRouteType, index: number): JSX.Element {
  return <Route key={index} path={route.to} component={route.component} exact={route.exact} />;
}

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <CssBaseline />
              <Navbar />
              <Switch>
                {appRoutes.map((route, index) => renderRoute(route, index))}
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
