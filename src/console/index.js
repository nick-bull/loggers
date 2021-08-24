import {
  createLogger,
  createModeOcclusionValidator,
  defaultLogModes,
  logModeInfo,
} from '#root';

const formatLevelMessage = (info) => {
  const {messages} = info;
  const levelMessage = messages.map(message => String(message).toUpperCase());
  const formattedLevelMessages = [
    ` [${levelMessage}] `,
  ];

  return {
    ...info,
    messages: formattedLevelMessages,
  };
};

export const createConsoleLogger = createLogger((parent) => ({
  formatter: {
    applyFormats,
    bold,
    backgroundColor,
    invertColors,
    textColor,
  } = {},
  logMethod,
  logModes = defaultLogModes,
} = {}) => ({
  includeModes = [],
  excludeModes = [],
  transformers = [
    applyFormats(textColor()),
  ],
  levelOptions: {
    isPrinted = true,
    transformers: levelTransformers = [
      formatLevelMessage,
      applyFormats(bold, textColor(), invertColors),
    ],
  } = {},
} = {}) => {
  const {state: {logLevel}} = parent;
  const state = {};

  const isOccludedLogMode = createModeOcclusionValidator(
    includeModes,
    excludeModes,
  );

  const addLevelFormat = (...formats) => {
    levelTransformers.unshift(applyFormats(...formats));
  };
  const clearLevelFormats = () => {
    levelTransformers.length = 0;
  };

  const addMessageFormat = (...formats) => {
    transformers.unshift(applyFormats(...formats));
  };
  const clearMessageFormats = () => {
    transformers.length = 0;
  };

  const createLogMethod = (mode) => (...messages) => {
    const {level, method} = logModeInfo[mode];

    const isModeOccluded = isOccludedLogMode(includeModes, excludeModes);
    const isWithinLogLevel = level >= logLevel;

    if (isModeOccluded || !isWithinLogLevel) {
      return;
    }
    
    const composeReducer = (acc, val) => val(acc);

    const txMessageInfo = {
      loggerArguments: [],
      messages,
      method,
      mode,
    };
    const messageInfo = transformers.reduce(composeReducer, txMessageInfo);

    const txLevelInfo = {
      loggerArguments: [],
      messages: [mode],
      method,
      mode,
    };
    const modeInfo = levelTransformers.reduce(composeReducer, txLevelInfo);

    logMethod(messageInfo, modeInfo);
  };

  const logMethods = logModes.reduce(
    (methods, mode) => Object.assign(methods, {[mode]: createLogMethod(mode)}),
    {},
  );

  return {
    ...parent,
    ...logMethods,

    addLevelFormat,
    clearLevelFormats,

    addMessageFormat,
    clearMessageFormats,
  };
});

