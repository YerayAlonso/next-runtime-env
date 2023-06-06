import { isBrowser } from './utils/is-browser';

/**
 * Reads all safe environment variables from the browser or all environment
 * variables from the server.
 */
export function allEnv(): NodeJS.ProcessEnv {
  if (isBrowser()) {
    // eslint-disable-next-line no-underscore-dangle
    return window.__env;
  }

  return process.env;
}
