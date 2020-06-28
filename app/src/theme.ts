import { createMuiTheme } from '@material-ui/core/styles';
import {orange, grey, pink, green, red} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: orange,
    error: pink,
  },
});