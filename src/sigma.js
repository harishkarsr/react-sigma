import React, { FC, useEffect } from "react";

import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents, SearchControl, ControlsContainer } from "@react-sigma/core";
import data from './response.json'
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";

const SigmaComponent = () => {
  const MyGraph= () => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();
    console.log(data)
    const finalData = []
    const { start, kill, isRunning } = useWorkerLayoutForceAtlas2({ settings: { slowDown: 10 } });

    useEffect(() => {
      // start FA2
      start();
      setTimeout(() => {
        kill()
      }, 100);
      return () => {
        // Kill FA2 on unmount
        kill();
      };
    }, [start, kill]);
    data.forEach(element => {
        // console.log(element._fields)
        element?._fields.forEach(innerElement =>{
            // console.log(innerElement)
            finalData.push(innerElement)
        })
    });
    console.log(finalData)
    const getColor=(type)=>{
        switch (type) {
            case 'Organization':
                return "brown"        
            case 'Startup':
                return "blue"        
            case 'User':
                return "#19a83d"        
            default:
                break;
            }
    }
    // console.log(finalData, "D")
    useEffect(() => {
        registerEvents({
            // node events
            clickNode: (event) => console.log("clickNode", event.event, event.node, event.preventSigmaDefault),
            doubleClickNode: (event) => console.log("doubleClickNode", event.event, event.node, event.preventSigmaDefault),
            rightClickNode: (event) => console.log("rightClickNode", event.event, event.node, event.preventSigmaDefault),
            // wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
            downNode: (event) => console.log("downNode", event.event, event.node, event.preventSigmaDefault),
            // enterNode: (event) => console.log("enterNode", event.node),
            // leaveNode: (event) => console.log("leaveNode", event.node),
            // edge events
            clickEdge: (event) => console.log("clickEdge", event.event, event.edge, event.preventSigmaDefault),
            doubleClickEdge: (event) => console.log("doubleClickEdge", event.event, event.edge, event.preventSigmaDefault),
            rightClickEdge: (event) => console.log("rightClickEdge", event.event, event.edge, event.preventSigmaDefault),
            wheelEdge: (event) => console.log("wheelEdge", event.event, event.edge, event.preventSigmaDefault),
            downEdge: (event) => console.log("downEdge", event.event, event.edge, event.preventSigmaDefault),
            // enterEdge: (event) => console.log("enterEdge", event.edge),
            leaveEdge: (event) => console.log("leaveEdge", event.edge),
            // stage events
            clickStage: (event) => console.log("clickStage", event.event, event.preventSigmaDefault),
            doubleClickStage: (event) => console.log("doubleClickStage", event.event, event.preventSigmaDefault),
            rightClickStage: (event) => console.log("rightClickStage", event.event, event.preventSigmaDefault),
            wheelStage: (event) => console.log("wheelStage", event.event, event.preventSigmaDefault),
            downStage: (event) => console.log("downStage", event.event, event.preventSigmaDefault),
            // default mouse events
            click: (event) => console.log("click", event.x, event.y),
            doubleClick: (event) => console.log("doubleClick", event.x, event.y),
            // wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
            // rightClick: (event) => console.log("rightClick", event.x, event.y),
            // mouseup: (event) => console.log("mouseup", event.x, event.y),
            // mousedown: (event) => console.log("mousedown", event.x, event.y),
            // mousemove: (event) => console.log("mousemove", event.x, event.y),
            // default touch events
            touchup: (event) => console.log("touchup", event.touches),
            touchdown: (event) => console.log("touchdown", event.touches),
            touchmove: (event) => console.log("touchmove", event.touches),
            // sigma kill
            kill: () => console.log("kill"),
            // sigma camera update
            updated: (event) => console.log("updated", event.x, event.y, event.angle, event.ratio),
          });
      // Create the graph
      const graph = new MultiDirectedGraph();
      const elementIds=[]
      finalData.forEach(element =>{
        const {elementId, identity, properties, startNodeElementId, endNodeElementId, labels} = element
        console.log(element)
        if(!element.startNodeElementId && !element.endNodeElementId){
            console.log(identity.low, identity.high)
            if(!elementIds.includes(elementId)){
                graph.addNode(elementId, { x: identity.low, y: identity.high, label: properties.name, size: 20,color:getColor(labels[0])  });
                elementIds.push(elementId)
            }
        }
      })
      finalData.forEach(element => {
        const {elementId, identity, properties, startNodeElementId, endNodeElementId, type} = element
        if(element.startNodeElementId && element.endNodeElementId){
            graph.addEdgeWithKey(elementId, startNodeElementId, endNodeElementId, { label: type });
        }
      })
      graph.forEachNode((node) => {
        graph.mergeNodeAttributes(node, {
          x: Math.random() ,
          y: Math.random() 
        });
      });
      loadGraph(graph);
    }, [loadGraph]);

    return null;
  };

  return (
    <SigmaContainer style={{ height: "500px" }}>
      <MyGraph />
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default SigmaComponent;