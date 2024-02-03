import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: "/todos/",
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/media/*', dest: 'assets/media' },
      ],
    }),
  ],
  build: {
    target: 'esnext', 
  },
});
