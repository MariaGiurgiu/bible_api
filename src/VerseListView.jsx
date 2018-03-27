import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";

export default class VerseList extends React.Component{
    deleteVerse(id){
        this.props.deleteV(id);
    }

    likeVerse(id) {
        this.props.likeV(id);
    }

    render() {
        return (
            <div>
                <h2>Previous verses</h2>
                <ul className="list-group">
                    {

                        this.props.verses.map((item, index) => {
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
