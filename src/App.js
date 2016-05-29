import React, { Component } from 'react';

const FIXTURE_DATA = {
  meals: [
    { id: '123', note: 'hello world', image: 'https://placekitten.com/g/200/300' },
    { id: '456', note: 'hello world, again', image: 'https://placekitten.com/g/200/301' },
    { id: '789', note: 'hello world, really!', image: 'https://placekitten.com/g/201/300' }
  ]
};

const KEY_ENTER = 13;

const fetchData = (dataSource, onSuccess) => {

  // uncomment to short-circuit *actual* server request
  // return onSuccess(FIXTURE_DATA);

  $.ajax({
    url: dataSource,
    dataType: 'json',
    cache: false,
    success: onSuccess,
    error: function (xhr, status, err) {
      console.error(dataSource, status, err.toString());
    }
  });
}

class DataSourceForm extends Component {

  // callback bound to class context by `=>`
  onSubmit = (evt) => {
    if (evt.which === KEY_ENTER) {
      evt.preventDefault();
      this.props.onChange(evt.target.value);
    }
  }

  render () {
    return <form>
      <fieldset title="Data source">
        <label htmlFor="id-source">Data source</label>
        <input type="text" onKeyPress={this.onSubmit} name="source" id="id-source" defaultValue={this.props.source} placeholder="Enter an awesome data source" />
      </fieldset>
    </form>;
  }
}

DataSourceForm.PropTypes = {
  source: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

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
    const dataSource = this.props.source;
    fetchData(dataSource, (data) => {
      console.log('Fetched data source!', dataSource);
      this.setState({ data })
    });
  }

  renderMeal (meal) {
    return <li key={meal.id}>
      {meal.note}
      <img src={meal.image} />
    </li>
  }

  onChange = (dataSource) => {
    fetchData(dataSource, (data) => {
      console.log('Fetched data source!', dataSource);
      this.setState({ data })
    });
  }

  render() {
    return <div>
      <DataSourceForm source={this.props.source} onChange={this.onChange} />
      <ul>{this.state.data.meals.map(this.renderMeal)}</ul>
    </div>;
  }
}
