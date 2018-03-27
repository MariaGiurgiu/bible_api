export default function DeleteButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm" onClick = {() => props.deleteVerse() }>
            Delete
        </button>
    )
}
