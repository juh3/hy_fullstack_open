import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#FFFFFF',
    textSecondary: '#586069',
    primary: '#0366d6',
    backgroundColor: '#24292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;