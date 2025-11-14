export type Nil = undefined | null;

// Location Types
// vvvvvvvvvvvvvvvvvvvvvvvvv

export const LocationTypeMap = {
  Lubelskie: 1,
  Mazowieckie: 2,
  Lodzkie: 3,
  KujawskoPomorskie: 4,
} as const;

export type LocationType =
  (typeof LocationTypeMap)[keyof typeof LocationTypeMap];

export const LocationTypeLabels: Record<keyof typeof LocationTypeMap, string> =
  {
    Lubelskie: "Lubuskie",
    Mazowieckie: "Mazowieckie",
    Lodzkie: "Łódzkie",
    KujawskoPomorskie: "Kujawsko-Pomorskie",
  };

export const getLocationLabelById = (
  id: LocationType | string
): string | undefined => {
  const entry = Object.entries(LocationTypeMap).find(
    ([, value]) => value === id
  );
  if (!entry) return undefined;
  const key = entry[0] as keyof typeof LocationTypeMap;
  return LocationTypeLabels[key];
};

// Person Types
// vvvvvvvvvvvvvvvvvvvvvvvvv

export const PersonTypeMap = {
  Prowadzacy: 1,
  Zastepca: 2,
  Muzyk: 3,
} as const;

export type PersonType = (typeof PersonTypeMap)[keyof typeof PersonTypeMap];

export const PersonTypeLabels: Record<keyof typeof PersonTypeMap, string> = {
  Prowadzacy: "Prowadzący",
  Zastepca: "Zastępca",
  Muzyk: "Muzyk",
};

export const getPersonTypeLabelById = (
  id: PersonType | string
): string | undefined => {
  const entry = Object.entries(PersonTypeMap).find(([, value]) => value === id);
  if (!entry) return undefined;
  const key = entry[0] as keyof typeof PersonTypeMap;
  return PersonTypeLabels[key];
};

// Audycja Statuses
// vvvvvvvvvvvvvvvvvvvvvvvvv

export const AudycjaStatusMap = {
  Aktywna: 1,
  Niepewna: 2,
  Anulowana: 3,
} as const;

export type AudycjaStatus =
  (typeof AudycjaStatusMap)[keyof typeof AudycjaStatusMap];

export const AudycjaStatusLabels: Record<
  keyof typeof AudycjaStatusMap,
  string
> = {
  Aktywna: "Aktywna",
  Niepewna: "Niepewna",
  Anulowana: "Anulowana",
};

export const getAudycjaStatusLabelById = (
  id: AudycjaStatus | number
): string | undefined => {
  const entry = Object.entries(AudycjaStatusMap).find(
    ([, value]) => value === id
  );
  if (!entry) return undefined;

  const key = entry[0] as keyof typeof AudycjaStatusMap;
  return AudycjaStatusLabels[key];
};
