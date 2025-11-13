import { baseUrl } from "../../assets/baseUrl";
import type { LocationType, Nil } from "../../common";

export const getPlacowkiList = async (
  page = 1,
  limit = 10,
  filter = ""
): Promise<any> => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (filter?.trim()) query.append("search", filter);
  const res = await fetch(`${baseUrl}api/places?${query.toString()}`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy placówek.");
  return res.json();
};

export const addPlacowka = async (placowka: Placowka) => {
  const res = await fetch(`${baseUrl}api/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(placowka),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas dodawania placówki");
  }
  return res.json();
};

export const updatePlacowka = async (placowka: Placowka) => {
  if (!placowka._id) {
    throw new Error("Brak ID placówki do edycji");
  }

  const res = await fetch(`${baseUrl}api/places/${placowka._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(placowka),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas edycji placówki");
  }

  return res.json();
};

export const deletePlacowka = async (_id: string) => {
  const res = await fetch(`${baseUrl}api/places/${_id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas usuwania placówki");
  }

  return res.json();
};

export type Placowka = {
  _id?: string;
  name: string;
  phone?: string | Nil;
  email?: string | Nil;
  address?: string | Nil;
  invoiceEmail?: string | Nil;
  contactPerson?: string | Nil;
  locationTypeId: LocationType | string;
  description?: string;
  nip?: string;
  regon?: string;
};
