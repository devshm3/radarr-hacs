import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/card.ts',
  output: {
    file: 'custom_components/radarr_hacs/www/radarr-hacs-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    resolve(),
    terser(),
  ],
};
