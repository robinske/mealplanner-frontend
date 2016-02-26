import React, { Component } from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        meals: []
      }
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.source,
      dataType: 'json',
      cache: false,
      success: function(data) { 
        this.setState(
          {data: {meals: data.meals}}
        ) 
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.source, status, err.toString());
      }
    });
  }

  render() {
    return (
      <ul>
      {
        this.state.data.meals.map(function(meal) {
          return <li key={meal.id}>{meal.note}</li>
        })
      }
      </ul>
    );
  }
}
