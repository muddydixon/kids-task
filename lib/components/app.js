"use strict";

import React, {Component} from "react";
import {Container} from "flux/utils";

import TaskStore from "../stores/task-store";
import Footer from "./footer";
import Clock from "./clock";

class App extends Component {
  static getStores(){
    return [
      TaskStore
    ];
  }
  static calculateState(prevState){
    return Object.assign({}, prevState, {
      tasks: TaskStore.getState()
    });
  }
  render(){
    return <div className="container">
      <div className="fluid-row container">
        <div className="col-md-3">
          <Clock />
        </div>
        <div className="col-md-9">
         {React.cloneElement(this.props.children, {data: this.state})}
        </div>
      </div>
      <div className="fluid-row container">
        <Footer />
      </div>
    </div>;
  }
};

export default Container.create(App);
