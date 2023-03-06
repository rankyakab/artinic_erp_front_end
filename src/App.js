// routes
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';

// ----------------------------------------------------------------------

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <ThemeLocalization>
              <SnackbarProvider>
                <Router />
              </SnackbarProvider>
            </ThemeLocalization>
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
    </Provider>
  );
}
