
import * as globals from "./components/globals";
import _ from "lodash";
import Graph from "./components/graph";
//import Header from "./components/header";
import React from 'react';
//import ReactDOM from 'react-dom';
import Strings from "./strings/fi.js";

// React Router
// import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
// React Redux
// import { Provider, connect } from 'react-redux';
// Redux Devtools

// import configureStore from "./store";

// controller view
// import App from "./components/app";

// const store = configureStore();



class Root extends React.Component{
  render() {
    const math_main = this.props['math_main'];

    if (!math_main) {
      return <div>No math data available</div>;
    }

    let comments = this.props['comments'];

    if (!comments) {
      return <div>No comments data available</div>;
    }

    var maxTid = -1;
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].tid > maxTid) {
        maxTid = comments[i].tid;
      }
    }
    //var tidWidth = ("" + maxTid).length

    function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    function formatTid(tid) {
      let padded = "" + tid;
      return '#' + pad(""+tid, tidWidth);
    }


    let mathResult = math_main;
    let repfulAgreeTidsByGroup = {};
    let repfulDisageeTidsByGroup = {};
    if (mathResult.repness) {
      _.each(mathResult.repness, (entries, gid) => {
        entries.forEach((entry) => {
          if (entry['repful-for'] === 'agree') {
            repfulAgreeTidsByGroup[gid] = repfulAgreeTidsByGroup[gid] || [];
            repfulAgreeTidsByGroup[gid].push(entry.tid);
          } else if (entry['repful-for'] === 'disagree') {
            repfulDisageeTidsByGroup[gid] = repfulDisageeTidsByGroup[gid] || [];
            repfulDisageeTidsByGroup[gid].push(entry.tid);
          }
        });
      });
    }

    let badTids = _.keyBy(this.props.math_main['mod-out']);

    comments = comments.filter((c) => {
      return !c.is_meta;
    });
    console.log(this.props.math_main);
    return (this.props.math_main && this.props.math_main.n >= globals.minParticipantsForVis) ? (
      <div id="vis2_root">
        <Graph
          comments={comments}
          groupNames={{}}
          badTids={badTids}
          formatTid={formatTid}
          tidsToShow={this.props.tidsToShow || []}
          ptptois={this.props.ptptois || []}
          repfulAgreeTidsByGroup={repfulAgreeTidsByGroup}
          math={this.props.math_main}
          renderHeading={false}
          votesByMe={this.props.votesByMe || []}
          onVoteClicked={this.props.onVoteClicked}
          onCurationChange={this.props.onCurationChange}
          Strings={Strings}
          report={{}}/>
      </div>
    ) : null;
  }
}
        // <App/>

/*
// for material ui
import injectTapEventPlugin from "react-tap-event-plugin";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
*/

import { createRoot } from 'react-dom/client';
if (typeof window !== 'undefined') {
  window.renderVis = function(rootEl, props) {
    const root = createRoot(rootEl);
    root.render(
      React.createElement(Root, props, null)
    );
  }
}
/*
window.renderVis = function(rootEl, props) {
  ReactDOM.render(
    React.createElement(Root, props, null),
    rootEl
  );
}

window.renderHeader = function(rootEl, props) {
  ReactDOM.render(
    React.createElement(Header, props, null),
    rootEl
  );
}
*/
export default Root;

