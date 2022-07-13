import React, { Component } from "react";

const Item = (props) => {
    return (
        <li>{props.name} {props.price}</li>
    );
};

const Category = (props) => {
    return (
        <>
            <label>{props.name}</label>
            <ul>
                {props.items.map(item => <Item name={item.name} price={item.price} />)}
            </ul>
        </>
    );
};

class List extends Component {
    splitOnCategories = (items) => {
        const output = {};
        items.forEach(item => {
            output[item.category] = output[item.category] ? [...output[item.category], item] : [item];
        });
        return output;
    };
    render() {
        const categories = this.splitOnCategories(this.props.items);
        const categories_names = Object.keys(categories);
        return (
            <ul>
                {categories_names.map(item => <Category name={item} items={categories[item]} />)}
            </ul>
        );
    }
};

class Sidebar extends Component {
    onChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.props.onChange(name, value);
    };
    render() {
        return (
            <div>
                <fieldset>
                    <lable>Поиск</lable>
                    <input name="search" value={this.props.search} onChange={this.onChange} /> <br />
                    <input name="stocked" type="checkbox" checked={this.props.stocked} onChange={this.onChange} />
                    <label>stocked</label>
                </fieldset>
            </div>
        );
    }
};

class FilterableGoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            stocked: false,
        };
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value,
        });
    };
    filterList(items, search, stocked) {
        const pattern = RegExp(search);
        return items.filter(item => 
            pattern.test(item.name) && (stocked ? item.stocked : true)
        );
    }
    render() {
        const goods = [
            {category: 't-short', name: 'Casual', price: '$10', stocked: true},
            {category: 't-short', name: 'Polo', price: '$20', stocked: false},
            {category: 't-short', name: 'Oversize', price: '$12', stocked: true},
            {category: 'shorts', name: 'Casual', price: '$10', stocked: true},
            {category: 'shorts', name: 'Spanch Bob style', price: '$12', stocked: false},
        ];
        const items = this.filterList(goods, this.state.search, this.state.stocked);
        return (
            <div>
                <Sidebar search={this.state.search} stocked={this.state.stocked} onChange={this.handleChange} />
                <List search={this.state.search} stocked={this.state.stocked} items={items} />
            </div>
        );
    }
}

export default FilterableGoodsList;
