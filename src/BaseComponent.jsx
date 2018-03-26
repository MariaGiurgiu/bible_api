import React from "react"
import VerseView from "./VerseView.jsx"
import VerseList from "./VerseListView.jsx"
import GetButton from "./GetButton.jsx"
import Verse from "./verse.js"
import AddButton from "./AddButton.jsx"

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
            verses: []
        };
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
        let versesArr = this.state.verses;

        let averse = new Verse(this.state.verse);
        versesArr.push(averse);

        this.setState({verses: versesArr});
    };



    deleteV = (id) => {
        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() != id )
        }));
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
                        <VerseList verses={this.state.verses} deleteV={this.deleteV}/>
                    </div>
                </div>
            </div>
        )
    }
}
