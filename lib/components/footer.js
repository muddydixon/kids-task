"use strict";

import React, {Component} from "react";
import {Link} from "react-router";

export default class Footer extends Component {
  render(){
    return <div/>;
    return <div className="fluid-row footer">
      <ul>
      <li><Link to="/">Top</Link></li>
      <li><Link to="/new">Create</Link></li>
      </ul>
      </div>;
  }
};
