import React, { Component } from 'react'
import '../App.css'

class Snakedots extends Component {
    render() {
        return (
            <div>
                {
                    this.props.snakedotsarr.map((dot,i)=>{
                        const style={
                            left:`${dot[0]}%`,
                            top:`${dot[1]}%`
                        }
                        return (
                            <div className="dot" key={i} style={style}></div>
                        )
                    })}
            </div>
        )
    }
}

export default Snakedots
