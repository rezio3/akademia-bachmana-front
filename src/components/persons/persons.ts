import { baseUrl } from "../../assets/baseUrl";
import { type LocationType, type Nil, type PersonType } from "../../common";
export const getPersonsList = async (
  page = 1,
  limit = 10,
  filter = ""
): Promise<PersonsResponse> => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (filter?.trim()) query.append("search", filter);
  const res = await fetch(`${baseUrl}api/persons?${query.toString()}`);
  if (!res.ok) throw new Error("Błąd podczas pobierania listy osób.");
  return res.json();
};

export const addPerson = async (person: Person) => {
  const res = await fetch(`${baseUrl}api/persons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas dodawania osoby");
  }
  return res.json();
};

export const updatePerson = async (person: Person) => {
  if (!person._id) {
    throw new Error("Brak ID osoby do edycji");
  }

  const res = await fetch(`${baseUrl}api/persons/${person._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas edycji osoby");
  }

  return res.json();
};

export const deletePerson = async (_id: string) => {
  const res = await fetch(`${baseUrl}api/persons/${_id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(res.status, errorText);
    throw new Error("Błąd podczas usuwania osoby");
  }

  return res.json();
};

export type Person = {
  _id?: string;
  name: string;
  personType: PersonType;
  phone?: string | number | Nil;
  email?: string | Nil;
  location: LocationType;
  description?: string;
};

export type PersonsResponse = {
  persons: Person[];
  totalPages: number;
};

export const getPersonsDropdownList = async (
  filter = "",
  isMusician: boolean
): Promise<PersonsResponse> => {
  const query = new URLSearchParams();

  if (filter?.trim()) {
    query.append("search", filter);
  }

  const queryString = query.toString();
  const leadersUrl = queryString
    ? `${baseUrl}api/leaders?${queryString}`
    : `${baseUrl}api/leaders`;

  const musiciansUrl = queryString
    ? `${baseUrl}api/musicians?${queryString}`
    : `${baseUrl}api/musicians`;

  const res = await fetch(isMusician ? musiciansUrl : leadersUrl);

  if (!res.ok) throw new Error("Błąd podczas pobierania listy osób.");

  return res.json();
};
