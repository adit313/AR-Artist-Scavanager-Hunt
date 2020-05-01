'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroImage,
  ViroQuad,
  ViroAnimations
} from 'react-viro';

const countdown = [
  require('./res/0.png'),
  require('./res/1.png'),
  require('./res/2.png'),
  require('./res/3.png'),
  require('./res/4.png'),
  require('./res/5.png'),
  require('./res/6.png'),
  require('./res/7.png'),
  require('./res/8.png'),
  require('./res/9.png'),
  require('./res/10.png'),
  require('./res/11.png'),
  require('./res/12.png'),
  require('./res/13.png'),
  require('./res/14.png'),
  require('./res/15.png'),
  require('./res/16.png'),
  require('./res/17.png'),
  require('./res/18.png'),
  require('./res/19.png'),
  require('./res/20.png'),
  require('./res/21.png'),
  require('./res/22.png'),
  require('./res/23.png'),
  require('./res/24.png'),
  require('./res/25.png'),
  require('./res/26.png'),
  require('./res/27.png'),
  require('./res/28.png'),
  require('./res/29.png'),
  require('./res/30.png')
]

const letters = [
  require('./res/a.png'),
  require('./res/b.png'),
  require('./res/c.png'),
  require('./res/d.png'),
  require('./res/e.png'),
  require('./res/f.png'),
  require('./res/g.png'),
  require('./res/h.png'),
  require('./res/i.png'),
  require('./res/j.png'),
  require('./res/k.png'),
  require('./res/l.png'),
  require('./res/m.png'),
  require('./res/n.png'),
  require('./res/o.png'),
  require('./res/p.png'),
  require('./res/q.png'),
  require('./res/r.png'),
  require('./res/s.png'),
  require('./res/t.png'),
  require('./res/u.png'),
  require('./res/v.png'),
  require('./res/w.png'),
  require('./res/x.png'),
  require('./res/y.png'),
  require('./res/z.png'),
]

const letterChar = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

let numArray=[]

for (var i=0;i<101;++i) numArray.push([(Math.random()-0.5)*5, (Math.random())*2.5, (Math.random()*-5)]);

let winningCubeX = (Math.random()-0.5)*5
let winningCubeY = (Math.random())*2.5
let winningCubeZ = (Math.random()*-5)


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      gameStatus:"initialize",
      difficulty: 0,
      counter: 30,
      name: "",
      firstNameInitial: 0,
      middleNameInitial: 0,
      lastNameInitial: 0,
      highScores: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onClick = (position, source) => {
    this.setState({text:"clicked"})
}

  difficultyChange = () => {
    this.setState({difficulty: ((this.state.difficulty + 1) % 3)})
  }

  renderSetup = () => {
    switch(this.state.difficulty) {
      case 0:
        return(
          <ViroImage
              height={0.1}
              width={0.1625}
              position={[-0.2,0,-0.5]}
              source={require("./res/easy.png")}
              onClick={this.difficultyChange}
          />
        )
        break;
      case 1:
        return(
          <ViroImage
              height={0.1}
              width={0.1625}
              position={[-0.2,0,-0.5]}
              source={require("./res/medium.png")}
              onClick={this.difficultyChange}
          />
        )
        break;
      case 2:
        return(
          <ViroImage
              height={0.1}
              width={0.1625}
              position={[-0.2,0,-0.5]}
              source={require("./res/hard.png")}
              onClick={this.difficultyChange}
          />
        )
    }    
  }

  renderInfo = () => {
    return(
    <ViroImage
        height={0.4}
        width={0.9}
        position={[0, 0.3,-0.5]}
        source={require("./res/info.png")}
        onClick={this.gameStart}
    />
    )
  }

  renderLeaderboard = () => {
    try {
      return(
        <ViroText
          text={this.state.highScores[0]["user"] + " | " + this.state.highScores[0]["score"]}
          textAlign="center"
          textAlignVertical="center"
          color="#ff0000"
          width={0.4} height={0.1}
          style={{fontFamily:"Arial", fontSize:8, fontWeight:"normal", color:"#B090A8"}}
          position={[0.2,0,-0.55]}
      />
     )
    }
    catch(err) {
      return null
    }
  }

  gameStart = () => {
    var intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId, gameStatus: "playing", counter: 30});
  }

  timer = () => {
    var newCount = this.state.counter - 1;
    if(newCount >= 0) { 
        this.setState({ counter: newCount });
    } else {
        this.losingChoice()
    }
 }
 

  renderCountdown = () => {
    return(
    <ViroImage
        height={0.4}
        width={0.65}
        position={[0, 1.3,-2.5]}
        source={countdown[this.state.counter]}
    />
    )
  }

  renderBoxes = () => {
    let result = []
    for (let i = 0; i < 10; i++) {
      result.push(<ViroBox 
        key={i}
        height={0.2} 
        length={0.2} 
        width={0.2} 
        position={numArray[i]} 
        materials={["test"]}
        onClick={this.losingChoice}
        animation={{name:'animateTest', run:(this.state.gameStatus==="loss")}}
        />)
    }
    return result
  }

  losingChoice = () => {
    clearInterval(this.state.intervalId)
    this.setState({gameStatus: "loss"})
  }

  renderGameover = () => {
    return( [
    <ViroImage
        key = {1}
        height={0.4}
        width={0.65}
        position={[0, 1.3,-0.5]}
        source={require('./res/gameover.png')}
    />,
    <ViroImage
        key = {2}
        height={0.4}
        width={0.8}
        position={[0, 0.6,-0.5]}
        source={require('./res/tryagain.png')}
        onClick={this.gameStart}
    />
  ]
    )
  }
 
  renderWinningBox = () => {
      return(<ViroBox 
        key={100}
        height={0.2} 
        length={0.2} 
        width={0.2} 
        position={[winningCubeX, winningCubeY, winningCubeZ]} 
        materials={["victory"]}
        onClick={this.winningChoice}
        />)
    } 

  winningChoice = () => {
    clearInterval(this.state.intervalId)
    this.setState({gameStatus: "victory"})
  }

  renderNameSubmit = () => {
    return([
      <ViroImage
          key={1}
          height={0.4}
          width={0.3}
          position={[(winningCubeX + 0.3), winningCubeY, winningCubeZ]}
          source={letters[this.state.firstNameInitial]}
      />,
      <ViroImage
          key={2}
          height={0.4}
          width={0.3}
          position={[(winningCubeX + 0.6), winningCubeY, winningCubeZ]}
          source={letters[this.state.middleNameInitial]}
      />,
      <ViroImage
          key={3}
          height={0.4}
          width={0.3}
          position={[(winningCubeX + 0.9), winningCubeY, winningCubeZ]}
          source={letters[this.state.lastNameInitial]}
      />,
      <ViroImage
          key={4}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.3), (winningCubeY + 0.2), (winningCubeZ +.01)]}
          source={require('./res/uparrow.png')}
          onClick={() => this.setState({firstNameInitial: (this.state.firstNameInitial+1)%26})}
      />,
      <ViroImage
          key={5}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.6), (winningCubeY + 0.2), (winningCubeZ +.01)]}
          source={require('./res/uparrow.png')}
          onClick={() => this.setState({middleNameInitial: (this.state.middleNameInitial+1)%26})}
      />,
      <ViroImage
          key={6}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.9), (winningCubeY + 0.2), (winningCubeZ +.01)]}
          source={require('./res/uparrow.png')}
          onClick={() => this.setState({lastNameInitial: (this.state.lastNameInitial+1)%26})}
      />,
      <ViroImage
          key={7}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.3), (winningCubeY - 0.2), (winningCubeZ +.01)]}
          source={require('./res/downarrow.png')}
          onClick={() => this.setState({firstNameInitial: (this.state.firstNameInitial+25)%26})}
      />,
      <ViroImage
          key={8}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.6), (winningCubeY - 0.2), (winningCubeZ +.01)]}
          source={require('./res/downarrow.png')}
          onClick={() => this.setState({middleNameInitial: (this.state.middleNameInitial+25)%26})}
      />,
      <ViroImage
          key={9}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 0.9), (winningCubeY - 0.2), (winningCubeZ +.01)]}
          source={require('./res/downarrow.png')}
          onClick={() => this.setState({lastNameInitial: (this.state.lastNameInitial+25)%26})}
      />,
      <ViroImage
          key={10}
          height={0.15}
          width={0.15}
          position={[(winningCubeX + 1.2), (winningCubeY), (winningCubeZ +.01)]}
          source={require('./res/submit.png')}
          onClick={this.submit}
      />
    ])
  }

  getHighScore = () => {
    fetch("https://argameinnativebackend.herokuapp.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.map( obj => {
        return {user: obj.user, score: parseInt(obj["high_score"][0]["score"])}
      });
    })
    .then((data) => {
      this.setState({highScores: data.sort(function(a, b) {return b.score - a.score;})});
    });
  }

  submit = () => {
    this.setState({gameStatus: "initialize"})
    fetch("https://argameinnativebackend.herokuapp.com/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({device: (letterChar[this.state.firstNameInitial]+ letterChar[this.state.middleNameInitial] +letterChar[this.state.lastNameInitial] ), date: date, score: this.state.counter})
    })
  }


  clearLeaderboard = () => {
    // reset leaderboard
      fetch("https://argameinnativebackend.herokuapp.com/users", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }})
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.state.gameStatus==="initialize" ? this.renderInfo() : null}
        {this.state.gameStatus==="initialize" ? this.renderSetup() : null}
        {this.state.gameStatus==="initialize" ? this.renderLeaderboard() : null}
        {this.state.gameStatus==="playing" ? this.renderBoxes() : null}
        {this.state.gameStatus==="playing" ? this.renderWinningBox() : null}
        {this.state.gameStatus==="playing" ? this.renderCountdown() : null}
        {this.state.gameStatus==="loss" ? this.renderGameover() : null}
        {this.state.gameStatus==="loss" ? this.renderBoxes() : null}
        {this.state.gameStatus==="victory" ? this.renderWinningBox() : null}
        {this.state.gameStatus==="victory" ? this.renderNameSubmit() : null}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.getHighScore()
      this.setState({
        text : "Adit's VR Game!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 40,
    color: '#0E2E47',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({ test: { diffuseColor: "#B090A8"}, victory: { diffuseColor: "#081723"}, loss: {diffuseColor: "#2B3032"}});

ViroAnimations.registerAnimations({
  animateTest:{properties:{positionY:-0.5, material:"loss", rotateY:"+=45"},
                easing:"Linear", 
                duration: 5000},
});

module.exports = HelloWorldSceneAR;
