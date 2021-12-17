import * as SQLite from "expo-sqlite";
import { downloadImageToBase64 } from "./misc";

const db = SQLite.openDatabase("wl.db");

const createDatabase = async () => {
    db.transaction((tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS Movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tmdbid TEXT UNIQUE,
            name TEXT,
            synopsis TEXT,
            status TEXT,
            genre TEXT,
            score TEXT,
            poster TEXT,
            release_date TEXT);`
        );
    }, [])
}

const getAllMovies = async () => {
    return new Promise((resolve, reject) =>{
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Movies', [], 
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
            })
        })
}

const insertMovie = async (movie) => {
    let poster = await downloadImageToBase64(movie.poster_path);
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Movies
                (tmdbid, name, synopsis, status, genre, score, poster, release_date) values
                (?, ?, ?, ?, ?, ?, ?, ?)`,
                [movie.id, movie.title, movie.overview, "Planned", '', movie.score, poster, movie.release_date],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        }, null, null)
    })
}

const insertMovieImport = async (movie) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO Movies
                (tmdbid, name, synopsis, status, genre, score, poster, release_date) values
                (?, ?, ?, ?, ?, ?, ?, ?)`,
                [movie.tmdbid, movie.name, movie.synopsis, movie.status, '', movie.score, movie.poster, movie.release_date],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        }, null, null)
    })
}

const deleteMovie = (id) => {
    db.transaction((tx) => {
        tx.executeSql(`DELETE FROM Movies WHERE id = ?`, [id])
    })
}

const updateStatus = async (id, status) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE Movies
                SET status = ?
                WHERE id = ?
            `, [status, id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
}

const getStats = async () => {
    let finalResult = {
        all: 0,
        planned: 0,
        watched: 0,
        onhold: 0
    }

    let countAllPromise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) FROM Movies", [],
                (_, result) => {
                    finalResult.all = result.rows.item(0)["COUNT(*)"];
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    });

    let countPlannedPromise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'Planned'", [],
                (_, result) => {
                    finalResult.planned = result.rows.item(0)["COUNT(*)"];
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    });

    let countWatchedPromise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'Watched'", [],
                (_, result) => {
                    finalResult.watched = result.rows.item(0)["COUNT(*)"];
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    let countDroppedPromise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) FROM Movies WHERE status = 'On-Hold'", [],
                (_, result) => {
                    finalResult.onhold = result.rows.item(0)["COUNT(*)"];
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })

    try {
        await Promise.all([countAllPromise, countPlannedPromise, countWatchedPromise, countDroppedPromise]);
        console.log(finalResult);
        return finalResult;
    }
    catch (error) {
        console.log(error);
    }
}


export { createDatabase, getAllMovies, insertMovie, deleteMovie, updateStatus, insertMovieImport, getStats };
