"use strict";

import React, {Component} from "react";
import moment from "moment";
import TaskAction from "../actions/task-action";

export default class NewTask extends Component {
  onSubmit(ev){
    ev.preventDefault();
    TaskAction.create({
      task:    this.refs.task.value.trim(),
      time:    this.refs.time.value.trim(),
      weekday: this.refs.weekday.checked,
      owner:   "sakura"
    });
  }
  render(){
    return <div className="container">
      <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label className="col-sm-2 control-label">やること</label>
          <div className="col-sm-10">
            <input className="form-control" ref="task" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">じかん</label>
          <div className="col-sm-10">
            <input className="form-control" type="time" ref="time"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">月から金まで</label>
          <div className="col-sm-1">
            <input type="checkbox" defaultChecked={true} className="form-control" ref="weekday" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-1 col-md-offset-2">
            <button className=" btn btn-info btn-block">作成</button>
          </div>
        </div>
      </form>
      </div>;
  }
}
