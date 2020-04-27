'use strict';

import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
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
  require('./res/26.png')
]

let numArray=[]

for (var i=0;i<101;++i) numArray.push([(Math.random()-0.5)*5, (Math.random())*2.5, (Math.random()*-5)]);


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      gameStatus:"initialize",
      difficulty: 0,
      counter: 30,
      name: ""
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
              position={[0,0,-0.5]}
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
              position={[0,0,-0.5]}
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
              position={[0,0,-0.5]}
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

  gameStart = () => {
    var intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId, gameStatus: "playing", counter: 30});
  }

  timer = () => {
    var newCount = this.state.counter - 1;
    if(newCount >= 0) { 
        this.setState({ counter: newCount });
    } else {
        clearInterval(this.state.intervalId)
        this.setState({ gameStatus: "loss"})
    }
 }
 

  renderCountdown = () => {
    return(
    <ViroImage
        height={0.4}
        width={0.65}
        position={[0, 1.3,-0.5]}
        source={countdown[this.state.counter]}
        onClick={this.gameStart}
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
        position={numArray.slice(-1)[0]} 
        materials={["victory"]}
        onClick={this.winningChoice}
        />)
    } 

  winningChoice = () => {
    this.setState({gameStatus: "victory"})
  }

  render() {
    console.log("running")
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.state.gameStatus==="initialize" ? this.renderInfo() : null}
        {this.state.gameStatus==="initialize" ? this.renderSetup() : null}
        {this.state.gameStatus==="playing" ? this.renderBoxes() : null}
        {this.state.gameStatus==="playing" ? this.renderWinningBox() : null}
        {this.state.gameStatus==="playing" ? this.renderCountdown() : null}
        {this.state.gameStatus==="loss" ? this.renderGameover() : null}
        {this.state.gameStatus==="loss" ? this.renderBoxes() : null}
        {this.state.gameStatus==="victory" ? this.renderBoxes() : null}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {

      DeviceInfo.getDeviceName().then(deviceName => {
        this.setState({name: deviceName})
      });

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


// The fetch it expects
// fetch("http://localhost:3000/users", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({device: "AAA", date: "1/2/2020", score: 500})
//   })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// reset leaderboard
// fetch("http://localhost:3000/users", {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }})