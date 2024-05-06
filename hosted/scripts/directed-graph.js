import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log("Running directed graph script...")

let radius = 3;
let xOffText = 6;
let repelStrength = -250;

let width = window.innerWidth*.9;
let height = 700;

let dataset = {
  nodes: graph.vertices.map((page) => {
      return {name: page}
  }),
  connections: graph.edges.map(edge => {
    return {
      target: graph.vertices.indexOf(edge[0]),
      source: graph.vertices.indexOf(edge[1])
    };
  })
}
console.log("Dataset:", dataset);

let forceDirected = {}

window.onload = () => {
    let svg = d3.select('#hypertext-graph')
      .attr('width',width)
      .attr('height',height);

    //Create force directed layout
    // modified from force directed graph code in https://github.com/bxs9775/DataVis_Project2
    forceDirected = d3.forceSimulation(dataset.nodes)
      .force('repel',d3.forceManyBody().strength(repelStrength))
      .force('links',d3.forceLink().links(dataset.connections))
      .force('center',d3.forceCenter().x(width/2).y(height/2));
    
    // Create edges. (Called first so they are lower.)
    var edges = svg.selectAll('line')
      .data(dataset.connections)
      .enter()
      .append('line')
        .attr('stroke','darkgrey')
        .attr('marker-start',`url(#arrow)`);
    
    var nodes = svg.selectAll('g')
      .data(dataset.nodes)
      .enter()
      .append('g');
    nodes.append('circle')
      .attr('r',radius);
    nodes.append('text')
      .attr('x',xOffText)
      .text(((d) => d.name));
    
    // Add event listeners
    forceDirected.on('tick',(d) => {
      edges
        .attr('x1',(d) => d.source.x)
        .attr('y1',(d) => d.source.y)
        .attr('x2',(d) => d.target.x)
        .attr('y2',(d) => d.target.y);
      nodes.attr('transform',(d) => `translate(${d.x},${d.y})`);
    });
}