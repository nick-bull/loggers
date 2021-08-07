export const defaultColors = {
  whiteGray: '#E5E9F0',
  lightGray: '#D4D4D4',
  gray: '#777777',
  darkGray: '#222222',
  red: '#FF3854',
  orange: '#FF9000',
  yellow: '#FCFA4A',
  blue: '#6AB9FF',
  darkBlue: '#5064AA',
  green: '#01F494',
};

export const defaultMessageColors = {
  debug: defaultColors.whiteGray,
  error: defaultColors.red,
  http: defaultColors.blue,
  info: defaultColors.blue,
  notice: defaultColors.lightGray,
  // success: defaultColors.green,
  silly: defaultColors.gray,
  verbose: defaultColors.gray,
  warn: defaultColors.yellow,
};
export const defaultLevelColors = {
  debug: defaultColors.darkGray,
  error: defaultColors.yellow,
  http: defaultColors.darkBlue,
  info: defaultColors.darkBlue,
  notice: defaultColors.darkGray,
  silly: defaultColors.darkGray,
  verbose: defaultColors.darkGray,
  warn: defaultColors.orange,
};

export const defaultTextFormat = {
  textColor: defaultMessageColors.lightGray,
};
export const defaultLevelFormat = {
  textColor: defaultColors.darkGray,
  backgroundColor: defaultColors.lightGray,
  isBold: true,
};

