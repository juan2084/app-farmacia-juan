import * as ExpoSQLite from 'expo-sqlite';

const db = ExpoSQLite.openDatabase('sessions.db');

export const initSQLiteDB = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {            
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);',
                [],
                (_, result) => {
                        resolve(result);
                },
                (_, error) => {
                        reject(error);}
            )
        })
    })
    return promise
}


export const insertSession = ({ email, localId, token }) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
                [localId, email, token],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
  
}


export const getSession = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * from sessions',
                [],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};


export const dropSessionsTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS sessions',
                [],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};


export const truncateSessionsTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM sessions',
                [],
                (tx, result) => {
                    resolve(result);
                },
                (tx, error) => {
                    reject(error);
                }
            );
        });
    });
};