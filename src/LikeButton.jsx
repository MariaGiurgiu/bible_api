export default function LikeButton( props ) {
    return(
        <button className = "btn btn-primary btn-sm" onClick = {() => props.likeV() }>
            Like
        </button>
    )
}
