import React, { FC, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  SearchControl,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
} from "@react-sigma/core";
import data from "./data.json";
// import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import {
  LayoutForceAtlas2Control,
  useLayoutForceAtlas2,
} from "@react-sigma/layout-forceatlas2";
import { useLayoutNoverlap } from "@react-sigma/layout-noverlap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GraphSettingsController from "./GraphSettingsController";
import GraphEventsController from "./GraphEventsController";
import Graph from "graphology";

const SigmaComponent = () => {
  // const MyGraph = () => {
  //   const loadGraph = useLoadGraph();
  //   const registerEvents = useRegisterEvents();
  //   const finalData = [];
  //   const { positions, assign } = useLayoutNoverlap();

  //   const getColor = (type, properties) => {
  //     console.log(type)
  //     switch (type) {
  //       case "Movie":
  //         return "brown";
  //       case "Category":
  //         return "red";
  //       case "Person":
  //         return "#19a83d";
  //       default:
  //         return "blue";
  //         break;
  //     }
  //   };
  //   // useEffect(() => {
  //   //   // Create the graph
  //   //   const graph = new MultiDirectedGraph();
  //   //   const elementIds = [];
  //   //   data.forEach((element, index) => {
  //   //     element?._fields.forEach((innerElement) => {
  //   //       const {
  //   //         elementId,
  //   //         identity,
  //   //         properties,
  //   //         startNodeElementId,
  //   //         endNodeElementId,
  //   //         labels,
  //   //       } = innerElement;
  //   //       // console.log(innerElement?.properties);
  //   //       if (!startNodeElementId && !endNodeElementId) {
  //   //         if (!elementIds.includes(elementId)) {
  //   //           graph.addNode(elementId, {
  //   //             x: identity.low,
  //   //             y: identity.high,
  //   //             label: properties.name || properties.title || properties.productName,
  //   //             size: 10,
  //   //             color: getColor(labels[0], properties),
  //   //           });  
  //   //           elementIds.push(elementId);
  //   //           console.log(elementIds.length);
  //   //         }
  //   //       } else {
  //   //         finalData.push(innerElement);
  //   //       }
  //   //     });
  //   //   });
  //   //   finalData.forEach((element) => {
  //   //     const {
  //   //       elementId,
  //   //       identity,
  //   //       properties,
  //   //       startNodeElementId,
  //   //       endNodeElementId,
  //   //       type,
  //   //     } = element;
  //   //     if (element.startNodeElementId && element.endNodeElementId) {
  //   //       graph.addEdgeWithKey(
  //   //         elementId,
  //   //         startNodeElementId,
  //   //         endNodeElementId,
  //   //         { multi: false, label: type, GraphType: "directed" }
  //   //       );
  //   //       // graph.multi(true)
  //   //     }
  //   //   });
  //   //   if (!localStorage.getItem("nodes")) {
  //   //     const nodes = [];
  //   //     graph.forEachNode((node) => {
  //   //       const x = Math.random() * 10;
  //   //       const y = Math.random() * 10;
  //   //       graph.mergeNodeAttributes(node, {
  //   //         x,
  //   //         y,
  //   //       });
  //   //       nodes.push({ node, x, y });
  //   //     });
  //   //     localStorage.setItem("nodes", JSON.stringify(nodes));
  //   //   } else {
  //   //     const nodes = JSON.parse(localStorage["nodes"]);
  //   //     graph.forEachNode((node, attributes) => {
  //   //       const index = nodes.findIndex((item) => item.node === node);
  //   //       graph.mergeNodeAttributes(node, {
  //   //         x: nodes[index].x,
  //   //         y: nodes[index].y,
  //   //       });
  //   //     });
  //   //   }
  //   //   loadGraph(graph);
  //   //   assign();
  //   // }, []);
  //   useEffect(() => {
  //     registerEvents({
  //       // node events
  //       clickNode: (event) => {
  //         // setHoverDiv({ top: ``, left: ``, display: "none" });
  //         console.log(
  //           "clickNode",
  //           event.event,
  //           event.node,
  //           event.preventSigmaDefault
  //         );
  //         handleShow();
  //       },
  //       // doubleClickNode: (event) =>
  //       //   console.log(
  //       //     "doubleClickNode",
  //       //     event.event,
  //       //     event.node,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // rightClickNode: (event) =>
  //       //   console.log(
  //       //     "rightClickNode",
  //       //     event.event,
  //       //     event.node,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // wheelNode: (event) => console.log("wheelNode", event.event, event.node, event.preventSigmaDefault),
  //       // downNode: (event) =>
  //       //   console.log(
  //       //     "downNode",
  //       //     event.event,
  //       //     event.node,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       enterNode: (e) =>{
  //         e.preventSigmaDefault()
  //         console.log(e?.event.x,e?.event.y)
  //         setHoverDiv({top:`${e.event.y}px` , left:`${e.event.x}px` , display:"block"})
  //         // if(hoverDiv.display==="none"){
  //         // }else{
  //         //   setHoverDiv({top:`` , left:`` , display:"none"})
  //         // }
  //         console.log("🚀 ~ event", e)
  //       } ,
  //       leaveNode: (e) => {
  //         e.preventSigmaDefault();
  //         console.log("🚀 ~ event leave node", e);
  //         // setHoverDiv({ top: ``, left: ``, display: "none" });
  //       },
  //       // edge events
  //       // clickEdge: (event) =>
  //       //   console.log(
  //       //     "clickEdge",
  //       //     event.event,
  //       //     event.edge,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // doubleClickEdge: (event) =>
  //       //   console.log(
  //       //     "doubleClickEdge",
  //       //     event.event,
  //       //     event.edge,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // rightClickEdge: (event) =>
  //       //   console.log(
  //       //     "rightClickEdge",
  //       //     event.event,
  //       //     event.edge,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // wheelEdge: (event) =>
  //       //   console.log(
  //       //     "wheelEdge",
  //       //     event.event,
  //       //     event.edge,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // downEdge: (event) =>
  //       //   console.log(
  //       //     "downEdge",
  //       //     event.event,
  //       //     event.edge,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // // enterEdge: (event) => console.log("enterEdge", event.edge),
  //       // leaveEdge: (event) => console.log("leaveEdge", event.edge),
  //       // // stage events
  //       // clickStage: (event) =>
  //       //   console.log("clickStage", event.event, event.preventSigmaDefault),
  //       // doubleClickStage: (event) =>
  //       //   console.log(
  //       //     "doubleClickStage",
  //       //     event.event,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // rightClickStage: (event) =>
  //       //   console.log(
  //       //     "rightClickStage",
  //       //     event.event,
  //       //     event.preventSigmaDefault
  //       //   ),
  //       // wheelStage: (event) =>
  //       //   console.log("wheelStage", event.event, event.preventSigmaDefault),
  //       // downStage: (event) =>
  //       //   console.log("downStage", event.event, event.preventSigmaDefault),
  //       // // default mouse events
  //       // click: (event) => console.log("click", event.x, event.y),
  //       // doubleClick: (event) => console.log("doubleClick", event.x, event.y),
  //       // wheel: (event) => console.log("wheel", event.x, event.y, event.delta),
  //       // rightClick: (event) => console.log("rightClick", event.x, event.y),
  //       // mouseup: (event) => console.log("mouseup", event.x, event.y),
  //       // mousedown: (event) => console.log("mousedown", event.x, event.y),
  //       // mousemove: (event) => console.log("mousemove", event.x, event.y),
  //       // default touch events
  //       // touchup: (event) => console.log("touchup", event.touches),
  //       // touchdown: (event) => console.log("touchdown", event.touches),
  //       // touchmove: (event) => console.log("touchmove", event.touches),
  //       // sigma kill
  //       // kill: () => console.log("kill"),
  //       // // sigma camera update
  //       // updated: (event) =>
  //       //   console.log("updated", event.x, event.y, event.angle, event.ratio),
  //     });
  //   }, []);
  //   return null;
  // };
  console.log(data)
  const graph = Graph.from(data);
  const [show, setShow] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverDiv, setHoverDiv] = useState({
    top: "",
    left: "",
    display: "none",
  });
  console.log("🚀 ~ hoverDiv", hoverDiv);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <SigmaContainer
      graph={graph}
      settings={{
        maxCameraRatio: 1,
        // nodeProgramClasses: { image: getNodeProgramImage() },
        // defaultEdgeType: "arrow",
        // renderEdgeLabels: true,
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
      }}
      style={{ height: "100vh" }}
    >
      <div className="pop-up" style={{ position: "absolute", ...hoverDiv }}>
        <Card bg="light" border="primary" style={{ width: "18rem" }}>
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Primary Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      {/* <GraphSettingsController hoveredNode={hoveredNode} /> */}
      {/* <GraphEventsController setHoveredNode={(node)=>{
        const {x,y} = node.event
        if(x & y){
          setHoverDiv({top:`${e.event.y}px` , left:`${e.event.x}px` , display:"block"})
        }else{
          setHoverDiv({top:`` , left:`` , display:"none"})
        }
      }} /> */}

      {/* <MyGraph /> */}
      {/* <ZoomControl /> */}
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        {/* <LayoutForceAtlas2Control /> */}
        <FullScreenControl />
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
    // <SigmaContainer
    //     graphOptions={{ type: "directed" }}
    //     initialSettings={{
    //       // nodeProgramClasses: { image: getNodeProgramImage() },
    //       // labelRenderer: drawLabel,
    //       defaultNodeType: "image",
    //       defaultEdgeType: "arrow",
    //       labelDensity: 0.07,
    //       labelGridCellSize: 60,
    //       labelRenderedSizeThreshold: 15,
    //       labelFont: "Lato, sans-serif",
    //       zIndex: true,
    //     }}
    //     className="react-sigma"
    //   >
    //     {/* <GraphSettingsController hoveredNode={hoveredNode} />
    //     <GraphEventsController setHoveredNode={setHoveredNode} />
    //     <GraphDataController dataset={dataset} filters={filtersState} /> */}

    //     {/* {dataReady && (
    //       <>
    //         <div className="controls">
    //           <div className="ico">
    //             <button
    //               type="button"
    //               className="show-contents"
    //               onClick={() => setShowContents(true)}
    //               title="Show caption and description"
    //             >
    //               <BiBookContent />
    //             </button>
    //           </div>
    //           <FullScreenControl
    //             className="ico"
    //             customEnterFullScreen={<BsArrowsFullscreen />}
    //             customExitFullScreen={<BsFullscreenExit />}
    //           />
    //           <ZoomControl
    //             className="ico"
    //             customZoomIn={<BsZoomIn />}
    //             customZoomOut={<BsZoomOut />}
    //             customZoomCenter={<BiRadioCircleMarked />}
    //           />
    //         </div>
    //         <div className="contents">
    //           <div className="ico">
    //             <button
    //               type="button"
    //               className="ico hide-contents"
    //               onClick={() => setShowContents(false)}
    //               title="Show caption and description"
    //             >
    //               <GrClose />
    //             </button>
    //           </div>
    //           <GraphTitle filters={filtersState} />
    //           <div className="panels">
    //             <SearchField filters={filtersState} />
    //             <DescriptionPanel />
    //             <ClustersPanel
    //               clusters={dataset.clusters}
    //               filters={filtersState}
    //               setClusters={(clusters) =>
    //                 setFiltersState((filters) => ({
    //                   ...filters,
    //                   clusters,
    //                 }))
    //               }
    //               toggleCluster={(cluster) => {
    //                 setFiltersState((filters) => ({
    //                   ...filters,
    //                   clusters: filters.clusters[cluster]
    //                     ? omit(filters.clusters, cluster)
    //                     : { ...filters.clusters, [cluster]: true },
    //                 }));
    //               }}
    //             />
    //             <TagsPanel
    //               tags={dataset.tags}
    //               filters={filtersState}
    //               setTags={(tags) =>
    //                 setFiltersState((filters) => ({
    //                   ...filters,
    //                   tags,
    //                 }))
    //               }
    //               toggleTag={(tag) => {
    //                 setFiltersState((filters) => ({
    //                   ...filters,
    //                   tags: filters.tags[tag] ? omit(filters.tags, tag) : { ...filters.tags, [tag]: true },
    //                 }));
    //               }}
    //             />
    //           </div>
    //         </div>
    //       </>
    //     )} */}
    //   </SigmaContainer>
  );
};

export default SigmaComponent;
