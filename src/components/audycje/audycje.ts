import { baseUrl } from "../../assets/baseUrl";
import type { AudycjaStatus, LocationType, Nil } from "../../common";

export const getAudycjeList = async (): Promise<any> => {
  const res = await fetch(`${baseUrl}api/audycje`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy placówek.");
  return res.json();
};

export const addAudycja = async (place: Audycja) => {
  const res = await fetch(`${baseUrl}api/audycje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas dodawania audycji");
  }
  return res.json();
};

export type Audycja = {
  _id?: string;
  place: { name: string; _id: string };
  locationId: LocationType;
  startDate: Date;
  endDate: Date;
  leader?: { name: string; _id: string } | Nil;
  musician?: { name: string; _id: string } | Nil;
  status: AudycjaStatus;
  price?: number | Nil;
  paymentMethod?: string | Nil;
  description?: string | Nil;
};
