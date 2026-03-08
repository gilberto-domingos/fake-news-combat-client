import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const envDir = path.join(process.cwd(), 'src/environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const targetPathDev = path.join(process.cwd(), 'src/environments/environment.ts');
const targetPathProd = path.join(process.cwd(), 'src/environments/environment.prod.ts');

function env(name: string, fallback = ''): string {
  const value = process.env[name];

  if (!value) {
    console.warn(`Variável ${name} não definida. Usando fallback: "${fallback}"`);
    return fallback;
  }

  return value;
}

const devFile = `
export const environment: { production: boolean; apiUrl: string; recaptchaSiteKey: string } = {
  production: false,
  apiUrl: '${env('DEV_API_URL')}',
  recaptchaSiteKey: '${env('VITE_RECAPTCHA_SITE_KEY')}'
};
`;

const prodFile = `
export const environment: { production: boolean; apiUrl: string; recaptchaSiteKey: string } = {
  production: true,
  apiUrl: '${env('PROD_API_URL') || env('PROD_API_SITE_URL')}',
  recaptchaSiteKey: '${env('VITE_RECAPTCHA_SITE_KEY')}'
};
`;

fs.writeFileSync(targetPathDev, devFile, { encoding: 'utf8' });
fs.writeFileSync(targetPathProd, prodFile, { encoding: 'utf8' });

console.log('Environment files generated successfully!');
