import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state={
    pizzas: [],
    editPizza: {
      topping: "",
      size: "Small",
      vegetarian: null
    },
    editClicked: false
  }

  render() {
    return (
      <Fragment>
        <Header/>
        {
          this.state.editClicked ?
          <PizzaForm editPizza={this.state.editPizza} handlePizzaChange={this.handlePizzaChange} editSubmit={this.editSubmit} /> :
          null
        }
        <PizzaList pizzas={this.state.pizzas} editButton={this.editButton} />
      </Fragment>
    );
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(r=>r.json())
    .then(pizzas => this.setState({ pizzas }))
  }

  editButton = (id)=>{
    let editPizza = this.state.pizzas.find((pizza)=> pizza.id === id)
    this.setState({ editPizza })
    this.setState({ editClicked:true })
  }


  handlePizzaChange = (property, value)=>{
    this.setState({ editPizza: {...this.state.editPizza, [property]: value} })
  }

  editSubmit = () => {
    if(!this.state.editPizza.id){
      console.log("Pick a pizza to edit first")
    }else{
      fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`,{
        method:'PATCH',
        headers:{ 'Content-Type':'application/json'},
        body: JSON.stringify(this.state.editPizza)
      })
      .then(r=>r.json())
      .then(newPizza=>{
        this.setState({
          pizzas: this.state.pizzas.map((pizza)=> pizza.id===newPizza.id ? newPizza : pizza),
          editClicked: false
        })
      })
    }
  }

  editformvaluesthing = (topping,size,vegetarian) => { console.log("blah")}

}

export default App;
