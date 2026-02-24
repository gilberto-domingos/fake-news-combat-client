export const Professionals = {
  businessperson: 'Empresário',
  Journalist: 'Jornalista',
  Celebrity: 'Celebridade',
  Authority: 'Autoridade',
  Investigator: 'Investigador',
  Police: 'Policia',
  Private: 'Particular',
} as const;

export type Profession = (typeof Professionals)[keyof typeof Professionals];
