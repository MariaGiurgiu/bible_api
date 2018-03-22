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
            <div>
                <span>
                    {props.verse}
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

                    props.verses.map((item, index) => {
                        return <li className="list-group-item" key={index}>
                            {item.getText()}
                            <b className="float-right">{item.getDateTime()}</b>
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

class AVerse {
    constructor(text, datetime) {
        this.text = text;
        this.datetime = datetime;
    }

    getText() {
        return this.text;
    }

    getDateTime() {
        return this.datetime;
    }

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

                let today = new Date().toString().slice(0, 25);

                let versesArr = self.state.verses;

                let averse = new AVerse(resp.data, today);
                versesArr.push(averse);

                self.setState({verse: resp.data, verses: versesArr});
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
                        <VerseList verses={this.state.verses} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Base />, document.getElementById("content"));
