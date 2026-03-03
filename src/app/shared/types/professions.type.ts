export const Professionals = {
  businessperson: 'Empresário',
  Journalist: 'Jornalista',
  Celebrity: 'Celebridade',
  Authority: 'Autoridade',
  Investigator: 'Investigador',
  Police: 'Policial',
  Private: 'Outro',
} as const;

export type Profession = (typeof Professionals)[keyof typeof Professionals];
