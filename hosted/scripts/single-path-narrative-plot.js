import * as narrativePlot from '../scripts/narrative-plot.js';

window.onload = async () => {
    console.log(emotionalArcData)
    let plot = narrativePlot.createNarrativePlot();
    narrativePlot.addLine(emotionalArcData,plot);
}