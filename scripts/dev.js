'use strict';

const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const backendDir = path.join(root, 'packages', 'backend');
const frontendDir = path.join(root, 'packages', 'frontend');

const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';

function run(cwd, script) {
  const child = spawn(npm, ['run', script], {
    cwd,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' }
  });
  child.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) process.exit(code);
  });
  return child;
}

console.log('Starting backend and frontend...');
run(backendDir, 'dev');
run(frontendDir, 'dev');
