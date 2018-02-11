import React, { Component } from 'react';
import {BrowserRouter, Route,Router,HashRouter,Link}from 'react-router-dom' ;
import {connect} from "react-redux"
import { MUSIC_LIST } from "./playlistFile"
class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      musiclist:[],
    }
  }
  render() {
    return (
      <div className="applist">
        <ul >
          {
              this.state.musiclist.map( (item)=>{
                return<li key={item.id } onClick={()=>{this.playMusic.call(this,item)}}>
                  <p className={`${this.props.reducer1.id == item.id ? "active": ""}`}><span style={{fontSize:"14px",fontWeight: "bold"}} className={`text1${this.props.reducer1.id == item.id ? "active": ""}`}>{item.title}</span><span className={'text2'}>  - {item.artist}</span></p>
                  <i className={"icon-close"} onClick={(e)=>{this.closeMusic.call(this,e,item)}}></i>
                </li>
              })
          }
        </ul>
      </div>
    )
  }
  playItem(){
    var that= this;
    setTimeout(function () {
      $("#player").jPlayer("setMedia",{mp3: that.props.reducer1.file}).jPlayer("play");
    },200)
  }
  playMusic(item){
    this.props.dispatch({
      type: 'Listen',
      playload: item.id
    });
    this.playItem.bind(this)();
  }
  closeMusic(e,item){
    e.stopPropagation();
    var arrList = this.state.musiclist;
    arrList = arrList.filter((item2)=>{
      return item2.id != item.id;
    });
    this.setState({
      musiclist: arrList
    })
  }
  componentWillReceiveProps(props){
    console.log(props)
  }

  componentDidMount(){
    this.props.changebg("2");
    this.setState({musiclist: MUSIC_LIST})
  }

}

export default connect((state,props)=>{
  return state
})(List);
