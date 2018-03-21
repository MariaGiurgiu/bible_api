const React = require("react");
const ReactDOM = require("react-dom");

function Button( props ) {
    return(
        <button className = "pressMe"
                onClick = {
                    () => props.addVerse() }>
            Click Me!
        </button>
    )
}

function Verse( props ) {
    return(
        <div>
            {props.verse}
        </div>
    )
}

function VerseList(props) {
    return(
        <div>            
            {props.verses} // TODO implement condition to display a spinner instead if this.state.verse is empty
        </div>
    )
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            verse: "Loading...", // TODO make it an empty string by default
            verses: []
        };
        this.addVerse = this.addVerse.bind(this)
    }

    addVerse() {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                let versesArr = self.state.verses;
                versesArr.push(resp.data);
                self.setState({verse: resp.data, verses: versesArr});
            }).catch(function (err) {
                console.log(err)
            }
        );
    }

    render() {
        return[
            <Button addVerse={this.addVerse}/>,
            <Verse verse={this.state.verse}/>,
            <br/>,
            <VerseList verses={this.state.verses}/>
        ]
    }
}

ReactDOM.render(<Base />, document.getElementById("content"));
