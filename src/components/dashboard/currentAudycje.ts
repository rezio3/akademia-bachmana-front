import { baseUrl } from "../../assets/baseUrl";

export const getCurrentAudycjeList = async (): Promise<any> => {
  const res = await fetch(`${baseUrl}api/dashboard/current`);
  if (!res.ok) throw new Error("Błąd podczas pobierania aktualnych audycji.");
  return res.json();
};
