import BaseComponent from "./BaseComponent.jsx"

let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
let request = indexedDB.open("MyDatabase", 1);

request.onblocked = function(e) {
    alert("DB open blocked", e);
};

request.onerror = function(err) {
    alert("DB open error", err);
};

request.onupgradeneeded = function(e) {
    alert("DB open upgrade needed");
    let db = request.result;
    let store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
};

request.onsuccess = function(e) {
    console.log("DB open success");

    let db = request.result;

    ReactDOM.render(<BaseComponent />, document.getElementById("content"));
};
