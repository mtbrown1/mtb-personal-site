import { BrandVariants, createDarkTheme, createLightTheme, Theme } from '@fluentui/react-components';

const mtbFluentTheme: BrandVariants = { 
  10: "#292929",
  20: "#453638",
  30: "#634243",
  40: "#7f514a",
  50: "#9a614d",
  60: "#b2744d",
  70: "#c6894b",
  80: "#D5A149",
  90: "#d9a856",
  100: "#ddaf63",
  110: "#e1b570",
  120: "#e4bc7d",
  130: "#e8c28a",
  140: "#ebc997",
  150: "#eecfa4",
  160: "#f1d6b1"
};

export const lightTheme: Theme = {
  ...createLightTheme(mtbFluentTheme), 
};
  
export const darkTheme: Theme = {
  ...createDarkTheme(mtbFluentTheme), 
};