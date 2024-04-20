import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log("Running line graph script...")

let radius = 5;
let xOffText = 6;
let repelStrength = -250;

let width = window.innerWidth*.9;
let height = 700;

let padding = {
    left: 70,
    bottom: 50
};

let dataset = path.map(page => oneGrams[page]).flat()
console.log("Dataset:", dataset);

window.onload = () => {
    let svg = d3.select('#narrative-plot')
      .attr('width',width)
      .attr('height',height);

    let xScale = d3.scaleLinear()
        .domain([0,dataset.length])
        .range([padding.left,width]);
    let yScale = d3.scaleLinear()
        .domain([1,7])
        .range([height-padding.bottom,0]);

    var line = d3.line()
        .x((d) => d[0])
        .y((d) => d[1][1]);
    
    svg.append('path')
        .datum(dataset.entries())
        .attr('class','line')
        .attr('d',line)
        .attr('stroke','blue');
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    svg.append('g')
        .attr('class', 'xaxis axis')
        .attr('transform', `translate(0,${height-padding.bottom})`)
        .call(xAxis);
    
    svg.append('g')
        .attr('class', 'yaxis axis')
        .attr('transform', `translate(${padding.left}, 0 )`)
        .call(yAxis);

    
    let chartWidth = width - padding.left;
    let chartHeight = height - padding.bottom;
    let xCenter =  (chartWidth/2) + padding.left;
    let yCenter = (chartHeight/2) + padding.bottom;
    
    var xLabel = svg.append('g').append('text')
        .text('Word Number')
        .attr('x',xCenter)
        .attr('y',height);
    var ylabel = svg.append('g').append('text')
        .text('h_avg')
        .attr('x',0)
        .attr('y',yCenter);
}