import React, { Component } from 'react'
import './App.css'
import Snakedots from './components/Snakedots'
import Snakefood from './components/Snakefood'

const getrandompoint = ()=>{
  let min=1;
  let max=98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialize={
  food:getrandompoint(),
  snakedotarr:[
    [0,0],[2,0]
  ],
  speed:50,
  direction:'RIGHT',
  score:0

}


class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state =initialize
  }
  


  componentDidMount(){
    setInterval(this.movesnake, this.state.speed);
    document.onkeydown=this.turndirection;
  }


  componentDidUpdate(){
      this.ifcutitself();
      this.iftouchboundary();
      this.ifeatfood();
  }

turndirection=(e)=>{
  e=e||window.event;
     switch (e.keyCode) {
       case 37:
         if(this.state.direction==='LEFT' || this.state.direction==='RIGHT')
         break;
        this.setState({direction:'LEFT'});
         break;
         case 38:
          if(this.state.direction==='UP' || this.state.direction==='DOWN')
          break;
          this.setState({direction:'UP'});
         break;
         case 39:
          if(this.state.direction==='LEFT' || this.state.direction==='RIGHT')
          break;
          this.setState({direction:'RIGHT'});
         break;
         case 40:
          if(this.state.direction==='UP' || this.state.direction==='DOWN')
          break;
         this.setState({direction:'DOWN'});
         break;   
         default:
           break;   
     }
}

movesnake=()=>{
 let snakearr=[...this.state.snakedotarr];
 let head=this.state.snakedotarr[this.state.snakedotarr.length-1];
 let dir=this.state.direction;
  switch (dir) {
    case 'LEFT':
      head=[head[0]-2,head[1]];
      break;
      case 'UP':
      head=[head[0],head[1]-2];
      break;
      case 'RIGHT':
      head=[head[0]+2,head[1]];
      break;
      case 'DOWN':
      head=[head[0],head[1]+2];
      break;
      default:
        break;   
  }
  snakearr.push(head);
  snakearr.shift();
  this.setState({
    snakedotarr:snakearr
  })
}

ifcutitself=()=>{
  let array=[...this.state.snakedotarr];
  let head=array[array.length-1];
  array.pop();
  array.forEach(element => {
    if(element[0]===head[0] && element[1]===head[1])
    {
      this.gameover();
    }
  });
}

ifeatfood=()=>{
  let head=this.state.snakedotarr[this.state.snakedotarr.length-1];
  let point=this.state.food;
   if(head[0]===point[0] && head[1]===point[1])
   {
     this.setState(prevState=>{
       return {score:prevState.score+2};
     })
    // console.log(this.state.speed);
     this.setState({
       food:getrandompoint()
     })
     this.enlargesnake();
     this.increasespeed();
    }
  }

iftouchboundary=()=>{
     let head=this.state.snakedotarr[this.state.snakedotarr.length-1];
      if(head[0]<0 || head[0]>=100 || head[1]<0 || head[1]>=100)
      {
        this.gameover();
      }
}

gameover=()=>{
    this.setState({
      food:getrandompoint(),
      snakedotarr:[
        [0,0],[2,0]
      ],
      speed:50,
      direction:'RIGHT',
      score:0
    })
    alert(`GAME OVER YOUR SCORE IS : ${this.state.score}`);
}


enlargesnake=()=>{
   let array=[...this.state.snakedotarr];
   array.unshift([]);
   this.setState({
     snakedotarr:array
   })
}

increasespeed=()=>{
 if(this.state.speed>10)
      this.setState({
         speed:this.state.speed-10
      })
}








  render() {
    return (
      <div>
        <h1 className="heading">Snake Game</h1>
        <h3 className="heading">Your Score : {this.state.score}</h3>
      <div className="App">
        
        <Snakedots snakedotsarr={this.state.snakedotarr} />
        <Snakefood food={this.state.food} />
      </div>
      </div>
    )
  }
}

export default App