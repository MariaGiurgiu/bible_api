// TODO rename it to something like CreateButton or RetrieveAVerse button
function Button( props ) {
    return(
        <a className="btn btn-primary btn-lg" href="#" role="button"
           onClick = {
               () => props.addVerse() }>
            Get another
        </a>

    )
}