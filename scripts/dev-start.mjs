import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

const PORTS = [3000, 3004];

function killPortWindows(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    const pids = new Set();
    for (const line of output.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed.includes('LISTENING')) continue;
      const pid = trimmed.split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid) && pid !== '0') pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch {
        // already exited
      }
    }
  } catch {
    // port not in use
  }
}

function killPortUnix(port) {
  try {
    const output = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8' }).trim();
    if (!output) return;
    for (const pid of output.split(/\s+/)) {
      if (pid) {
        try {
          process.kill(Number(pid), 'SIGTERM');
        } catch {
          // ignore
        }
      }
    }
  } catch {
    // port not in use
  }
}

for (const port of PORTS) {
  if (process.platform === 'win32') killPortWindows(port);
  else killPortUnix(port);
}

if (existsSync('.next')) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      rmSync('.next', {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 300,
      });
      break;
    } catch (err) {
      if (attempt === 4) {
        console.warn('[dev-start] 无法删除 .next，请手动结束 node 进程后重试:', err.message);
      } else {
        execSync('timeout /t 1 /nobreak >nul 2>&1', { stdio: 'ignore', shell: true });
      }
    }
  }
}

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
