export default function CreateButton( props ) {
    return(
        <a className="btn btn-primary btn-lg float-right" href="#" role="button"
           onClick = {
               () => props.addVerse() }>
            Add to list
        </a>
    )
}
