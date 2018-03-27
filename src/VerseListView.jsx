import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";

export default class VerseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verses: []
        };
    }

    deleteVerse(id){
        this.props.deleteV(id);
    }

    likeVerse(id) {
        this.props.likeV(id);
    }

    componentWillReceiveProps() {
        let found = false;
        let versesArr = this.state.verses;
        versesArr.map(function(item, index) {
            if(item.getText() === this.props.verse.getText()) {
                found = true;
                alert("Verse already exists")
            }
        });
        if (found === false && this.props.verse !== null) {
            versesArr.push(this.props.verse);
            this.setState({verses: versesArr})
        }
    }

    render() {
        return (
            <div>
                <h2>Previous verses</h2>
                <ul className="list-group">
                    {
                        this.state.verses.map((item, index) => {
                            return <li className="list-group-item" key={index}>
                                <div>
                                    {item.getText()}
                                    <b className="float-right">{item.getDateTime()}</b>
                                    <b>{item.getLikes()}</b>
                                </div>

                                <div>
                                    <LikeButton likeVerse={this.likeVerse.bind(this, item.getId())}/>
                                    <DeleteButton deleteVerse={this.deleteVerse.bind(this, item.getId())}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
