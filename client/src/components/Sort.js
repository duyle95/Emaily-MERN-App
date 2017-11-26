import React, { Component } from 'react';

class Sort extends Component {
  render() {
    return (
      <div>
        <label>Sort by</label>
        <select class="browser-default">
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Number of yes</option>
          <option value="2">Number of no</option>
          <option value="3">Date sent</option>
          <option value="4">Last responded</option>
        </select>
        <br/>
        <select class="browser-default">
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Ascending</option>
          <option value="2">Descending</option>
        </select>
      </div>
    );
  }
}

export default Sort;
