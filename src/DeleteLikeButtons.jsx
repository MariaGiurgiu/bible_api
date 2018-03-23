// TODO split it in two files, one for each component
function DeleteButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm"
                onClick = {
                    () => props.deleteVerse() }>
            Delete
        </button>
    )
}

function LikeButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm"
                onClick = {
                    () => props.addVerse() }>
            Like
        </button>
    )
}