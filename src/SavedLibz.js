import React, { Component } from 'react';

export default class App extends Component {
    constructor(){
        super();

        this.state= {
            edit: false,
            index: 0
        }
    }

    changeEdit = (i) => {
        this.state.edit === false ?
          this.setState({
            edit: true,
            index: i
          }) :
          this.setState({
            edit: false
          })
      }

    render() {
        return (
            <div>
                {this.props.savedLibz.map((val, i) => {
                    return <div>

                        <h2>{this.props.savedLibz[i].title}</h2>

                        {this.state.edit === true && this.state.index === i ?
                            <form>
                            <input onChange={e => this.props.pendingTitleUpdate(e)}
                            key={ i }
                            ></input>
                            <button
                                onClick={() => this.props.upateTitle(i)}
                            >Submit
                            </button>
                        </form>
                            : <button onClick={() => this.changeEdit(i)}>Change Title</button>}

                        <p>{val.lib}</p>
                        <button onClick={e => this.props.deleteLib(i)}>I'm Over It</button>
                    </div>
                })}
            </div>


        )
    }

}