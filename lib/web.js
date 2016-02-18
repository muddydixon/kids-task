"use strict";

import React, {Component} from "react";
import {render}           from "react-dom";
import {Router, Route,
        IndexRoute,
        browserHistory}   from "react-router";
import {createHistory}    from "history";


import App         from "./components/app";
import Tasks       from "./components/tasks";
import TaskManager from "./components/task-manager";
import NewTask     from "./components/new-task";

render(<Router history={browserHistory}>
         <Route path="/" component={App}>
           <IndexRoute component={Tasks} />
           <Route path="task" component={Tasks} />
           <Route path="manager" component={TaskManager} />
         </Route>
       </Router>,
       document.querySelector("#app"));
