import React, { Component } from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: 'World'};
  }

  componentDidMount() {
    $.ajax({
      url: this.props.source,
      dataType: 'json',
      cache: false,
      success: function(data) { this.setState({data: data.shopping_list[0].amount}) }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.source, status, err.toString());
      }
    });
  }

  render() {
    return (
      <h1>Hello, {this.state.data}</h1>
    );
  }
}
