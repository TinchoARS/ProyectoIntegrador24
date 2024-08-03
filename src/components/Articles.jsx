import React, { Component } from 'react'
import Comments from './Comments';

function Articles() {
  return (
    <div>
      <h1>Artículos</h1>
    </div>
  );
}

export default class Articles extends Component {
  render() {
    return (
      <div>      <Comments /></div>
      
    )
  }
}
