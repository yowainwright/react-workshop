////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    availableHeight: 0,
    scrollTop: 0,
  }

  figureOutScrolling = (event) => {
    this.setState({ scrollTop: event.target.scrollTop })
  }

  componentDidMount() {
    this.setState({ availableHeight: this.node.clientHeight });
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    const {
      availableHeight,
      scrollTop,
    } = this.state;

    const items = [];
    const startIndex = Math.floor(scrollTop / rowHeight);
    const measurableHeight = Math.ceil((availableHeight / rowHeight) + 1, numRows);
    const endIndex = Math.min(startIndex - measurableHeight);
    console.log('figuring: ', scrollTop, rowHeight, measurableHeight, endIndex);

    let index = startIndex;
    while (index < numRows) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.figureOutScrolling}
        ref={node => (this.node = node)}
      >
        <div style={{ height: totalHeight }}>
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
