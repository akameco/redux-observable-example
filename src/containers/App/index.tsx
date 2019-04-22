import React from "react";
import { connect } from "react-redux";
import { State } from "./reducer";
import * as actions from "./actions";
import "./style.css";

const mapStateToProps = (state: State) => state;

type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const App = ({ count, increment, decrement, incrementAsync }: Props) => {
  return (
    <div className="App">
      <button onClick={increment}>+</button>
      {count}
      <button onClick={decrement}>-</button>
      <div>
        <button onClick={() => incrementAsync(1000)}>Async Increment 1s</button>
        <button onClick={() => incrementAsync(3000)}>Async Increment 3s</button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  actions
)(App);
