
import "server-only";

export async function getShows() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing");
  }

  const response = await fetch(`${apiUrl}/api/shows`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load shows");
  }

  return response.json();
}
