import React from "react"

import {Link, Route} from 'react-router-dom';

import VerseView from "./VerseView.jsx"
import VerseList from "./VerseListView.jsx"

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
                <nav className="navbar navbar-expand-sm bg-light">
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/" style={{marginRight: 50}}>Verse</Link>
                        </li>

                        <li>
                            <Link to="/list">Previous Verses</Link>
                        </li>
                    </ul>
                </nav>

                <Route path='/' render={(props) => (
                    <VerseView {...props} verse={this.state.verse} getVerse={this.getVerse}/>
                )}/>
                <Route path='/list' component={VerseList}/>

            </div>
        )
    }
}
