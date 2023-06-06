/* istanbul ignore file */

// This allows TypeScript to detect our global value.
declare global {
  interface Window {
    __env: NodeJS.ProcessEnv;
  }
}

export { allEnv } from './all-env';
export { env } from './env';
