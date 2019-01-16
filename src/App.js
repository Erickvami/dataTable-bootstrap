import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableData from './Table.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state={values:props.values};
        this.renderArray= this.renderArray.bind(this);
    }
    renderArray(){
    return this.state.values.map((item,i)=>{
           return <li key={i}>{item}</li> 
        });
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} style={{height:'50px'}} className="App-logo" alt="logo" />
        <ul>
        <TableData name='messages'></TableData>
        </ul>
        </header>
      </div>
    );
  }
}

export default App;
//{this.renderArray()}