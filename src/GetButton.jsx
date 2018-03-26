export default function GetButton( props ) {
    return(
        <a className="btn btn-primary btn-lg" href="#" role="button"
           onClick = {
               () => props.getVerse() }>
            Get another
        </a>

    )
}