import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'multiplayer-race-game';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
      base: dev ? '' : `/${repoName}`
    }
  }
};

export default config;
