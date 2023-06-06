import { getPublicEnv } from './helpers/get-public-env';
import { writeBrowserEnv } from './helpers/write-browser-env';

export type ConfigureRuntimeEnvOptions = {
  /**
   * The subdirectory of `/public` where the `__env.js` file should be written
   * eg. `subdirectory/`to.
   */
  subdirectory?: string;
};

/**
 * Reads all environment variables that start with `NEXT_PUBLIC_` and writes
 * them to the public `__env.js` file. This makes them accessible under the
 * `window.__env` object.
 *
 * Options:
 * ```ts
 * type ConfigureRuntimeEnvOptions = {
 *  // The subdirectory of `/public` where the `__env.js` file should be written to. eg. `subdirectory/`
 *  subdirectory?: string;
 * };
 * ```
 */
export function configureRuntimeEnv(options?: ConfigureRuntimeEnvOptions) {
  const publicEnv = getPublicEnv();

  writeBrowserEnv(publicEnv, options?.subdirectory);
}
