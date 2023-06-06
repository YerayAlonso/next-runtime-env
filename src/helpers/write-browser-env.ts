import fs from 'fs';
import path from 'path';

import * as log from '../utils/log';

/**
 * Writes the environment variables to the public __env.js file and make them
 * accessible under `window.__env`.
 */
export function writeBrowserEnv(env: NodeJS.ProcessEnv, subdirectory = '') {
  const base = fs.realpathSync(process.cwd());
  const file = `${base}/public/${subdirectory}__env.js`;

  const content = `window.__env = ${JSON.stringify(env)};`;

  const dirname = path.dirname(file);

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  fs.writeFileSync(file, content);

  log.ready(`wrote browser runtime environment variables to '${file}'.`);
}
