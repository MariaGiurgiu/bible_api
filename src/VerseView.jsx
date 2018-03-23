function VerseView(props) {
    if(props.verse.length !== 0){
        return(
            <div>
                <span>
                    {props.verse}
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