const buildISOTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

export const appendTransformer = (appendage = '') => ({messages, ...otherInfo}) => (
  {messages: [appendage, ...messages], ...otherInfo}
);
export const prependTransformer = (prependage = '') => ({messages, ...otherInfo}) => (
  {messages: [prependage, ...messages], ...otherInfo}
);
export const padTransformer = (pad = ' ') => ({messages, ...otherInfo}) => (
  {messages: [pad, ...messages, pad], ...otherInfo}
);

export const timestampTransformer = (timestampBuilder = buildISOTimestamp) => (
  appendTransformer(timestampBuilder())
);
