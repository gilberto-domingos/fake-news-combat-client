export const Genders = {
  male: 'Masculino',
  female: 'Feminino',
  non_binary: 'Não binário',
  transgender: 'Transgênero',
  other: 'Outro',
} as const;

export type Gender = (typeof Genders)[keyof typeof Genders];
