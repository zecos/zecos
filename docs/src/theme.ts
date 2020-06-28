import {
  green,
  blue,
  pink,
} from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ECEFF4',
      light: '#2E3440',
      dark: '#2E3440',
      // contrastText: '',
    },
    secondary: {
      main: '#2E3440',
      light: '#E5E9F0',
      dark: '#3B4252',
      // contrastText: '',
    },
    error: {
      main: '#BF616A',
    },
  },
});