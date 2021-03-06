import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Input from './Input';
import SavedLibz from './SavedLibz';
import Button from './Button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      blanks: [],
      sentences: [],
      hiddenTitle: '',
      title: '',
      lib: '',
      savedLibz: [],
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
      console.log(res);
    });
  }

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

  updateBlanks = (e, i) => {
    var newArray = [...this.state.blanks];
    newArray.splice(i, 1, e.target.value)
    console.log(i);
    
    this.setState({
      blanks: newArray
    })
  }

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

  saveLib = () => {
    axios.post(`/api/libz`, { title: this.state.title.join(""), lib: this.state.lib })
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



  pendingTitleUpdate = (e) => {
    var input = e.target.value
    console.log(this.state.pendingTitle);
    this.setState({
      pendingTitle: input
    })
  }

  updateTitle = (id) => {
    axios.put(`/api/libz/${id}`, { title: this.state.pendingTitle }).then((res) => {
      this.setState({
        savedLibz: res.data
      })
    })

  }


  deleteLib = (id) => {
    axios.delete(`/api/libz/${id}`).then((res) => {
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


        <h1>MATTLibz</h1>

        {this.state.blanks == '' ?
          <Button 
          name ="Get A Lib"
          onClickFunction ={this.getLib}
          />
          : <Button 
          name ="Get A New Lib"
          onClickFunction ={this.getLib}
          />
        }


        <br></br>

        {this.state.blanks.map((val, i) => {
          return <div>
            <Input
              index={i}
              placeholder={val}
              updateBlanks={this.updateBlanks}
            />
          </div>
        })}

        <br></br>

        {this.state.blanks == '' ? null
          : <Button
            name= "Let's Get Libby Wid It!"
            onClickFunction={this.returnLib}
         />
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
            <Button
            name= "That was Hilarious!"
            onClickFunction={this.saveLib}
         /> :
            null
          }


        </div>

        {this.state.savedLibz == '' ? <p></p> : <h1>Saved</h1>}

        <div>

          <SavedLibz
            savedLibz={this.state.savedLibz}
            pendingTitleUpdate={this.pendingTitleUpdate}
            upateTitle={this.updateTitle}
            deleteLib={this.deleteLib}
          />
        </div>



      </div>
    );
  }
}

export default App;