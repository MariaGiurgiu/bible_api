export default function VerseView(props) {
    if(props.verse !== null){
        return(
            <div>
                <span>
                    {props.verse.getText()}
                </span>
            </div>
        )
    } else {
        return(
            <div>
                <img src="./img/spinner.gif" style={{width:80, height:80}}/>
            </div>
        )
    }
}
