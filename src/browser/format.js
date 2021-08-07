import {toRgb} from '#packages/color-utils';
import {defaultLevelColors, defaultMessageColors} from '#root/format';

export const createBrowserFormatter = ({
  levelColors = defaultLevelColors,
  messageColors = defaultMessageColors,
}) => {
  const prependArgument = (info, argument) => {
    const {loggerArguments} = info;
    
    return {
      ...info,
      loggerArguments: [...loggerArguments, argument],
    };
  };

  const bold = (info) => prependArgument(info, 'font-weight: bold;');
  const italic = (info) => prependArgument(info, 'font-style: italic;');
  const underline = (info) => prependArgument(info, 'text-decoration: underline;');

  /*
  const colorText = ([r = 255, g = 255, b = 255]) =>
    `color: rgb(${r}, ${g}, ${b});`;
  const colorBackground = ([r = 0, g = 0, b = 0]) =>
    `backgroundColor: rgb(${r}, ${g}, ${b});`;
  */
  const colorText = (color) => (info) => {
    const {level} = info;

    const resolvedColor = color || messageColors[level];
    const [r, g, b] = toRgb(resolvedColor);

    const messageColor = `color: rgb(${r}, ${g}, ${b});`;
    return prependInfoArgument(info, messageColor);
  };
  const colorBackground = (color) => (info) => {
    const {level} = info;
    const resolvedColor = color || levelColors[level];

    const [r, g, b] = toRgb(resolvedColor);
    const backgroundColor = `backgroundColor: rgb(${r}, ${g}, ${b});`;

    return prependInfoArgument(info, backgroundColor);
  };

  const applyFormats = (...formats) => (info) => {
    return formats.reduce(format => prependInfoArgument(info, format), '');
  }

  return {
    bold,
    italic,
    underline,

    textColor,
    backgroundColor,

    applyFormats,
  };
};
export const browserFormatter = createBrowserFormatter();
