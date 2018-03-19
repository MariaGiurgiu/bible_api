let React = require('react');
let v = require('./VerseComponent.js')
let axios = require('axios');
class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {verse: props.verse};
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        console.log("in handleClick");
        // axios
        //     .get('http://localhost:3000/react')
        //     .then(function (response) {
        //
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    render() {
        return (
            React.createElement("div", null,
                React.createElement(v.verse, {verse: this.state.verse}),
                React.createElement("button", {onClick:this.handleClick}, "Get Verse")
        ));

    }
}
module.exports.button = Button;