import { isBrowser } from './utils/is-browser';

/**
 * Reads a safe environment variable from the browser or any environment
 * variable from the server (process.env).
 */
export function env(key: string): string | undefined {
  if (isBrowser()) {
    // eslint-disable-next-line no-underscore-dangle
    return window.__env[key];
  }

  return process.env[key];
}
