export default class SortButton extends React.Component {
    render() {
        return(
            <button className = "btn btn-primary btn-sm" onClick = {() => this.props.sort() }>
                Sort By Bookname
            </button>
        )
    }
}