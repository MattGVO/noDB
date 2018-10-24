import React, { Component } from 'react';


function Button(props){
    return(
              <div>
                  <button
                  onClick={() => props.onClickFunction(props.i)}
                  >{props.name}</button>
              </div>
          );
  }
  
  export default Button;
  