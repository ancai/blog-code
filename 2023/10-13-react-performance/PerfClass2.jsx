import React, { useState } from "react"

class ChildA extends React.Component {
  state = {
    countA: 0,
  }

  shouldComponentUpdate(prevProp, state) {
    // console.log(prevProp, this.props, state);
    return prevProp.msgA !== this.props.msgA
  }

  render() {
    console.log('ChildA is rendering...');
    return (
      <div>
        <p>
          ChildA count: {this.state.countA}
          <button onClick={() => this.setState({countA: this.state.countA + 1})}>+</button>
        </p>
        <p>ChildA msgA: {this.props.msgA}</p>
      </div>
    );
  }
}

class ChildB extends React.Component {
  state = {
    countB: 0,
  }

  shouldComponentUpdate(prevProp, state) {
    return prevProp.msgB !== this.props.msgB
  }

  render() {
    console.log('ChildB is rendering...');
    return (
      <div>
        <p>
          ChildB count: {this.state.countB}
          <button onClick={() => this.setState({countB: this.state.countB + 1})}>+</button>
        </p>
        <p>ChildB msgB: {this.props.msgB}</p>
      </div>
    );
  }
}

class Parent extends React.Component {
  state = {
    messageA: Date.now(),
    messageB: Date.now(),
  }

  render() {
    console.log('Parent is rendering ...');
    return (
      <div>
        <h2>test react rendering...</h2>
        <ChildA msgA={this.state.messageA} />
        <ChildB msgB={this.state.messageB} />
        <section>
          <button onClick={() => this.setState({messageA: Date.now()})}>changeChildA</button>
          <button onClick={() => this.setState({messageB: Date.now(0)})}>changeChildB</button>
        </section>
      </div>
    )
  }
}

export default Parent;