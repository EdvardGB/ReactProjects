import ConfigManagerInstance from './Config';

export default function IndexedDBInstance() {

    if (typeof window.IndexedDBInstance_ !== 'undefined')
        return Promise.resolve(window.IndexedDBInstance_);

    window.IndexedDBInstance_ = new OfflineDatabase();

    return Promise.resolve(window.IndexedDBInstance_);
}

class OfflineDatabase {

    constructor() {

        ConfigManagerInstance().then((configManager) => {

            var config = configManager.config;

            this.db_ = null;
            this.name_ = config.name;
            this.version_ = config.version;
            this.stores_ = config.stores;

        });
    }

    getStore(storeName) {

        if (!this.stores_[storeName])
            throw 'There is no store with name "' + storeName + '"';

        return this.stores_[storeName];
    }

    open() {
        if (this.db_)
            return Promise.resolve(this.db_);

        return new Promise((resolve, reject) => {

            var dbOpen = indexedDB.open(this.name_, this.version_);

            dbOpen.onupgradeneeded = (e) => {

                this.db_ = e.target.result;

                var storeNames = Object.keys(this.stores_);
                var storeName;

                for (var s = 0; s < storeNames.length; s++) {

                    storeName = storeNames[s];

                    // If the store already exists
                    if (this.db_.objectStoreNames.contains(storeName)) {

                        // Check to see if the store should be deleted.
                        // If so delete, and if not skip to the next store.
                        if (this.stores_[storeName].deleteOnUpgrade)
                            this.db_.deleteObjectStore(storeName);
                        else
                            continue;
                    }

                    var dbStore = this.db_.createObjectStore(
                        storeName,
                        this.stores_[storeName].properties
                    );

                    if (typeof this.stores_[storeName].indexes !== 'undefined') {
                        var indexes = this.stores_[storeName].indexes;
                        var indexNames = Object.keys(indexes);
                        var index;

                        for (var i = 0; i < indexNames.length; i++) {
                            index = indexNames[i];
                            dbStore.createIndex(index, index, indexes[index]);
                        }
                    }
                }
            }

            dbOpen.onsuccess = (e) => {
                this.db_ = e.target.result;
                resolve(this.db_);
            }

            dbOpen.onerror = (e) => {
                reject(e);
            };

        });
    }

    close() {

        return new Promise((resolve, reject) => {

            if (!this.db_)
                reject('No database connection');

            this.db_.close();
            resolve(this.db_);

        });
    }

    nuke() {
        return new Promise((resolve, reject) => {

            console.log("Nuking... " + this.name_);

            this.close();

            var dbTransaction = indexedDB.deleteDatabase(this.name_);
            dbTransaction.onsuccess = (e) => {
                console.log("Nuked...");
                resolve(e);
            }

            dbTransaction.onerror = (e) => {
                reject(e);
            }
        });
    }

    put(storeName, value) {

        return this.open().then((db) => {
            return new Promise((resolve, reject) => {

                var dbTransaction = db.transaction(storeName, 'readwrite');
                var dbStore = dbTransaction.objectStore(storeName);
                var dbRequest = dbStore.put(value);

                dbTransaction.oncomplete = (e) => {
                    resolve(dbRequest.result);
                }

                dbTransaction.onabort =
                    dbTransaction.onerror = (e) => {
                        reject(e);
                    }

            });

        });

    } 

    add(storeName, value) {
        
        return this.open().then((db) => {

            return new Promise((resolve, reject) => {

                var dbTransaction = db.transaction(storeName, 'readwrite');
                var dbStore = dbTransaction.objectStore(storeName);
                var dbRequest = dbStore.add(value/*, key*/);

                dbTransaction.oncomplete = (e) => {
                    resolve(dbRequest.result);
                }

                dbTransaction.onabort =
                    dbTransaction.onerror = (e) => {
                        reject(e);
                    }

            });

        });

    }

    get(storeName, value) {

        return this.open().then((db) => {

            return new Promise((resolve, reject) => {

                var dbTransaction = db.transaction(storeName, 'readonly');
                var dbStore = dbTransaction.objectStore(storeName);
                var dbStoreRequest;

                dbTransaction.oncomplete = (e) => {
                    resolve(dbStoreRequest.result);
                }

                dbTransaction.onabort =
                    dbTransaction.onerror = (e) => {
                        reject(e);
                    }

                dbStoreRequest = dbStore.get(value);

            });

        });

    }

    getAll(storeName, index, order) {
        return this.open().then((db) => {

            return new Promise((resolve, reject) => {

                var dbTransaction = db.transaction(storeName, 'readonly');
                var dbStore = dbTransaction.objectStore(storeName);
                var dbCursor;

                if (typeof order !== 'string')
                    order = 'next';

                if (typeof index === 'string')
                    dbCursor = dbStore.index(index).openCursor(null, order);
                else
                    dbCursor = dbStore.openCursor();

                var dbResults = [];

                dbCursor.onsuccess = (e) => {
                    var cursor = e.target.result;

                    if (cursor) {
                        dbResults.push({
                            key: cursor.key,
                            value: cursor.value
                        });
                        cursor.continue();
                    } else {
                        resolve(dbResults);
                    }
                }

                dbCursor.onerror = (e) => {
                    reject(e);
                }

            });

        });
    }

    delete(storeName, key) {
        return this.open().then((db) => {

            return new Promise((resolve, reject) => {
                var dbTransaction = db.transaction(storeName, 'readwrite');
                var dbStore = dbTransaction.objectStore(storeName);

                dbTransaction.oncomplete = (e) => {
                    resolve(e);
                }

                dbTransaction.onabort =
                    dbTransaction.onerror = (e) => {
                        reject(e);
                    }
                if (this.get(storeName, key)){
                    dbStore.delete(key);
                } else {
                    reject({
                        status : 404,
                        message : "NOT FOUND"
                    })
                }
                

            });
        });
    }

    deleteAll(storeName) {

        return this.open().then((db) => {

            return new Promise((resolve, reject) => {

                var dbTransaction = db.transaction(storeName, 'readwrite');
                var dbStore = dbTransaction.objectStore(storeName);
                var dbRequest = dbStore.clear();

                dbRequest.onsuccess = (e) => {
                    resolve(e);
                }

                dbRequest.onerror = (e) => {
                    reject(e);
                }

            });

        });
    }
    
}