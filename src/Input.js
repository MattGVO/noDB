import React, { Component } from 'react';


class input extends Component{
    constructor() {
        super();

        this.state ={
            blanks: [],
        }
    }

    updateBlanks = (e, i) => {
        var newArray = [...this.state.blanks];
        newArray.splice(i, 1, e.target.value)
        this.setState({
          blanks: newArray
        })
      }

    render() {
        return(
            <form>{this.state.blanks.map((val, i) => {
                return <input type="text" 
                key={i} 
                onChange={(e) => { this.updateBlanks(e, i) }} 
                placeholder={val}>
                </input>
              })}</form>
        ) 
    }
}


