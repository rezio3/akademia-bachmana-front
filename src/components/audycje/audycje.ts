import dayjs, { Dayjs } from "dayjs";
import { baseUrl } from "../../assets/baseUrl";
import type { AudycjaStatus, LocationType, Nil } from "../../common";
import type { Place } from "../places/places";
import type { Person } from "../persons/persons";

export const getAudycjeList = async (): Promise<any> => {
  const res = await fetch(`${baseUrl}api/audycje`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy audycji.");
  return res.json();
};

export const addAudycja = async (audycja: AudycjaForm) => {
  const startDate = dateRefactor(audycja.date, audycja.startTime);
  const endDate = dateRefactor(audycja.date, audycja.endTime);
  const { date, startTime, endTime, ...rest } = audycja;
  const payload = {
    ...rest,
    startDate,
    endDate,
    locationId: audycja.place.locationTypeId,
  };
  const res = await fetch(`${baseUrl}api/audycje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
export type AudycjaForm = {
  _id?: string;
  place: Place;
  locationId: LocationType;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  leader?: Person | Nil;
  musician?: Person | Nil;
  status: AudycjaStatus;
  price?: number | Nil;
  paymentMethod?: string | Nil;
  description?: string | Nil;
};

const dateRefactor = (date: Dayjs, time: Dayjs) => {
  return dayjs(date)
    .hour(dayjs(time).hour())
    .minute(dayjs(time).minute())
    .second(0)
    .millisecond(0)
    .toDate();
};
