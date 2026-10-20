
export function validateWatchlist(data) {
    let errors = [];

    if (!Number.isInteger(data.userId) || data.userId < 1) {
        errors.push("User ID must be a positive number");
    }

    if (!Number.isInteger(data.showId) || data.showId < 1) {
        errors.push("Show ID must be a positive number");
    }

    if (typeof data.watched !== "boolean") {
        errors.push("Watched must be true or false");
    }

    if (!Number.isInteger(data.currentSeason) || data.currentSeason < 1) {
        errors.push("Season must be at least 1");
    }

    if (!Number.isInteger(data.currentEpisode) || data.currentEpisode < 1) {
        errors.push("Episode must be at least 1");
    }

    if (data.rating !== undefined &&
        (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5)) {
        errors.push("Rating must be between 1 and 5 stars");
    }

    return errors;
}
