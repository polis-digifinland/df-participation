import React from "react";
import * as globals from "./globals";
import {VictoryAnimation} from "victory-core";
import * as d3 from "../3rdparty/d3.v4.min.js";

class Hull extends React.Component {
  render () {
    return (
      <g id="hulli">
        <path
          data-testid={`hull-${this.props.gid}`}
          onClick={() => {this.props.handleClick(this.props.gid)}}
          d={this.props.pathString}
          ref={this.props.getHullElems(this.props.gid)}
          fill={/*globals.groupColor(hull.group[0].gid)*/ this.props.selectedGroup === this.props.gid ? "rgb(180,180,180)" : "rgb(220,220,220)"}
          fillOpacity={0.6}/>
      </g>
    );
  }
};

class Hulls extends React.Component {
  render () {
    const line = d3.line(); // .curve(d3.curveBasis);
    //console.log(line);
    return (
      <g id="hullit">
        {
          this.props.hulls ? this.props.hulls.map((curhull) => {
            //console.log(this.props.hulls);
            let gid = curhull.group[0].gid;
            //console.log(gid);
            const pathString = line(curhull.hull);
            //console.log(line(hull.hull));
            //console.log(hull.hull);
            //console.log(hull);
            return (
              <VictoryAnimation
                easing={"quadOut"}
                duration={1500}
                key={gid}
                data={{tweenPath: pathString}}>
                {(tweenedProps) => {
                  return <Hull
                    key={gid}
                    gid={gid}
                    selectedGroup={this.props.selectedGroup}
                    pathString={tweenedProps.tweenPath}
                    getHullElems={this.props.getHullElems}
                    handleClick={this.props.handleClick}
                    hull={curhull}/>
                }}
              </VictoryAnimation>
            )
          }) : ""
        }
      </g>
    )
  }
}

export default Hulls;
