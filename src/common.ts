export type Nil = undefined | null;

// Location Types
// vvvvvvvvvvvvvvvvvvvvvvvvv

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

// Person Types
// vvvvvvvvvvvvvvvvvvvvvvvvv

export const PersonType = {
  Prowadzacy: 1,
  Zastepca: 2,
  Muzyk: 3,
} as const;

export type PersonType = (typeof PersonType)[keyof typeof PersonType];

export const PersonTypeLabels: Record<keyof typeof PersonType, string> = {
  Prowadzacy: "Prowadzący",
  Zastepca: "Zastępca",
  Muzyk: "Muzyk",
};

export const getPersonTypeLabelById = (
  id: PersonType | string
): string | undefined => {
  const entry = Object.entries(PersonType).find(([, value]) => value === id);
  if (!entry) return undefined;
  const key = entry[0] as keyof typeof PersonType;
  return PersonTypeLabels[key];
};
