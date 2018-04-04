import React from "react";

import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import SortButton from "./SortButton.jsx" ;

import VerseRepository from "./verseRepository.js" ;
import Verse from "./verse";

export default class VerseList extends React.Component {
    constructor(props) {
        super(props);
        this.verseRepository = new VerseRepository();
        this.state = {
            verses: []
        };
    }
    sort() {
        this.verseRepository.findAll((result) => {
            result.sort(
                (a, b) => b.getBookname().localeCompare(a.getBookname())
            );
            this.setState({
                verses: result
            })
        })
    }

    remove (id) {
        let callback = (err, id) => {
            if (err) {
                alert("Failed to remove a verse!");
                return
            }
            this.setState({
                verses: this.state.verses.filter(el => el.getId() !== id)
            })
        };

        this.verseRepository.remove(id, callback);
    };

    like (id) {
        let updateVerseInDOMorError = (err, likes) => {
            if (err) {
                alert("Failed to like a verse!");
                return
            }
            this.setState({
                verses: this.state.verses.map(el => {
                    if (el.getId() === id) {
                        return new Verse(el.text, el.id, el.datetime, likes, el.bookname, el.chapter, el.verse)
                    }
                    return el
                })
            })
        };
        this.verseRepository.like(id, updateVerseInDOMorError);
    };

    componentDidMount() {
        this.verseRepository.findAll((result) => {
            this.setState({verses: result})
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Previous verses </h2>
                <div>
                    <SortButton sort={this.sort.bind(this)}/>
                </div>
                <ul className="list-group">
                    {
                        this.state.verses.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div>
                                    {item.getText()}
                                    <b className="float-right">{item.getDateTime()}</b>
                                </div>

                                <div>
                                    <LikeButton likeVerse={this.like.bind(this, item.getId())} />
                                    <DeleteButton deleteVerse={this.remove.bind(this, item.getId())}/>
                                    <b> {item.getLikes()}</b>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
