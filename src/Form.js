import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            pl: 'python',
        };
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };
    handleChangePL = (event) => {
        this.setState({
            pl: event.target.value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.giveName(this.state.value);
        alert('Любимый язык программирования это ' + this.state.pl);
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <label>Любимый язык программирования</label>
                <select value={this.state.pl} onChange={this.handleChangePL}>
                    <option value="python">Python</option>
                    <option value="js">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                </select>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}

export default Form;
