import React from "react"
import VerseView from "./VerseView.jsx"
import VerseList from "./VerseListView.jsx"
import CreateButton from "./CreateButton.jsx"
import Verse from "./verse.js"

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
            verses: []
        };
    }

    addVerse = () => {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {

                let versesArr = self.state.verses;

                let averse = new Verse(resp.data);
                console.log(averse.getId());

                versesArr.push(averse);

                self.setState({verse: resp.data, verses: versesArr});
            }).catch(function (err) {
                console.log(err)
            }
        );
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
                        <CreateButton addVerse={this.addVerse}/>
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
