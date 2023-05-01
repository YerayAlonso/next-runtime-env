# Next.js Runtime Environment Configuration

![GitHub branch checks state][build-url] [![codecov][cov-img]][cov-url]

Populates your environment at **runtime** rather than **build time**.

- Isomorphic - Server and browser compatible (and even in middleware.)
- Static site generation support.
- `.env` support during development, just like [Next.js][nextjs-env-vars-order].

### The problem 🤔

[Build once, deploy many][build-once-deploy-many-link] is an essential principle
of software development. The main idea is to use the same bundle for all
environments, from testing to production. This approach enables easy deployment
and testability and is considered a
[fundamental principle of continuous delivery][fundamental-principle-link]. It
is also part of the [twelve-factor methodology][twelve-factor-link]. As crucial
as it is, it has yet to receive significant support in the world of front-end
development, and Next.js is no exception.

Next.js supports [environment variables][nextjs-env-vars], but only at
build time. This means you must rebuild your app for each target environment,
which violates the principle. And it is the most common approach nowadays. But
what if you want, or need, to follow the build once, deploy many principle?

### The solution 🤓

`next-runtime-env` solves this problem by generating a JavaScript file that is
loaded by the browser and contains the environment variables. We generate this
file at runtime, so you don't have to declare your environment variables at
build time. This approach is also compatible with
[static site generation][static-generation-link], and it works on the server as
well. It also supports middleware, so you can use it to populate your
environment variables in your API routes.

### Getting started 🚀

1. Add the following lines to your `next.config.js`:

```js
const { configureRuntimeEnv } = require('next-runtime-env/build/configure');

configureRuntimeEnv();
```

When the server starts, this generates an `__ENV.js` file in the `public` folder
containing allow-listed environment variables with a `NEXT_PUBLIC_` prefix.

2. Add the following to the head section of your `pages/_document.js`:

```jsx
// pages/_document.tsx
<script src="/__ENV.js" />
```

This will load the generated file in the browser.

### Usage 🧑‍💻

In the browser, your variables will now be available at
`window.__ENV.NEXT_PUBLIC_FOO` and on the server at `process.env.NEXT_PUBLIC_FOO`.

#### Helper function 🙌

We have included the `env()` helper function to make retrieving a value easier:

```bash
# .env
NEXT_PUBLIC_FOO="foo"
BAR="bar"
```

```jsx
type Props = {
  bar: string,
};

export default function SomePage({ bar }: Props) {
  return (
    <div>
      {window.__ENV.NEXT_PUBLIC_FOO} {bar}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      bar: process.env.BAR,
    },
  };
};
```

Becomes...

```jsx
import { env } from 'next-runtime-env';

type Props = {
  bar: string,
};

export default function SomePage({ bar }: Props) {
  return (
    <div>
      {env('NEXT_PUBLIC_FOO')} {bar}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      bar: env('BAR'),
    },
  };
};
```

### Maintenance 👷

This package is maintained and actively used by [Expatfile.tax][expatfile-site].
The #1 US expat tax e-filing software. 🇺🇸

### Other work 📚

Big thanks to the [react-env][react-env-repo] project, which inspired us. 🙏

[build-url]: https://img.shields.io/github/checks-status/expatfile/next-runtime-env/main
[cov-img]: https://codecov.io/gh/expatfile/next-runtime-env/branch/main/graph/badge.svg?token=mbGgsweFuP
[cov-url]: https://codecov.io/gh/expatfile/next-runtime-env
[nextjs-env-vars-order]: https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order
[build-once-deploy-many-link]: https://www.mikemcgarr.com/blog/build-once-deploy-many.html
[fundamental-principle-link]: https://cloud.redhat.com/blog/build-once-deploy-anywhere
[twelve-factor-link]: https://12factor.net
[static-generation-link]: https://nextjs.org/docs/basic-features/pages#static-generation
[nextjs-env-vars]: https://nextjs.org/docs/basic-features/environment-variables
[react-env-repo]: https://github.com/andrewmclagan/react-env
[expatfile-site]: https://expatfile.tax
