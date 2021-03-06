import util from 'util';

import {createConsoleLogger} from '#console';
import {terminalFormatter} from '#terminal/format';

const terminalLog = (messageInfo, levelInfo) => {
  const {messages: levelMessages} = levelInfo;
  const {mode, messages} = messageInfo;

  const processedMessages = messages.map((message) => (typeof message === 'object'
    ? util.inspect(message, {showHidden: false, depth: null})
    : message));

  const message = processedMessages.join(' ');
  const levelMessage = levelMessages.join('');

  /* eslint-disable-next-line no-console */
  console[mode](`${levelMessage}${message}`);
};
export const createTerminalLogger = createConsoleLogger({
  logMethod: terminalLog,
  formatter: terminalFormatter,
});
