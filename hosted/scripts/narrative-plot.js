import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
console.log("Running line graph script...")

let width = window.innerWidth*.9;
let height = 700;

let padding = {
    left: 70,
    bottom: 50,
    top: 6
};

export class Plot{
    constructor(svg,xScale,yScale){
        this.svg = svg;
        this.xScale = xScale;
        this.yScale = yScale;
    }
}

export function addLine(dataset,plot,opacity=1.0){
    var line = d3.line()
      .x((d) => plot.xScale(d[0]))
      .y((d) => plot.yScale(d[1]));
      
      plot.svg.append('path')
        .datum(dataset)
        .attr('class','line')
        .attr('d',line)
        .attr('stroke','blue')
        .attr('opacity',opacity)
        .attr('fill','none');
}

export function createNarrativePlot(){
    console.log("Creating plot");
    let svg = d3.select('#narrative-plot')
    .attr('width',width)
    .attr('height',height);
    let xScale = d3.scaleLinear()
        .domain([0,max_x])
        .range([padding.left,width]);
    let yScale = d3.scaleLinear()
        .domain([1,9])
        .range([height-padding.bottom,padding.top]);
        
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
  
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
    
    return new Plot(svg,xScale,yScale);
}
