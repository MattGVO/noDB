import React from 'react';


function Input(props){
  return(
            <form>
                <input 
                type="text"
                placeholder= {props.placeholder}
                onChange= {e => props.updateBlanks(e, props.key)}
                ></input>
            </form>
        );
}

export default Input;

