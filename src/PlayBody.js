import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.less';
import {connect} from "react-redux"
import {BrowserRouter, Route,Router,HashRouter,Link}from 'react-router-dom' ;
class PlayBody extends Component {
  constructor(props){
    super(props);
    this.state={
      progress: '',
      percent: "",
      duration: "",
      voice: "",
      playstate: true,
      flag: false
    }
  }
  render() {
    return (
      <div className="App-body">
        <div className="play">
          <div className="playleft">
            <Link to="list" style={{color:"#31c27c", fontSize:"16px",textDecoration: "none",cursor:"pointer"}} >我的私人音乐</Link>
            <h2 >{this.props.reducer1.title}</h2>
            <p className="sub">{this.props.reducer1.artist}</p>
            <div className="voice">
              <div className="icon-div" >
               <i className="icon-volume"></i>
              </div>
              <div className="progress" ref='voicebar' onClick={this.changeVoice.bind(this)}>
                <div className="item1" style={{width:`${this.state.voice}%`}}>
                </div>
              </div>
            </div>
            <div className="playbtn">
              <div className="playProgress" ref="progressbar" onClick={this.progressChange.bind(this)}>
                <div className="playItem" style={{width:`${this.state.percent}%`}} >
                </div>
              </div>
              <div className="time">
              </div>
              <div className="icon-all">
                <div className="icondiv">
                  <i className='icon pre'onClick={this.playPre.bind(this)}>
                  </i>
                  <i className={`icon ${this.state.playstate? 'playicon': 'pause'}`} onClick={this.pauseChange.bind(this)}>
                  </i>
                  <i className={'icon next'} onClick={this.playNext.bind(this)}>
                  </i>
                </div>
                <div className="icon-right">
                  <i className="icon repeat-cycle"onClick={this.playCircle.bind(this)}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="playright">
            <div className={`play-pic`}>
              <img src={`${this.props.reducer1.cover}`} className={`${this.state.playstate? "": "pause"}`}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  playCircle(){
    if(this.props.reducer2){
      this.props.dispatch({
        type: 'NOCIRCLE',
      });
    }else{
      this.props.dispatch({
        type: 'CIRCLE',
      });
    }
  }
  playPre(){
    this.props.dispatch({
      type: 'PRE',
      payload: 'Learn Redux'
    });
    this.playItem.bind(this)();
  }
  playItem(){
    var that= this;
    setTimeout(function () {
      $("#player").jPlayer("setMedia",{mp3: that.props.reducer1.file}).jPlayer("play");
    },200)
  }
  playNext(){
    this.props.dispatch({
      type: 'NEXT',
      payload: 'Learn Redux'
    });
    this.playItem.bind(this)();
  }
  componentWillMount(){
    var that= this;
    this.props.changebg("1");

  /*  $("#player").jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia",{mp3:"http://www.170mv.com/kw/other.web.ri01.sycdn.kuwo.cn/resource/n1/96/84/1523189814.mp3"}).jPlayer("play")
      },
      supplied: "mp3",
      wmode:"window",
    });*/
    //alert();

    $("#player").bind($.jPlayer.event.timeupdate,(e)=>{
      this.setState({
        progress: Math.round(e.jPlayer.status.currentTime),
        percent: e.jPlayer.status.currentPercentAbsolute,
        duration : e.jPlayer.status.duration,
        voice: e.jPlayer.options.volume * 100
      });
      if(this.state.percent == 100){
        if(this.props.reducer2){
          var that= this;
          setTimeout(function () {
            $("#player").jPlayer("setMedia",{mp3: that.props.reducer1.file}).jPlayer("play");
          },200)
        }else{
          var that= this;
          setTimeout(function () {
            that.playNext.bind(that)();
          },200)
        }

      }

    })
  }
  componentWillUnmount() {
    alert("componentWillUnmount");
  }

  progressChange(e){
    let progressbar = this.refs.progressbar;
    let progress = (e.clientX - progressbar.getBoundingClientRect().left) / progressbar.getBoundingClientRect().width;
    console.log(progress);
    $("#player").jPlayer("play",this.state.duration * progress)
  }
  changeVoice(e){
    let voicebar = this.refs.voicebar;
    let progress = (e.clientX - voicebar.getBoundingClientRect().left)/ voicebar.getBoundingClientRect().width;
    $("#player").jPlayer("volume",progress);
  }
  pauseChange(e){
    if(this.state.playstate){
      $("#player").jPlayer("pause");
    }else{
      $("#player").jPlayer("play");
    }
    this.setState({
      playstate: !this.state.playstate
    })
  }
  componentWillUnmount(){
    $("#player").unbind($.jPlayer.event.timeupdate);
  }
}

export default connect ((state,props)=>{return state})(PlayBody);
