class Verse {
    constructor(text, datetime) {
        this.id = Math.floor((Math.random() * 100) + 1); // TODO Remove collision risk! See https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        this.text = text;
        this.datetime = datetime;
    }

    getText() {
        return this.text;
    }

    getDateTime() {
        return this.datetime;
    }
    getId() {
        return this.id;
    }
}