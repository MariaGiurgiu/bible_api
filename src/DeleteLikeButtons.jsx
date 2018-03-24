// TODO split it in two files, one for each component
const DeleteButton = function DeleteButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm"
                onClick = {
                    () => props.deleteVerse() }>
            Delete
        </button>
    )
}

const LikeButton = function LikeButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm"
                onClick = {
                    () => props.addVerse() }>
            Like
        </button>
    )
}

export {DeleteButton, LikeButton}