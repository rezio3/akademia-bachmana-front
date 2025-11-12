export type Nil = undefined | null;

export const LocationType = {
  Lubelskie: 1,
  Mazowieckie: 2,
  Lodzkie: 3,
  KujawskoPomorskie: 4,
} as const;

export type LocationType = (typeof LocationType)[keyof typeof LocationType];

export const LocationTypeLabels: Record<keyof typeof LocationType, string> = {
  Lubelskie: "Lubelskie",
  Mazowieckie: "Mazowieckie",
  Lodzkie: "Łódzkie",
  KujawskoPomorskie: "Kujawsko-Pomorskie",
};

export const getLocationLabelById = (
  id: LocationType | string
): string | undefined => {
  const entry = Object.entries(LocationType).find(([, value]) => value === id);
  if (!entry) return undefined;
  const key = entry[0] as keyof typeof LocationType;
  return LocationTypeLabels[key];
};
