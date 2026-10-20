
export function validateShow(data) {
  let errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Request body must be an object"];
  }

  if (typeof data.title !== "string" || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (typeof data.genre !== "string" || !data.genre.trim()) {
    errors.push("Genre is required");
  }

  if (!Number.isInteger(data.seasons) || data.seasons < 1) {
    errors.push("Seasons must be a positive whole number");
  }

  return errors;
}
