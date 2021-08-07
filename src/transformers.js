import {padDigits} from '#packages/number-utils';

const padDoubleDigits = (n) => padDigits(n, 2);
export const timestampTransformer = (
  {level, loggerArguments, messages,  method},
) => {
  const now = new Date();
  const timepieces = [now.getHours(), now.getMinutes(), now.getSeconds()];
  const paddedTimepieces = timepieces.map(padDoubleDigits);
  const timestamp = paddedTimepieces.join(':');

  return {
    level,
    loggerArguments,
    messages: [timestamp, ...messages],
    method,
  };
};

