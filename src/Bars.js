import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, ART } from 'react-native';
const { Surface } = ART;

import Bar from './animated/Bar';

export default class Bubbles extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    spaceBetween: PropTypes.number
  };

  static defaultProps = {
    spaceBetween: 2,
    size: 20,
    color: '#000'
  };

  state = {
    bars: [
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
      new Animated.Value(this.props.size),
			new Animated.Value(this.props.size),
			new Animated.Value(this.props.size)
    ]
  };

  componentDidMount() {
    this.state.bars.forEach((val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 200);  //控制起始间隔时间
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size * 2 * Math.random() ,  // 控制动画的条形上随机值高度
          duration: 250
        }),
        Animated.timing(this.state.bars[index], {
          toValue: this.props.size / 10 * Math.random(),  // 控制动画的条形下随机值高度
          duration: 250
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBar(index) {
    const { size, spaceBetween, color } = this.props;
    const width = size / 3;
    const x = width / 2 + (width + spaceBetween) * index;

    return (<Bar
      fill={color}
      width={width}
      height={this.state.bars[index]}
      originY={0.5 * size}
      originX={0.5}
      y={size * 1.5}
      x={x}
    />);
  }

  render() {
    const { size, spaceBetween } = this.props;
    const width = size / 3 * 7 + spaceBetween * 4;
    const height = size * 2;

    return (<Surface width={width} height={height}>
      {this.renderBar(0)}
      {this.renderBar(1)}
      {this.renderBar(2)}
      {this.renderBar(3)}
      {this.renderBar(4)}
			{this.renderBar(5)}
			{this.renderBar(6)}
    </Surface>);
  }
}
