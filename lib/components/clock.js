"use strict";

import React, {Component} from "react";
import moment from "moment";

export default class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
      now: moment()
    };
  }
  componentWillMount(){
    this.timer = setInterval(()=>{
      this.setState({
        now: moment()
      });
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
  }
  render(){
    const {clockType} = this.props;
    const {now} = this.state;
    const clock = clockType === "analog" ?
            <div></div>:
            <div className="fluid-row">
            <div className="fluid-row"><h1 style={styles.digital}>{now.format("MM/DD")}</h1></div>
            <div className="fluid-row"><h1 style={styles.digital}>{now.format("HH:mm:ss")}</h1></div>
            </div>;
    return <div className="container">{clock}</div>;
  }
};

const styles = {
  digital: {
    fontSize: "100pt"
  }
};
