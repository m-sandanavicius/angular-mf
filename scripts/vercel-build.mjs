import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const targets = new Set(['shop-shell', 'cart', 'checkout', 'admin']);
const target = process.env.APP_TARGET;
if (!targets.has(target)) {
  throw new Error('APP_TARGET must be shop-shell, cart, checkout, or admin.');
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
execFileSync(npx, ['ng', 'build', target], { stdio: 'inherit' });

const source = join('dist', target, 'browser');
const output = 'vercel-output';
if (!existsSync(source)) throw new Error(`Build output missing: ${source}`);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });

if (target === 'shop-shell') {
  const remotes = {
    cart: process.env.CART_REMOTE_URL || 'http://localhost:4201/remoteEntry.json',
    checkout: process.env.CHECKOUT_REMOTE_URL || 'http://localhost:4202/remoteEntry.json',
    admin: process.env.ADMIN_REMOTE_URL || 'http://localhost:4203/remoteEntry.json'
  };
  writeFileSync(join(output, 'assets', 'federation.manifest.json'), JSON.stringify(remotes, null, 2));
}
