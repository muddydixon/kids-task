"use strict";
import React, {Component} from "react";
import ReactSwipe from "react-swipe";

import TaskAction from "../actions/task-action";
import NewTask    from "./new-task";

class Task extends Component {
  onDelete(ev){
    ev.preventDefault();
    const {task} = this.props;
    TaskAction.delete(task).then((task)=>{
      console.log(task);
    }).catch((err)=>{
      console.log(err);
    });
  }
  render(){
    const {task} = this.props;
    return <div className="row" style={styles.task}>
      <form className="form-inline">
        <div className="col-md-2">
          <h4>{task.time}</h4>
        </div>
        <div className="col-md-8">
          <h4>{task.task}</h4>
        </div>
        <div className="col-md-2 form-group">
          <button className="btn btn-danger btn-block" onClick={this.onDelete.bind(this)}>削除</button>
        </div>
      </form>
    </div>;
  }
};

export default class TaskManager extends Component {
  componentWillMount(){
    TaskAction.fetchAll();
  }
  render(){
    const {tasks} = this.props.data;
    console.log(tasks);
    return <div className="container">
      <div className="container">
        {tasks.map((task, idx)=>{
          return <Task key={idx} task={task}/>;
        })}
      </div>
      <div className="container panal panel-default panel-body">
        <div className="row">
          <NewTask />
        </div>
      </div>
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
