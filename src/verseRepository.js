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

    update(v) {
        console.log("update")
        let open = indexedDB.open("MyDatabase", 1);
        let self = this;

        open.onsuccess = function () {

            // Start a new transaction
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            self.getOneById(v.id, (result) => {
                let verse = result;
                verse.incrementLikes();
                store.put(verse,verse.id);
            });
            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    }

    delete(id) {
        let open = indexedDB.open("MyDatabase", 1);

        open.onsuccess = function () {
            // Start a new transaction
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            // Delete some data
            store.delete(id);

            // Close the db when the transaction is done
            tx.oncomplete = function () {
                db.close();
            };
        }
    }
}