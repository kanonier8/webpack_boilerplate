'use strict';

import Menu from './menu';
// import React from 'react';
// import ReactDOM from 'react-dom';

let simpleMenu = new Menu({
	title: 'Menu title',
	items: [{
		text: 'item 1',
		href: '#anchor_1'
	}, {
		text: 'item 2',
		href: '#anchor_2'
	}, {
		text: 'item 3',
		href: '#anchor_3'
	}]
});

document.body.appendChild(simpleMenu.elem);

let World =  React.createClass({
	getInitialState: function() {
		return {
			toggle: false,
			text: 'hey'
		}
	},
	handleClick: function() {
		this.setState({toggle: !this.state.toggle}, function(event) {
			console.log('set state toggle', this.state.toggle)
		})
	},
	render: function() {
		let stateText = this.state.text;
		return (
			<h1 data-toggle={this.state.toggle} onClick={this.handleClick}>World {this.props.data} </h1>
			)
	}
});

ReactDOM.render(<World data="some text"/>, document.getElementById('world'));

// exports.myAlert = module1;