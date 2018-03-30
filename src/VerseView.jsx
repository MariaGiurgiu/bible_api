import GetButton from "./GetButton.jsx";
export default class VerseView extends React.Component{
    constructor(props){
        super(props);
    }
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
                                <GetButton getVerse={this.getVerse}/>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return(
                <div>
                    <img src="./img/spinner.gif" style={{width:80, height:80}}/>
                </div>
            )
        }
    }


}
