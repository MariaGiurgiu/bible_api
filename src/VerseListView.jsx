import React from "react";

import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import AddButton from "./AddButton.jsx" ;

export default class VerseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verses: []
        };
    }

    addVerse = () => {
        let self = this;
        let found = false;
        let versesArr = this.state.verses;
        versesArr.map(function(item, index) {
            if(item.getText() === self.props.verse.getText()) {
                found = true;
                alert("Verse already exists")
            }
        });
        if (found === false && this.props.verse !== null) {
            versesArr.push(this.props.verse);
            this.setState({verses: versesArr})
        }
    };

    deleteVerse (id){
        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() !== id )
        }));
    };

    likeVerse (id){
        let filter = this.state.verses.filter(v => v.getId() === id);
        let verse = filter[0];
        verse.incrementLikes();

        let verses = this.state.verses;
        for(let i = 0; i < verses.length; i++ ){
            if(verses[i].getId() === verse.getId()) {
                verses[i] = verse;
            }
        }
        this.setState({ verses: verses});
    };

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
                                    <LikeButton likeVerse={this.likeVerse.bind(this, item.getId())}/>
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
