const React = require("react");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verse: "",
            verses: []
        };
        this.addVerse = this.addVerse.bind(this);
        this.deleteV = this.deleteV.bind(this);
    }

    addVerse() {
        let self = this;
        axios.get('http://localhost:3000/data')
            .then(function (resp) {

                let today = new Date().toString().slice(0, 25);

                let versesArr = self.state.verses;

                let averse = new Verse(resp.data, today);
                console.log("in add verse " + averse.getId());
                versesArr.push(averse);

                self.setState({verse: resp.data, verses: versesArr});
            }).catch(function (err) {
                console.log(err)
            }
        );
    }

    deleteV(id){
        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() != id )
        }));
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
                        <VerseList verses={this.state.verses} deleteV={this.deleteV}/>
                    </div>
                </div>
            </div>
        )
    }
}
