"use strict";

// import levelup from "levelup";
import request from "superagent";
import uuid from "uuid";
import localStorage from "localforage";

import dispatcher from "../dispatcher";
import Constants  from "../constants";

class TaskAction {
  fetchAll(){
    return new Promise((resolve, reject)=>{
      localStorage.keys((err, keys)=>{
        if(err) return reject(err);
        return Promise.all(keys.map((key)=>{
          return localStorage.getItem(key).then((task)=>{
            return JSON.parse(task);
          }).catch((err)=>{
            localStorage.removeItem(key);
          });
        })).then(resolve).catch(reject);
      });
    }).then((tasks)=>{
      dispatcher.dispatch({type: Constants.FETCH_TASKS, tasks: tasks.sort((a, b)=> b.time < a.time)});
    });
  }
  delete(task){
    return new Promise((resolve, reject)=>{
      return localStorage.removeItem(`${Constants.KEY_PREFIX}-${task.id}`, (err)=>{
        if(err) return reject(err);
        dispatcher.dispatch({type: Constants.DELETE_TASK, task});
        return resolve(task);
      });
    });
  }
  create(data){
    const task = Object.assign({}, data, {
      id:     uuid(),
      isDone: false
    });
    return new Promise((resolve, reject)=>{
      localStorage.setItem(`${Constants.KEY_PREFIX}-${task.id}`, JSON.stringify(task));
      dispatcher.dispatch({type: Constants.CREATE_TASK, task});
      return resolve(task);
    });
  }
  update(task){
    return new Promise((resolve, reject)=>{
      localStorage.setItem(`${Constants.KEY_PREFIX}-${task.id}`, JSON.stringify(task));
      dispatcher.dispatch({type: Constants.UPDATE_TASK, task});
      return resolve(task);
    });
  }
  deleteAll(){
    return new Promise((resolve, reject)=>{
      localStorage.keys((err, keys)=>{
        if(err) return reject(err);
        return Promise.all(keys.map((key)=>{
          return localStorage.removeItem(key, (err)=> err ? Promise.reject(err) : Promise.resolve() );
        }));
      });
    }).then((tasks)=>{
      dispatcher.dispatch({type: Constants.FETCH_TASKS, tasks});
    });
  }
};

export default new TaskAction();
