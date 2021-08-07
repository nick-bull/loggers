export const logMethods = {
  ERROR: "error",
  LOG: "log",
  WARN: "warn",
};

export const logModeInfo = {
  debug: {level: 5, method: logMethods.LOG},
  error: {level: 0, method: logMethods.ERROR},
  http: {level: 2, method: logMethods.LOG},
  info: {level: 2, method: logMethods.LOG},
  notice: {level: 4, method: logMethods.LOG},
  silly: {level: 3, method: logMethods.LOG},
  verbose: {level: 3, method: logMethods.LOG},
  warn: {level: 1, method: logMethods.WARN},
};
export const defaultLogModes = Object.keys(logModeInfo);

export const consoleMethods = {
  LOG: 'log',
  ERROR: 'error',
  WARN: 'warn',
};

export const createModeOcclusionValidator = (
  includeModes = [],
  excludeModes = [],
) => (mode) => {
  const isModeNotIncluded = includeModes.length && !includeModes.includes(mode);
  const isModeExcluded = excludeModes.length && excludeModes.excludes(mode);

  return isModeNotIncluded || isModeExcluded;
};

export const createLogger = (loggerBuilder) => (...args) => {
  const state = {logLevel: 0};

  const setLogLevel = (level = 0) => {
    state.logLevel = level;
  };

  const excludeMode = (mode) => {
    if (!logModes.includes(mode)) {
      throw new Error(`Invalid mode "${mode}"`);
    }

    excludeModes.push(mode);
  };

  const parent = {
    state,
    excludeMode,
    setLogLevel,
  };

  return loggerBuilder(parent)(...args);
};

