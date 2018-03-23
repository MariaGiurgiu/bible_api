class Verse {
    constructor(text, datetime) {
        this.id = Math.floor((Math.random() * 100) + 1);
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