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

    getOneById = (id, incrementLikesAndPutVerseToDb) => {
        let open = indexedDB.open("MyDatabase", 1);

        open.onsuccess = function () {
            // Start a new transaction
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            // Add some data
            let getOneById = store.get(id);

            getOneById.onsuccess = function () {
                let result = getOneById.result
                let verse = new Verse(result.text, result.id, result.datetime, result.likes);
                incrementLikesAndPutVerseToDb(store, verse);
            };

            // Close the db when the transaction is done
            // tx.oncomplete = function () {
            //     db.close();
            // };
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

    like(id, updateVerseInDOMorError) {
        let incrementLikesAndPutVerseToDb = (store, verse) => {
            verse.incrementLikes();
            let putRequest = store.put(verse);

            putRequest.onsuccess = () => {
                updateVerseInDOMorError(null, verse.getLikes())
            }

            putRequest.onerror = (err) => {
                updateVerseInDOMorError(err, null)
            }
        }

        this.getOneById(id, incrementLikesAndPutVerseToDb);
    }

    remove(id, callback) {
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
