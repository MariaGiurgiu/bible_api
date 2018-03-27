export default function CreateButton( props ) {
    return(
        <a className="btn btn-primary btn-lg" href="#" role="button" onClick = {() => props.addVerse() }>
            Add to list
        </a>
    )
}
