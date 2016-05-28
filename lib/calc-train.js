"use strict";

import React, {Component} from "react";
const {render} = require("react-dom");

const CalcTypes = {
  ADD:  "足し算",
  SUB:  "引き算",
  MUL:  "掛け算",
  DIV:  "割り算",
  BOTH: "両方",
  ALL:  "全部"
};
const CalcSymbols = {
  "足し算": "+",
  "引き算": "-",
  "掛け算": "x",
  "割り算": "÷"
};

class Item {
  constructor(type = CalcTypes.ADD, numMax = 10){
    if(type === CalcTypes.BOTH){
      type = Math.random() < 0.5 ? CalcTypes.ADD : CalcTypes.SUB;
    }
    if(type === CalcTypes.ALL){
      const r = Math.random();
      type = r < 0.25 ? CalcTypes.ADD :
        r < 0.5 ? CalcTypes.SUB:
        r < 0.75 ? CalcTypes.MUL : CalcTypes.DIV;
    }
    this.type = type;
    this.first  = 1 + 0|Math.random() * (numMax - 1);
    this.second = 1 + 0|Math.random() * (this.type === CalcTypes.SUB ? this.first : (numMax - 1));
  }
  toString(){
    return `${this.first} ${CalcSymbols[this.type]} ${this.second} = `;
  }
  solve(){
    switch (this.type){
    case CalcTypes.ADD:
      return this.add();
    case CalcTypes.SUB:
      return this.sub();
    case CalcTypes.MUL:
      return this.mul();
    default:
      return 0;
    }
  }
  add(){
    return this.first + this.second;
  }
  sub(){
    return this.first - this.second;
  }
  mul(){
    return this.first * this.second;
  }
}

const styles = {
  range: {
    display: "inline-block",
    width: "90%"
  },
  qa: {
    fontSize: "180pt"
  }
};

const Interval = (props)=>{
  return <div>
    <input type="text"  readOnly value={props.interval} />
    <input type="range" min={500} max={5000} value={props.interval} style={styles.range}
      onChange={props.onChange}
    />
  </div>;
};

const CalcType = (props)=>{
  return <div>
    <select onChange={props.onChange}>
    {Object.keys(CalcTypes).map((t)=> <option key={t} value={t}>{CalcTypes[t]}</option>)}
    </select>
  </div>;
};

const NumMax = (props)=>{
  return <div>
    <input type="text" value={props.numMax} value={props.numMax} onChange={props.onChange}/>
  </div>;
};

const QA = (props)=>{
  const {qa, showAnswer} = props;
  return <div style={styles.qa}>
    <span className="q">{qa.toString()}</span>
    <span className="a" style={{display: showAnswer ? "inline" : "none"}}>{qa.solve()}</span>
  </div>;
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      numMax: 10,
      interval: 3000,
      calcType: CalcTypes.ADD,
      qa: new Item(),
      showAnswer: false
    };
  }
  onChangeInterval(ev){
    this.setState({
      interval: ev.target.value
    });
  }
  onChangeCalcType(ev){
    console.log(ev.target.value);
    this.setState({
      calcType: CalcTypes[ev.target.value]
    });
  }
  onChangeNumMax(ev){
    this.setState({
      numMax: ev.target.value
    });
  }
  componentDidMount(){
    this.newItem();
  }
  newItem(){
    setTimeout(()=>{
      this.setState({
        qa: new Item(this.state.calcType, this.state.numMax),
        showAnswer: false
      });
      this.newItem();
    }, this.state.interval);
    setTimeout(()=>{
      this.setState({
        showAnswer: true
      });
    }, this.state.interval * 0.8);
  }
  render(){
    return <div>
      <div>
        <Interval interval={this.state.interval} onChange={this.onChangeInterval.bind(this)} />
        <CalcType calcType={this.state.calcType} onChange={this.onChangeCalcType.bind(this)}/>
        <NumMax   numMax={this.state.numMax}     onChange={this.onChangeNumMax.bind(this)}/>
      </div>
      <div>
        <QA numMax={this.state.numMax} qa={this.state.qa} showAnswer={this.state.showAnswer}/>
      </div>
    </div>;
  }
}

render(<App />, document.querySelector("#app"));
