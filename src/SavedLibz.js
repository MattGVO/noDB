import React, { Component } from 'react';

export default class App extends Component {
    constructor(){
        super();

        this.state= {
            edit: false,
        }
    }

    changeEdit = () => {
        this.state.edit === false ?
          this.setState({
            edit: true,
    
          }) :
          this.setState({
            edit: false
          })
      }

    render() {
        return (
            <div>
                {this.props.savedLibz.map((val, i) => {
                    return <div key={i} >

                        <h2>{this.props.savedLibz[i].title}</h2>

                        {this.state.edit === true ?
                            null
                            : <button onClick={this.changeEdit}>Change Title</button>}

                        {this.state.edit === true ? <form>
                            <input onChange={e => this.props.pendingTitleUpdate(e)}></input>
                            <button
                                onClick={() => this.props.upateTitle(i)}
                            >Submit
                </button>
                        </form>
                            : null}
                        <p>{val.lib}</p>
                        <button onClick={e => this.props.deleteLib(i)}>I'm Over It</button>
                    </div>
                })}
            </div>


        )
    }

}