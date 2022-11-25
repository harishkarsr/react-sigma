import React, { FC, useEffect, useState } from "react";

import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph, useRegisterEvents, SearchControl, ControlsContainer, ZoomControl, FullScreenControl } from "@react-sigma/core";
import data from './response1.json'
// import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SigmaComponent = () => {
  const MyGraph= () => {
    const loadGraph = useLoadGraph();
    const registerEvents = useRegisterEvents();
    const finalData = []

    // useEffect(() => {
    //   // start FA2
    //   start();
    //   setTimeout(() => {
    //     kill()
    //   }, 100);
    //   return () => {
    //     // Kill FA2 on unmount
    //     kill();
    //   };
    // }, [start, kill]);
    data.forEach(element => {
        // console.log(element._fields)
        element?._fields.forEach(innerElement =>{
            // console.log(innerElement)
            finalData.push(innerElement)
        })
    });
    // console.log(finalData)
    const getColor=(type)=>{
        switch (type) {
            case 'Movie':
                return "brown"        
            case '':
                return "blue"        
            case 'Person':
                return "#19a83d"        
            default:
                break;
            }
    }
    // console.log(finalData, "D")
    useEffect(() => {
        registerEvents({
            // node events
            clickNode: (event) => {
              console.log("clickNode", event.event, event.node, event.preventSigmaDefault)
              handleShow()
            },
            doubleClickNode: (event) => console.log("doubleClickNode", event.event, event.node, event.preventSigmaDefault),
            rightClickNode: (event) => console.log("rightClickNode", event.event, event.node, event.preventSigmaDefault),
            // wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
            downNode: (event) => console.log("downNode", event.event, event.node, event.preventSigmaDefault),
            enterNode: (event) => console.log("enterNode", event.node),
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
            wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
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
                graph.addNode(elementId, { x: identity.low, y: identity.high, label: properties.name||properties.title, size: 10,color:getColor(labels[0])  });
                elementIds.push(elementId)
            }
        }
      })
      finalData.forEach(element => {
        const {elementId, identity, properties, startNodeElementId, endNodeElementId, type} = element
        if(element.startNodeElementId && element.endNodeElementId){
            graph.addEdgeWithKey(elementId, startNodeElementId, endNodeElementId, { multi:false,label: type, GraphType:"directed" });
            // graph.multi(true)
        }
      })
      graph.forEachNode((node) => {
        graph.mergeNodeAttributes(node, {
          x: Math.random()*1 ,
          y: Math.random()*1        
        });
      });
      loadGraph(graph);
    }, [loadGraph]);

    return null;
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <SigmaContainer graph={MultiDirectedGraph} settings={{
        // nodeProgramClasses: { image: getNodeProgramImage() },
        // defaultEdgeType: "arrow",
        renderEdgeLabels:true,
        // labelDensity: 0.07,
        // labelGridCellSize: 60,
        // labelRenderedSizeThreshold: 15,
        // labelFont: "Lato, sans-serif",
        // zIndex: true,
        // edgeReducer:(edge, data) =>{
        //     if (true && !graph.hasExtremity(edge, true)) {
        //         return true;
        //       }
            
        //       if (state.suggestions && (!state.suggestions.has(graph.source(edge)) || !state.suggestions.has(graph.target(edge)))) {
        //         return true;
        //       } 
        // }     
      }} style={{ height: "100vh" }}>
      <MyGraph />
      <ZoomControl />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control />
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default SigmaComponent;