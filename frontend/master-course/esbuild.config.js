const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.js'], // Replace with your entry point
    bundle: true,
    outfile: 'dist/bundle.js', // Replace with your output file
    loader: { '.js': 'jsx' }, // Set the loader for ".js" files to "jsx"
  }).catch(() => process.exit(1));
  