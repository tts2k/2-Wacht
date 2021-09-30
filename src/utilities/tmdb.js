import { v3 } from '@leonardocabeza/the-movie-db';
import { TMDB_API_KEY }from '@env';

export const tmdb = v3(TMDB_API_KEY);
