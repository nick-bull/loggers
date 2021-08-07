import {createConsoleLogger} from '#console';
import {browserFormatter} from '#browser/format';

const browserLog = (messageInfo, levelInfo) => {
  const {level, method} = messageInfo;
  const {loggerArguments: levelArgs, messages: levelMessages} = levelInfo;
  const {loggerArguments: messageArgs, messages} = messageInfo;

  const [levelFormat = ''] = levelArgs;
  const [messageFormat = ''] = messageArgs;

  const message = messages.join(' ');
  const levelMessage = levelMessages.join(' ');

  const concatMessage = `%c${message}%c${levelMessage}`;

  console[method](concatMessage, levelFormat, messageFormat);
};
export const browserLogger = createConsoleLogger({
  logMethod: browserLog,
  formatter: browserFormatter,
});

