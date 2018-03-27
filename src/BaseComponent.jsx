import React from "react"

import VerseView from "./VerseView.jsx"
import VerseList from "./VerseListView.jsx"
import GetButton from "./GetButton.jsx"

import Verse from "./verse.js"

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: null
        };
    }

    componentDidMount() {
        this.getVerse();
    }

    getVerse = () => {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                let v = new Verse(resp.data);
                self.setState({verse: v});
            }).catch(function (err) {
                console.log(err)
            }
        );
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
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mb-5">
                        <VerseList verse={this.state.verse}/>
                    </div>
                </div>
            </div>
        )
    }
}
