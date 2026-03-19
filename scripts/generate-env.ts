import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const envDir = path.join(process.cwd(), 'src/environments');
if (!fs.existsSync(envDir)) fs.mkdirSync(envDir, { recursive: true });

const targetPathDev = path.join(envDir, 'environment.ts');
const targetPathProd = path.join(envDir, 'environment.prod.ts');

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Variável obrigatória não definida: ${name}`);
    process.exit(1);
  }
  return value;
}

function optionalEnv(name: string, fallback = ''): string {
  return process.env[name] || fallback;
}

const devFile = `
export const environment = {
  production: false,
  apiUrl: '${optionalEnv('DEV_API_URL')}',
  recaptchaSiteKey: '${optionalEnv('RECAPTCHA_SITE_KEY', '')}'
};
`;

const prodFile = `
export const environment = {
  production: true,
  apiUrl: '${requiredEnv('PROD_API_URL')}',
  recaptchaSiteKey: '${requiredEnv('RECAPTCHA_SITE_KEY')}'
};
`;

fs.writeFileSync(targetPathDev, devFile, { encoding: 'utf8' });
fs.writeFileSync(targetPathProd, prodFile, { encoding: 'utf8' });

console.log('Environment files generated successfully!');
