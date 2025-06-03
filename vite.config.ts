import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
	resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
	plugins: [tailwindcss(), sveltekit()]
});
