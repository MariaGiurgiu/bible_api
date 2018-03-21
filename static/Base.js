const React = require("react");
const ReactDOM = require("react-dom");
function Button( props ) {
    return(
        <button className = "pressMe"
                onClick = {
                    () => props.addVerse() }>
            Get Verse
        </button>
    )
}

function Verse(props) {
    if(props.verse.length !== 0){
        return(
            <div>
                {props.verse}
            </div>
        )
    } else {
        return(
            <img src="img.gif" />
        )
    }

}
function VerseList(props) {
    return(
        <div>
            {props.verses}
        </div>
    )
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
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
