import {toRgb} from '#packages/color-utils';
import {defaultLevelColors, defaultMessageColors} from '#root/format';

export const createTerminalFormatter = (
  levelColors = defaultLevelColors,
  messageColors = defaultMessageColors,
) => {
  const resetFormat = '\x1b[0m';

  const createFormat = (format) => `\x1b[${format}m`;
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
  const prependFormatMessage = (info, message) => {
    return prependMessage(info, createFormat(message));
  };

  const bold = (info) => prependFormatMessage(info, '1');
  const italic = (info) => prependFormatMessage(info, '3');
  const underline = (info) => prependFormatMessage(info, '4');

  const textColor = (color) => (info) => {
    const {mode} = info;
    const resolvedColor = color || messageColors[mode];

    const [r, g, b] = toRgb(resolvedColor);
    return prependFormatMessage(info, `38;2;${r};${g};${b}`);
  };
  const backgroundColor = (color) => (info) => {
    const {mode} = info;
    const resolvedColor = color || levelColors[mode];

    const [r, g, b] = toRgb(resolvedColor);
    return prependFormatMessage(info, `48;2;${r};${g};${b}`);
  };

  const applyFormats = (...formats) => (info = {}) => {
    const composedFormats = formats.reduce(
      (composition, format) => format(composition),
      info,
    );
    return appendMessage(composedFormats, resetFormat);
  };

  return {
    bold,
    italic,
    underline,

    textColor,
    backgroundColor,

    applyFormats,

    createFormat,
    resetFormat,
  };
};
export const terminalFormatter = createTerminalFormatter();

