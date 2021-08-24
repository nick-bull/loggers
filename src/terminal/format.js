import {toRgb} from '#packages/color-utils';
import {defaultBackgroundColors, defaultTextColors} from '#root/format';

export const createTerminalFormatter = (
  backgroundColors = defaultBackgroundColors,
  textColors = defaultTextColors,
) => {
  const createFormat = (format) => `\x1b[${format}m`;

  const resetFormat = createFormat(0);

  const appendMessage = (info, message) => {
    const {messages} = info;

    return {
      ...info,
      messages: [...messages, message],
    };
  };
  const prependMessage = (info, message) => {
    const {messages} = info;

    return {
      ...info,
      messages: [message, ...messages],
    };
  };

  const lowercase = (info) => {
    const {messages} = info;
    const lowercaseMessages = messages.map(message => String(message).toLowerCase());

    return {
      ...info,
      messages: lowercaseMessages
    };
  };

  const uppercase = (info) => {
    const {messages} = info;
    const uppercaseMessages = messages.map(message => String(message).toUpperCase());

    return {
      ...info,
      messages: uppercaseMessages
    };
  };

  const appendFormatMessage = (info, message) => {
    return appendMessage(info, createFormat(message));
  };
  const prependFormatMessage = (info, message) => {
    return prependMessage(info, createFormat(message));
  };

  const bold = (info) => prependFormatMessage(info, '1');
  const italic = (info) => prependFormatMessage(info, '3');
  const underline = (info) => prependFormatMessage(info, '4');

  const textColor = (color) => (info) => {
    const {mode} = info;
    const resolvedColor = color || textColors[mode];

    // console.log(` - Applying color '${color}'`);

    const [r, g, b] = toRgb(resolvedColor);
    return prependFormatMessage(info, `38;2;${r};${g};${b}`);
  };

  const backgroundColor = (color) => (info) => {
    const {mode} = info;
    const resolvedColor = color || backgroundColors[mode];

    const [r, g, b] = toRgb(resolvedColor);
    return prependFormatMessage(info, `48;2;${r};${g};${b}`);
  };
  const invertColors = (info) => prependFormatMessage(info, '7');

  const applyFormats = (...formats) => (info = {}) => {
    const composedFormats = formats.reduce(
      (composition, format) => format(composition),
      info,
    );
    return appendMessage(composedFormats, resetFormat);
  };

  return {
    appendMessage,
    prependMessage,

    uppercase,
    lowercase,

    bold,
    italic,
    underline,

    textColor,
    backgroundColor,
    invertColors,

    applyFormats,

    createFormat,
    resetFormat,
  };
};
export const terminalFormatter = createTerminalFormatter();

