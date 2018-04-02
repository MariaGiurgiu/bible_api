import React from "react";

import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx" ;

import VerseRepository from "./verseRepository.js" ;
import Verse from "./verse";

export default class VerseList extends React.Component {
    constructor(props) {
        super(props);
        this.verseRepository = new VerseRepository()
        this.state = {
            verses: []
        };
    }

    addVerse = () => {
        let self = this;
        let found = false;

        this.state.verses.map(function(item, index) {
            if (item.getText() === self.props.verse.getText()) {
                found = true;
                alert("Verse already exists")
            }
        });
        if (found === false && this.props.verse !== null) {
            this.verseRepository.add(this.props.verse)
            this.verseRepository.findAll((result) => {
                this.setState({verses: result})
            })
        }
    };

    deleteVerse (id) {
        let callback = (err, id) => {
            if (err) {
                alert("Failed to delete a verse!");
                return
            }
            this.setState({
                verses: this.state.verses.filter(el => el.getId() !== id)
            })
        };

        this.verseRepository.delete(id, callback);
    };

    addLike (id) {
        let updateVerseInDOMorError = (err, likes) => {
            if (err) {
                alert("Failed to like a verse!");
                return
            }
            this.setState({
                verses: this.state.verses.map(el => {
                    if (el.getId() === id) {
                        return new Verse(el.text, el.id, el.datetime, likes)
                    }
                    return el
                })
            })
        };
        this.verseRepository.addLike(id, updateVerseInDOMorError);
    };

    componentDidMount() {
        this.verseRepository.findAll((result) => {
            this.setState({verses: result})
        })
    }

    render() {
        return (
            <div className="container">
                <AddButton addVerse={this.addVerse}/>

                <h2>Previous verses </h2>
                <ul className="list-group">
                    {
                        this.state.verses.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div>
                                    {item.getText()}
                                    <b className="float-right">{item.getDateTime()}</b>
                                </div>

                                <div>
                                    <LikeButton addLike={this.addLike.bind(this, item.getId())} />
                                    <DeleteButton deleteVerse={this.deleteVerse.bind(this, item.getId())}/>
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
