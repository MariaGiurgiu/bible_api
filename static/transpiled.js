const React = require("react");

class AVerse {
    constructor(text, datetime) {
        this.id = Math.floor(Math.random() * 100 + 1);
        this.text = text;
        this.datetime = datetime;
    }

    getText() {
        return this.text;
    }

    getDateTime() {
        return this.datetime;
    }
    getId() {
        return this.id;
    }

}

class Base extends React.Component {
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
        axios.get('http://localhost:3000/data').then(function (resp) {

            let today = new Date().toString().slice(0, 25);

            let versesArr = self.state.verses;

            let averse = new AVerse(resp.data, today);
            console.log("in add verse " + averse.getId());
            versesArr.push(averse);

            self.setState({ verse: resp.data, verses: versesArr });
        }).catch(function (err) {
            console.log(err);
        });
    }

    deleteV(id) {
        // console.log("in deleteV " + id);
        // let versesArr = this.state.verses;
        // let newArr = [];
        // for(var i = 0; i < versesArr.length; i++ ){
        //     if(versesArr[i].getId() != id){
        //         newArr.push(versesArr[i])
        //     }
        // }
        // this.setState({verses: newArr});

        this.setState(prevState => ({
            verses: prevState.verses.filter(el => el.getId() != id)
        }));
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "h1",
                        { className: "display-4" },
                        "Random verse"
                    ),
                    React.createElement(
                        "p",
                        { className: "lead" },
                        React.createElement(Verse, { verse: this.state.verse })
                    ),
                    React.createElement("hr", { className: "my-4" }),
                    React.createElement(
                        "p",
                        { className: "lead" },
                        React.createElement(Button, { addVerse: this.addVerse })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row mb-5" },
                    React.createElement(VerseList, { verses: this.state.verses, deleteV: this.deleteV })
                )
            )
        );
    }
}
function Button(props) {
    return React.createElement(
        "a",
        { className: "btn btn-primary btn-lg", href: "#", role: "button",
            onClick: () => props.addVerse() },
        "Get another"
    );
}
function DeleteButton(props) {
    return React.createElement(
        "button",
        { className: "btn btn-primary btn-sm",
            onClick: () => props.deleteVerse() },
        "Delete"
    );
}

function LikeButton(props) {
    return React.createElement(
        "button",
        { className: "btn btn-primary btn-sm",
            onClick: () => props.addVerse() },
        "Like"
    );
}
function Verse(props) {
    if (props.verse.length !== 0) {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "span",
                null,
                props.verse
            )
        );
    } else {
        return React.createElement(
            "div",
            null,
            React.createElement("img", { src: "spinner.gif", style: { width: 80, height: 80 } })
        );
    }
}
class VerseList extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteVerse(id) {
        this.props.deleteV(id);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Previous verses"
            ),
            React.createElement(
                "ul",
                { className: "list-group" },
                this.props.verses.map((item, index) => {
                    return React.createElement(
                        "li",
                        { className: "list-group-item", key: index },
                        React.createElement(
                            "div",
                            null,
                            item.getText(),
                            React.createElement(
                                "b",
                                { className: "float-right" },
                                item.getDateTime()
                            )
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(LikeButton, null),
                            React.createElement(DeleteButton, { deleteVerse: this.deleteVerse.bind(this, item.getId()) })
                        )
                    );
                })
            )
        );
    }
}

ReactDOM.render(React.createElement(Base, null), document.getElementById("content"));

