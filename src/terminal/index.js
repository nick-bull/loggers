import {createConsoleLogger} from '#console';
import {terminalFormatter} from '#terminal/format';

const terminalLog = (messageInfo, levelInfo) => {
  const {method, mode} = messageInfo;
  const {messages: levelMessages} = levelInfo;
  const {messages} = messageInfo;

  const processedMessages = messages.map(message =>
    typeof message === 'object' ? JSON.stringify(message) : message
  );

  const message = processedMessages.join(' ');
  const levelMessage = levelMessages.join('');

  console[mode](`${levelMessage}${message}`);
};
export const createTerminalLogger = createConsoleLogger({
  logMethod: terminalLog,
  formatter: terminalFormatter,
});

