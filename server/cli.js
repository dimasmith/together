/**
 * CLI runner for together system
 */
import program from 'commander';
import daemon from 'daemon';
import startApp from './app.js';
import defaultConfig from '../config.js';
import packageInfo from '../package.json';

program
  .version(packageInfo.version)
  .description('Starts server and show photos from specified dir')
  .arguments('<photos-dir>')
  .option('-p --port [port]', 'Server port', 8000)
  .option('-w --cwd [dir]', 'Application working directory', './')
  .option('-d --daemon', 'Run application in daemon mode', false);

program.parse(process.argv);

if (program.cwd !== process.cwd()) {
  process.chdir(program.cwd);
}

const port = program.port || process.env.SERVER_PORT || 8000;
const photosDir = program.args[0] || process.env.PHOTOS;

if (!photosDir) {
  console.error('Please provide photos directory');
  program.outputHelp();
  process.exit(1);
}

const config = Object.assign({}, defaultConfig);
config.development = false;
config.port = port;
config.photosDir = photosDir;
config.previewLoader.type = 'filesystem';
config.previewLoader.config.photosDir = photosDir;

if (program.daemon) {
  daemon();
}

startApp(config);
