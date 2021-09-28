import { TmdbClient } from '@david98hall/tmdb-js';

let apiKey = process.env.TMDB_API_KEY;

export const tmdb = TmdbClient(apiKey);
