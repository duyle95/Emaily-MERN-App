import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortSurvey } from '../actions';

class Sort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortProperty: 'yes',
      sortType: 'asc'
    }

    this.renderSort = this.renderSort.bind(this);
    this.handleChangeSortProperty = this.handleChangeSortProperty.bind(this);
    this.handleChangeSortType = this.handleChangeSortType.bind(this);
  }

  handleChangeSortProperty(event) {
    this.setState({ sortProperty: event.target.value });
  }

  handleChangeSortType(event) {
    this.setState({ sortType: event.target.value });
  }

  renderSort(event) {
    event.preventDefault();
    const { sortProperty, sortType } = this.state;
    this.props.sortSurvey(sortProperty, sortType);
  }

  render() {
    return (
      <div>
        <label>Sort by</label>
        <select className="browser-default" onChange={this.handleChangeSortProperty}  value={this.state.sortProperty}>
          <option value="yes">Number of yes</option>
          <option value="no">Number of no</option>
          <option value="dateSent">Date sent</option>
          <option value="lastResponded">Last responded</option>
        </select>
        <br/>
        <select className="browser-default" onChange={this.handleChangeSortType} value={this.state.sortType}>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.renderSort}>Sort
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

export default connect(null, { sortSurvey })(Sort);
