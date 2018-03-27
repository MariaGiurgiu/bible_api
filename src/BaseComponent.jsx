import React from "react"

import VerseView from "./VerseView.jsx"
import VerseList from "./VerseListView.jsx"
import GetButton from "./GetButton.jsx"
import AddButton from "./AddButton.jsx"

import Verse from "./verse.js"

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
            verses: []
        };
    }

    componentDidMount() {
        this.getVerse();
    }

    getVerse = () => {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                self.setState({verse: resp.data});
            }).catch(function (err) {
                console.log(err)
            }
        );
    };

    addVerse = () => {
        let averse = new Verse(this.state.verse);

        let found = false;
        let versesArr = this.state.verses;
        versesArr.map(function(item, index) {
            if(item.getText() === averse.getText()) {
                found = true;
                alert("Verse already exists")
            }
        });
        if (found === false) {
            versesArr.push(averse);
        }

        this.setState({verses: versesArr});
    };

    deleteV = (id) => {
        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() !== id )
        }));
    };

    likeV = (id) => {
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
        return(
            <div>
                <div>
                    <div className="container">
                    <h1 className="display-4">Random verse</h1>
                    <div className="lead">
                        <VerseView verse={this.state.verse} />
                    </div>
                    <hr className="my-4"/>
                    <div className="lead">
                        <GetButton getVerse={this.getVerse}/>
                        <AddButton  addVerse={this.addVerse}/>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mb-5">
                        <VerseList verses={this.state.verses} deleteV={this.deleteV} likeV={this.likeV}/>
                    </div>
                </div>
            </div>
        )
    }
}
