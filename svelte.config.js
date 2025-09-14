import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';
// Allow overriding via BASE_PATH; default to GitHub Pages repo path
const basePath = dev ? '' : (process.env.BASE_PATH || '/cargame');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
      base: basePath
    }
  }
};

export default config;
