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
            Aici vine lista de versete.
        </div>
    )
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "1234"
        };

        this.addVerse = this.addVerse.bind(this)
    }

    addVerse() {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                self.setState({verse: resp.data})
                // TODO push this verse to the list
            }).catch(function (err) {
                console.log(err)
            }
        );
    }

    render() {
        return[
            <Button addVerse={this.addVerse}/>,
            <Verse verse={this.state.verse}/>,
            <VerseList/>
        ]
    }
}

ReactDOM.render(<Base />, document.getElementById("content"));