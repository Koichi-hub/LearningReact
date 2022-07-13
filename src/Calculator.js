import React, { Component } from "react";

class BoilingVerdict extends Component {
    boilCondition = (temperature) => {
        let input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return false;
        }
        let rounded = Math.round(input);
        return rounded >= 100;
    };
    render() {
        return (
            <>
                {this.boilCondition(this.props.temperature)
                ? <h1>Чайник запикит</h1>
                : <h1>Чайник не закипит</h1>
                }
            </>
        );
    }
};

class TemperatureInput extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    };
    render() {
        return (
            <>
                <input value={this.props.temperature} onChange={this.handleChange} />
            </>
        );
    }
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: '',
            temperature: '',
        };
    }
    handleCelsiusChange = (temperature) => {
        this.setState({
            scale: 'c',
            temperature,
        });
    };
    handleFahrenheitChange = (temperature) => {
        this.setState({
            scale: 'f',
            temperature,
        });
    };
    toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;
    toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;
    tryConvert = (temperature, convert) => {
        let input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        let output = convert(input);
        let rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    };
    render() {
        let temperature = this.state.temperature;
        let scale = this.state.scale;
        let celsius = scale === 'c' ? temperature : this.tryConvert(temperature, this.toCelsius);
        let fahrenheit = scale === 'f' ? temperature : this.tryConvert(temperature, this.toFahrenheit); 
        return (
            <div>
                <label>celsius</label>
                <TemperatureInput temperature={celsius} onChange={this.handleCelsiusChange} />
                <label>fahrenheit</label>
                <TemperatureInput temperature={fahrenheit} onChange={this.handleFahrenheitChange} />
                <BoilingVerdict temperature={celsius} />
            </div>
        );
    }
}

export default Calculator;
