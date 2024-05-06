import * as narrativePlot from '../scripts/narrative-plot.js';

window.onload = async () => {
    console.log(emotionalArcsData)
    let plot = narrativePlot.createNarrativePlot();
    for(let emotionalArcData of Object.values(emotionalArcsData)){
        console.log(emotionalArcData)
        narrativePlot.addLine(emotionalArcData,plot,0.4);
    }
}