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
        console.log('add verse')
        let self = this;
        let found = false;
        console.log(this.state.verses);
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

    deleteV (id){
        console.log('delete')
        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() !== id )
        }));
    };

    likeV (id){
        console.log('like')
        let filter = this.state.verses.filter(v => v.getId() === id);
        let verse = filter[0];
        verse.setLike();

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

            <div>
                <AddButton addVerse={this.addVerse}/>

                <h2>Previous verses </h2>
                <ul className="list-group">
                    {
                        this.state.verses.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div>
                                    {item.getText()}
                                    <b className="float-right">{item.getDateTime()}</b>
                                    <b>{item.getLikes()}</b>
                                </div>

                                <div>
                                    <LikeButton likeV={this.likeV.bind(this, item.getId())}/>
                                    <DeleteButton deleteV={this.deleteV.bind(this, item.getId())}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
