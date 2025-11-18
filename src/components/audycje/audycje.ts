import dayjs, { Dayjs } from "dayjs";
import { baseUrl } from "../../assets/baseUrl";
import type { AudycjaStatus, LocationType, Nil } from "../../common";
import type { Place } from "../places/places";
import type { Person } from "../persons/persons";

export const getAudycjeList = async (
  locationId: LocationType,
  month: number,
  year: number
): Promise<any> => {
  const params = new URLSearchParams();
  if (locationId !== null) {
    params.append("location", locationId.toString());
  }
  if (month !== null) {
    params.append("month", month.toString());
  }
  if (year !== null) {
    params.append("year", year.toString());
  }
  const res = await fetch(`${baseUrl}api/audycje?${params.toString()}`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy audycji.");
  return res.json();
};

export const addAudycja = async (audycja: AudycjaForm) => {
  const startDate = dateRefactor(audycja.date, audycja.startTime);
  const endDate = dateRefactor(audycja.date, audycja.endTime);
  const placeId = audycja.place._id;
  const leaderId = audycja.leader?._id;
  const musicianId = audycja.musician?._id;

  const { date, startTime, endTime, place, musician, leader, ...rest } =
    audycja;
  const payload = {
    ...rest,
    startDate,
    endDate,
    placeId,
    leaderId,
    musicianId,
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

export const updateAudycja = async (audycja: AudycjaForm) => {
  if (!audycja._id) {
    throw new Error("Brak ID audycji do edycji");
  }

  const startDate = dateRefactor(audycja.date, audycja.startTime);
  const endDate = dateRefactor(audycja.date, audycja.endTime);
  const placeId = audycja.place._id;
  const leaderId = audycja.leader?._id;
  const musicianId = audycja.musician?._id;

  const { date, startTime, endTime, place, musician, leader, ...rest } =
    audycja;
  const payload = {
    ...rest,
    startDate,
    endDate,
    placeId,
    leaderId,
    musicianId,
    locationId: audycja.place.locationTypeId,
  };

  const res = await fetch(`${baseUrl}api/audycje/${audycja._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas edycji audycji");
  }

  return res.json();
};

export const deleteAudycja = async (id: string) => {
  const res = await fetch(`${baseUrl}api/audycje/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas usuwania audycji");
  }

  return res.json();
};

export type Audycja = {
  _id?: string;
  place: Place;
  locationId: LocationType;
  startDate: Date;
  endDate: Date;
  leader?: Person | Nil;
  musician?: Person | Nil;
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
