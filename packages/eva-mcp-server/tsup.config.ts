import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'node18',
  entry: ['./src/stdio-server.ts', './src/sse-server.ts'],
  dts: true,
  clean: true,
  format: [
    'cjs', 'esm'
  ],
})