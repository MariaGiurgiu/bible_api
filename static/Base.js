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

function DeleteButton(props){
    return(
        <button className = "pressMe"
                onClick = {
                    () => props.deleteVerse() }>
            Delete
        </button>
    )
}

function Verse(props) {
    if(props.verse.length !== 0){
        return(
            <div>
                <span>
                    {props.verse} {props.date}
                </span>

            </div>
        )
    } else {
        return(
            <div>
                <img src="spinner.gif" style={{width:80, height:80}}/>
            </div>
        )
    }

}
function VerseList(props) {
    return(
        <div>
            <h2>Previous verses</h2>
            <ul className="list-group">
                {
                    props.verses.forEach((item, index) => {
                    return <li className="list-group-item" key={index}>
                            {item} {props.verses[index]}
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
        let map = new Map();

        this.state = {
            verse: "",
            verses: map,
            date: ""
        };
        this.addVerse = this.addVerse.bind(this)
    }

    addVerse() {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {
                let today = new Date().toString().slice(0, 25);

                let versesArr = self.state.verses;

                versesArr.set(resp.data, today);
                console.log(versesArr);
                self.setState({verse: resp.data, verses: versesArr, date: today});
            }).catch(function (err) {
                console.log(err)
            }
        );
    }

    render() {
        return(
            <div>
                <div>
                    <div className="container">
                    <h1 className="display-4">Random verse</h1>
                    <p className="lead">
                        <Verse verse={this.state.verse} date={this.state.date}/>
                    </p>
                    <hr className="my-4"/>
                    <p className="lead">
                        <Button addVerse={this.addVerse}/>
                    </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mb-5">
                        <VerseList verses={this.state.verses}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Base />, document.getElementById("content"));
