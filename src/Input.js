import React from 'react';


function Input(props){
  return(
            <form>
                <input 
                type="text"
                placeholder= {props.placeholder}
                onChange= {props.updateBlanks}
                >
                </input>
            </form>
        );
}

export default Input;

