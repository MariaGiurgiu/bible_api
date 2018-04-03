import GetButton from "./GetButton.jsx";
import SaveButton from "./AddButton.jsx";

import VerseRepository from "./verseRepository";

export default class VerseView extends React.Component{
    constructor(props){
        super(props);
        this.verseRepository = new VerseRepository();
    }

    saveVerse = (v) => {
        this.verseRepository.add(v);
    };

    render(){
        if(this.props.verse !== null){
            return(
                <div>
                    <div>
                        <div className="container">
                            <h1 className="display-4">Random verse</h1>
                            <span>{this.props.verse.getText()}</span>
                            <hr className="my-4"/>
                            <div className="lead">
                                <GetButton getVerse={this.props.getVerse.bind(this)}/>
                                <SaveButton saveVerse={this.saveVerse.bind(this, this.props.verse)}/>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return(
                <div className="container">
                    <img src="./img/spinner.gif"/>
                </div>
            )
        }
    }
}
