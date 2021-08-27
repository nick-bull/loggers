import {toRgb} from '#utils/color-utils';
import {defaultBackgroundColors, defaultTextColors} from '#root/format';

export const createBrowserFormatter = ({
  backgroundColors = defaultBackgroundColors,
  textColors = defaultTextColors,
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
  const textColor = (color) => (info) => {
    const {level} = info;

    const resolvedColor = color || textColors[level];
    const [r, g, b] = toRgb(resolvedColor);

    const textColorArgument = `color: rgb(${r}, ${g}, ${b});`;
    return prependArgument(info, textColorArgument);
  };
  const backgroundColor = (color) => (info) => {
    const {level} = info;
    const resolvedColor = color || backgroundColors[level];

    const [r, g, b] = toRgb(resolvedColor);
    const backgroundColorArgument = `backgroundColor: rgb(${r}, ${g}, ${b});`;

    return prependArgument(info, backgroundColorArgument);
  };
  // const invertColors = (info) => prependArgument

  const applyFormats = (...formats) => (info) => formats.reduce((format) => prependArgument(info, format), '');

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
