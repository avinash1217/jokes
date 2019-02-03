import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      response: '',
      inputValue:''
    }
    this.getAllJokes = this.getAllJokes.bind(this)
    this.clearScreen = this.clearScreen.bind(this)
    this.insertJoke = this.insertJoke.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  clearScreen() {
    this.setState({array: [],response: ''})
  }

  getAllJokes() {
    this.clearScreen()
    axios.get('http://localhost:3050/jokes/alljokes')
      .then(response => {this.setState({array: response.data})})
  }

  insertJoke(joke) {
    this.clearScreen()
    if (joke){
      axios.post('http://localhost:3050/jokes?joke='+joke)
      .then(() => {this.setState({response: "Joke successfully inserted!"})})
    } else {
      this.setState({response: "Can't insert empty object!"})
    }
  }


  render() {
    const data =this.state.array;
    const listItems = data.map((d) => <tr><td className="table" key={d._id}>{d.joke}</td></tr>);
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Jokes database handler
          </h1>

          <input value={this.state.inputValue} onChange={this.updateInputValue}/>

          <button className='button' onClick={() => {this.insertJoke(this.state.inputValue)}}>Insert a new joke</button>
          <p>{this.state.response}</p>
          <br/>
          <button className='button' onClick={() => {this.getAllJokes()}}>Get all jokes</button>
          <br/>
          <button className='button' onClick={() => {this.clearScreen()}}>Clear screen</button>
          <table>
            <tbody>{listItems}</tbody>
          </table>
        </header>
        
      </div>
    );
  }
}

export default App;
