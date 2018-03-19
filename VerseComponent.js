let React = require('react');
class Verse extends React.Component {
    constructor(props){
        super(props);
        this.state = {verse: props.verse};

    }
    render() {
        return (
            React.createElement("p", null, this.state.verse)
        );
    }
}
module.exports.verse = Verse;