import { INSERT_MOVIE, OPEN_LINK} from "./taskTypes"

export const insertTASK = () => ({
    type: INSERT_MOVIE,
});

export const openLink = (url) => ({
    type: OPEN_LINK,
    url
})
