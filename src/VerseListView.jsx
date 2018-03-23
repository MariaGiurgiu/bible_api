class VerseList extends React.Component{
    constructor(props){
        super(props);



    }

    deleteVerse(id){
        this.props.deleteV(id);
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
                                </div>

                                <div>
                                    <LikeButton/>
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

ReactDOM.render(<Base />, document.getElementById("content"));
