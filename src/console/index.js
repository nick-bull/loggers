import {
  createLogger,
  defaultLogModes,
  logModeInfo,
} from '#root';

const formatLevelMessage = (info) => {
  const {messages} = info;
  const levelMessage = messages.map((message) => String(message).toUpperCase());
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
    invertColors,
    textColor,
  } = {},
  logMethod,
  logModes = defaultLogModes,
} = {}) => ({
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
  const {state: {logLevel}, isOccludedLogMode} = parent;
  const state = {levelTransformers, transformers};

  const addLevelFormat = (...formats) => {
    state.levelTransformers.unshift(applyFormats(...formats));
  };
  const addMessageFormat = (...formats) => {
    state.transformers.unshift(applyFormats(...formats));
  };

  const addLevelTransformer = (...tx) => {
    state.transformers.unshift(...tx);
  };
  const clearLevelTransformers = () => {
    state.levelTransformers.length = 0;
  };

  const addMessageTransformer = (...tx) => {
    state.transformers.unshift(...tx);
  };
  const clearMessageTransformers = () => {
    state.transformers.length = 0;
  };

  const createLogMethod = (mode) => (...messages) => {
    const {level, method} = logModeInfo[mode];

    const isModeOccluded = isOccludedLogMode(mode);
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
    const messageInfo = state.transformers.reduce(composeReducer, txMessageInfo);

    const txLevelInfo = {
      loggerArguments: [],
      messages: [mode],
      method,
      mode,
    };
    const modeInfo = (isPrinted)
      ? state.levelTransformers.reduce(composeReducer, txLevelInfo)
      : {};

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
    addMessageFormat,

    addLevelTransformer,
    clearLevelTransformers,

    addMessageTransformer,
    clearMessageTransformers,
  };
});
