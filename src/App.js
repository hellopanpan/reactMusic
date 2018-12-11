import React, { Component } from 'react'
import './assets/jq-player.js'
import logo from './logo.svg'
import './App.less';
import {BrowserRouter,Switch, Route,Router,HashRouter,Link}from 'react-router-dom' ;
import Header from "./Header"
import PlayBody from "./PlayBody"
import List from './list'
import {connect} from "react-redux"
import { MUSIC_LIST } from "./playlistFile"
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data1: "2222",
      bg: true,
    }
  }
  componentDidMount(){
    var that= this;
    $("#player").jPlayer({
      ready() {
        $(this).jPlayer("setMedia",{mp3: that.props.reducer1.file})
      },
      supplied: "mp3",
      wmode:"window",
    });
  }
  changeValue(event){
    this.setState({data1: "3333"})
  }
  Add(){
    this.props.dispatch({
      type: 'ADD',
      payload: 'Learn Redux2'
    });
  }
  changebg(data){
    if(data === "1"){
      this.setState({bg: true})
    }else{
      this.setState({bg: false})
    }
  }




  render() {
    return (
      <div className={'bg'} style={{background:`url(${this.props.reducer1.cover}) 0% 0% / cover no-repeat ` }}>
        <div className={`App ${this.state.bg?'bg1':'bg2'}`}>
          <Header/>
          <Switch>
            <Route exact path='/reactMusic' render={(props)=> {
                return <PlayBody changebg={this.changebg.bind(this)}/>
              }
            }/>
            <Route path='/reactMusic/list' render={(props)=> {
                return <List changebg={this.changebg.bind(this)}/>
              }
            }/>
          </Switch>
        </div>
      </div>
    )
  }

}

export default connect((state,props)=>{
  return state
})(App);
