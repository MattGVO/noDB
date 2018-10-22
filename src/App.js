import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      blanks: [],
      sentences: [],
      hiddenTitle: '',
      title: '',
      lib: '',
      savedLibz:[],
      edit: false,
      pendingTitle: '',
    }
  }

  
  componentDidMount() {
    let promise = axios.get("/api/libz");
    promise.then((res) => {
      console.log("endpoint hit");
      var newArray = res.data
      this.setState({
        savedLibz: newArray
      })
      // console.log(res);
    });
  }


  //This function pulls a random MadLib from the MadLib API and fills out all of the input boxes with blanks. The placeholders for all of the inputs are set to the value of the blanks. This also resets the title and the final MadLib values.
  getLib = () => {
    axios.get('http://madlibz.herokuapp.com/api/random').then((res) => {

      this.setState({
        blanks: res.data.blanks,
        hiddenTitle: res.data.title,
        sentences: res.data.value,
        title: '',
        lib: ''
      })
    })
  }

  //this function actively changes the values of the blanks as the user types into the input box.
  updateBlanks = (e, i) => {
    var newArray = [...this.state.blanks];
    newArray.splice(i, 1, e.target.value)
    this.setState({
      blanks: newArray
    })
  }


//This function joins the blanks and the MadLib together to get the final hillarious lib!
  returnLib = () => {
    var libArray = [];
    var sentence = this.state.sentences;
    var blank = this.state.blanks;

    for (let i = 0; i < sentence.length - 1; i++) {
      libArray.push(sentence[i])
      libArray.push(blank[i])
    }
    this.setState({
      title: [...this.state.hiddenTitle],
      lib: libArray.join(""),
      blanks: []
    })
  }


//This function saves the MadLib to the server and gets it back to be save in the state as savedLibz
  saveLib = () => {
    axios.post(`/api/libz`,{title: this.state.title.join(""), lib: this.state.lib})
      .then((res) => {
        let newArray = res.data
        console.log(newArray);
        this.setState({
          savedLibz: newArray,
          title: '',
          lib: ''
        })
        
    });

  }

  changeEdit = () =>{
    this.state.edit === false?
    this.setState({
      edit: true,
      
    }) :
    this.setState({
      edit:false
    })
  }


  pendingTitleUpdate = (e) =>{
    var input = e.target.value
    console.log(this.state.pendingTitle);
    this.setState({
      pendingTitle: input
    })
  }

  updateTitle = (e,id) => {
    axios.put(`/api/libz/${id}`).then((res)=>)
    
    }
  }

  deleteLib = (id) => {
    axios.delete(`/api/libz/${id}`).then((res) =>{
      this.setState({
        savedLibz: res.data
      })
    })
  }

  render() {
    // ▼▼▼▼▼▼ logs go here ▼▼▼▼▼▼
    // console.log("lib =", this.state.lib);
    // ▲▲▲▲▲▲ logs go here ▲▲▲▲▲▲
    return (
      <div className="App">


        <h1>Matt Libz</h1>

        {/* This button gets the input boxes for the MadLib's blanks */}
        {this.state.blanks == '' ? 
        <button onClick={this.getLib}>Get A Lib</button> 
        : <p></p>
        }
        

        {/* This maps all of the input boxes of the MadLib's blanks */}
        <form>{this.state.blanks.map((val, i) => {
          return <input type="text" 
          key={i} 
          onChange={(e) => { this.updateBlanks(e, i) }} 
          placeholder={val}>
          </input>
        })}</form>

        {/* <form>{this.state.blanks.map((val, i) => {
          return <div>
            <input type="text" key={i}  placeholder={val}></input>
            </div>
        })}</form> */}



        {/* This button returns the blanks and the madlib together */}
        {this.state.blanks == '' ? null
         : <button 
         onClick={this.returnLib}>
         Let's Get Libby Wid It!
         </button>
        }
        

        <div>

          {/* MadLib Title */}
          <h2>{this.state.title !== '' ?
           this.state.title :
            null}
            </h2>

          {/* Madlib content */}
          <p>{this.state.lib}</p>



          {this.state.lib !== '' ? 
          <button 
          onClick={()=> this.saveLib()}>
          That was Hilarious!
          </button> :
           null
          }

        
        </div>

        {this.state.savedLibz ==''? <p></p>: <h1>Saved</h1>}

        <div>
          {this.state.savedLibz.map((val, i) => {
            return <div> 
              
              <h2>{this.state.savedLibz[i].title}</h2>

              {this.state.edit === true? 
                null
                :<button onClick={this.changeEdit}>Change Title</button> }

              {this.state.edit === true? <form>
                <input onChange={e=>this.pendingTitleUpdate(e)}></input>
                <button >Submit</button> 
                </form>
              : null}
              <p>{val.lib}</p>
              <button onClick={e=> this.deleteLib(i)}>I'm Over It</button>
              </div>
          })}
        </div>


      </div>
    );
  }
}

export default App;