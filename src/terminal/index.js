import {createConsoleLogger} from '#console';
import {terminalFormatter} from '#terminal/format';

const terminalLog = (messageInfo, levelInfo) => {
  const {method, mode} = messageInfo;
  const {messages: levelMessages} = levelInfo;
  const {messages} = messageInfo;

  const message = messages.join(' ');
  const levelMessage = levelMessages.join('');

  console[mode](`${levelMessage}${message}`);
};
export const createTerminalLogger = createConsoleLogger({
  logMethod: terminalLog,
  formatter: terminalFormatter,
});

