import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Breanne', age: 30 },
      { id: '2', name: 'Olivia', age: 25 },
    ],
    otherState: 'some other value',
    showPersons: true
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  }

  deletePersonHandler = (personIndex) => {
    // get array by value to maintain immutable state
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px'
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div >
          {
            this.state.persons.map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            })
          }
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = [];

    if (this.state.persons.length <= 1) {
      classes.push('red');
    } else {
      classes.push('bold');
    }


    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes}>This is really working!</p>
          <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
  }
}

export default App;
