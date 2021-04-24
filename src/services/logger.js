const Logger = {
  info: (msg) => console.info(`[${time()}] ${msg}`),
  log: (data) => console.log(`[${time()}]`, data),
  warn: (msg) => console.warn(`[${time()}] ${msg}`),
  error: (msg) => console.error(`[${time()}] ${msg}`),
  table: (data) => console.table(data),
};

const time = () => new Date().toLocaleTimeString();

export default Logger;
