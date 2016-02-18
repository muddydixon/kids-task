"use strict";

import {ReduceStore} from "flux/utils";

import Constants from "../constants";
import dispatcher from "../dispatcher";

class TaskStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Constants.FETCH_TASKS:
      return action.tasks;
    case Constants.CREATE_TASK:
      return [].concat(state, action.task);
    case Constants.DELETE_TASK:
      return state.filter((task)=> task.id !== action.task.id);
    case Constants.UPDATE_TASK:
      return state.map((task)=>{
        if(task.id === action.task.id) return action.task;
        return task;
      });
    default:
      return state;
    }
  }
}

export default new TaskStore(dispatcher);
