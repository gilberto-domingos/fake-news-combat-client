declare var process: {
  env: {
    [key: string]: string | undefined;
  };
};

declare module 'src/environments/environment' {
  export const environment: {
    production: boolean;
    apiUrl: string;
    recaptchaSiteKey: string;
  };
}
