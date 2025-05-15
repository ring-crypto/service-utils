import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    target: 'esnext', // Target latest JavaScript features
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ServiceUtils', // Global variable name for UMD build (if UMD is added as a format)
      fileName: (format) => `service-utils.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [], // e.g., ['react', 'vue']
      output: {
        globals: {}, // e.g., { react: 'React', vue: 'Vue' }
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
  ],
});
