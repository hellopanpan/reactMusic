import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.less';
import {connect} from "react-redux";
import {BrowserRouter, Route,Router,HashRouter,Link}from 'react-router-dom' ;
class Header extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div >
        <header className="App-header" onClick={this.comBack.bind(this)}>
          <div className={'div1'}>
          <img src={require('./static/img/logo.png')} />
          <h1 className="App-title">React Music Player</h1>
          </div>
          <div className={'listdiv'}>
            <Link to="/list" onClick={(e)=>{this.stopLink(e)}}>
              <i className={'iconlist'}></i>
            </Link>
          </div>
        </header>
      </div>
    );
  }
  comBack(){
    if(location.href.match(/\/list/)){
      window.history.back();
    }
  }
  stopLink(e){
    e.stopPropagation();
    if(location.href.match(/\/list/)){
      window.history.back();
    }

  }

}

export default connect ((state,props)=>{return state})(Header);
