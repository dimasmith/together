import log4js from 'log4js';

const logger = log4js.getLogger();

/**
 * Create named logger
 * @param {string} name
 */
export function createLogger(name) {
  const loggerScope = `[${name}]`;
  return log4js.getLogger(loggerScope);
}

export default logger;
