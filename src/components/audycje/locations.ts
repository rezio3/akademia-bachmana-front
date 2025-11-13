export const Location = {
  Lubuskie: 1,
  Mazowieckie: 2,
  Lodzkie: 3,
  KujawskoPomorskie: 4,
} as const;

export type LocationEnum = (typeof Location)[keyof typeof Location];

export const displayNameByLocation: Record<LocationEnum, string> = {
  [Location.Lubuskie]: "Lubuskie",
  [Location.Mazowieckie]: "Mazowieckie",
  [Location.Lodzkie]: "Łódzkie",
  [Location.KujawskoPomorskie]: "Kujawsko-pomorskie",
};
