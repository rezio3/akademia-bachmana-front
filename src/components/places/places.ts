import { baseUrl } from "../../assets/baseUrl";
import type { LocationType, Nil } from "../../common";

export const getPlacesList = async (
  page?: number,
  limit?: number,
  filter?: string
): Promise<PlacesResponse> => {
  const query = new URLSearchParams();

  if (page !== undefined) query.append("page", page.toString());
  if (limit !== undefined) query.append("limit", limit.toString());

  if (filter?.trim()) query.append("search", filter);

  const res = await fetch(`${baseUrl}api/places?${query.toString()}`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy placówek.");
  return res.json();
};

export const addPlace = async (place: Place) => {
  const res = await fetch(`${baseUrl}api/places`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas dodawania placówki");
  }
  return res.json();
};

export const updatePlace = async (place: Place) => {
  if (!place._id) {
    throw new Error("Brak ID placówki do edycji");
  }

  const res = await fetch(`${baseUrl}api/places/${place._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas edycji placówki");
  }

  return res.json();
};

export const deletePlace = async (_id: string) => {
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

export type Place = {
  _id?: string;
  name: string;
  phone?: string | Nil;
  email?: string | Nil;
  address?: string | Nil;
  invoiceEmail?: string | Nil;
  contactPerson?: string | Nil;
  locationTypeId: LocationType;
  description?: string;
  nip?: string;
  regon?: string;
};

export type PlacesResponse = {
  totalPages: number;
  places: Place[];
};
