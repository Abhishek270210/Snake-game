import React, { Component } from 'react'
import '../App.css'

 class Snakefood extends Component {
    render() {
        // console.log(this.props.food[0],this.props.food[1]);
        const style = {
            left: `${this.props.food[0]}%`,
            top: `${this.props.food[1]}%`
          } 
        return (
            <div className="food-dot" style={style}></div>
        )
    }
}

export default Snakefood
