const React = require("react");
const ReactDOM = require("react-dom");
function Button( props ) {
    return(
        <a className="btn btn-primary btn-lg" href="#" role="button"
                onClick = {
                    () => props.addVerse() }>
            Get another
        </a>
    )
}

function Verse(props) {
    if(props.verse.length !== 0){
        return(
            <span>
                {props.verse}
            </span>
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
            <h2>Previous verses</h2>
            <ul className="list-group">
                {
                    props.verses.map((item, index) => {
                        return <li className="list-group-item" key={index}>{item}{props.date}
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
            verses: [],
            date: []
        };
        this.addVerse = this.addVerse.bind(this)
    }

    addVerse() {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                let versesArr = self.state.verses;
                versesArr.push(resp.data);

                let today = new Date().toString().slice(0, 25);
                let dateArr = self.state.date;
                dateArr.pop();
                dateArr.push(today);

                self.setState({verse: resp.data, verses: versesArr, date: dateArr});
            }).catch(function (err) {
                console.log(err)
            }
        );
    }

    render() {
        return(
            <div>
                <div className="jumbotron">
                    <div className="container">
                    <h1 className="display-4">Random verse</h1>
                    <p className="lead">
                        <Verse verse={this.state.verse} />
                    </p>
                    <hr className="my-4"/>
                    <p className="lead">
                        <Button addVerse={this.addVerse}/>
                    </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mb-5">
                        <VerseList verses={this.state.verses} date={this.state.date}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Base />, document.getElementById("content"));
