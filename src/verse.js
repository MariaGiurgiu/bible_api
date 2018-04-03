export default class Verse {
    constructor(text, id, datetime, likes, bookname, chapter, verse) {
        this.bookname = bookname;
        this.chapter = chapter;
        this.verse = verse;
        this.id = (typeof id === "undefined" ? this.uuidv4() : id);
        this.text = text;
        this.datetime = (typeof datetime === "undefined" ? new Date(Date.now()).toLocaleString() : datetime);
        this.likes = (typeof likes === "undefined" ? 0: likes);
    }
    getText () {
        return this.bookname + ' ' + this.chapter + ': ' + this.verse + ' ' + this.text
    }

    getDateTime() {
        return this.datetime;
    }
    getId() {
        return this.id;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    getLikes() {
        return this.likes;
    }
    incrementLikes() {
        this.likes++;
    }
}
