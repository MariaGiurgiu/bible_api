import Verse from "./verse.js"

export default class VerseRepository {
    findAll = (f) => {
        let open = indexedDB.open("MyDatabase", 1);

        open.onsuccess = function () {
            // Start a new transaction
            let db = open.result;
            let tx = db.transaction(db.objectStoreNames, "readonly");
            let store = tx.objectStore("MyObjectStore");

            // Add some data
            let getAll = store.getAll();

            getAll.onsuccess = function () {
                let versesArr = [];
                getAll.result.map((item) => {
                    let verse = new Verse(item.text, item.id, item.datetime, item.likes)
                    versesArr.push(verse)
                });
                f(versesArr);
            };

            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    };

    getOneById = (id, f) => {
        let open = indexedDB.open("MyDatabase", 1);

        open.onsuccess = function () {
            // Start a new transaction
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            // Add some data
            let getOneById = store.get(id);

            getOneById.onsuccess = function () {
                let verse = new Verse(getOneById.text, getOneById.id, getOneById.datetime, getOneById.likes);
                f(verse);
            };

            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    };

    add(v) {
        let open = indexedDB.open("MyDatabase", 1);

        open.onsuccess = function () {
            // Start a new transaction
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");
            // Add some data
            store.add(v);

            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    }

    addLike(id) {
        let openIDDBRequest = indexedDB.open("MyDatabase", 1);

        openIDDBRequest.onsuccess = () => {
            let db = openIDDBRequest.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            this.getOneById(id, (verse) => {
                verse.incrementLikes();
                store.put(verse, id);
                tx.oncomplete = function () {
                    db.close();
                };
            });
        }
    }

    delete(id, callback) {
        let openIDDBRequest = indexedDB.open("MyDatabase", 1);

        openIDDBRequest.onsuccess = function () {
            let db = openIDDBRequest.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            store.delete(id);

            tx.oncomplete = function () {
                db.close();
                callback(null, id)
            };
        };

        openIDDBRequest.onerror = function(err) {
            callback(err, null)
        }
    }
}
