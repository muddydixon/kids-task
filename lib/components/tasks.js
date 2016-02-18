"use strict";
import React, {Component} from "react";
import ReactSwipe from "react-swipe";

import TaskAction from "../actions/task-action";

class Task extends Component {
  onToggle(ev){
    ev.preventDefault();
    const {task} = this.props;
    TaskAction.update(Object.assign({}, task, {isDone: !task.isDone}));
  }
  render(){
    const {task} = this.props;
    return <div className={`row ${task.isDone ? "bg-info" : ""}`} style={styles.task}>
      <form className="form-inline">
        <div className="col-xs-2">
          <h1>{task.time}</h1>
        </div>
        <div className="col-xs-8">
          <h1>{task.task}</h1>
        </div>
        <div className="col-xs-2 form-group">
          <h1><button className={`btn btn-block ${task.isDone ? "btn-info": "btn-danger"}`} onClick={this.onToggle.bind(this)}>{task.isDone ? "おわった！":"おわった？"}</button></h1>
        </div>
      </form>
    </div>;
  }
};

export default class Tasks extends Component {
  componentWillMount(){
    TaskAction.fetchAll();
  }
  render(){
    const {tasks} = this.props.data;
    return <div className="container">
        {tasks.map((task, idx)=>{
          return <Task key={idx} task={task} />;
        })}
    </div>;
  }
};

const styles = {
  task: {
    display: "block",
    margin: 2,
    border: "1px solid #CCC",
    borderRadius: "5px"
  }
};
