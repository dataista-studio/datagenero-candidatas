const scroller = scrollama();
const wrapper = document.querySelector(".wrapper");

const nSteps = 20;
const intSteps = d3.range(0, nSteps);

const steps = d3.selectAll(".step-display")
    .data(intSteps);

d3.select("#scrolly-steps")
    .selectAll(".step")
    .data(intSteps)
        .join("div")
        .attr("class", "step")
        .attr("data-step", (_, i) => `${i}`)

const getDivIndexInStep = (divId) => {
    let idx = -1
    steps._groups[0].forEach((d, i) => {
        if (d.id === divId) idx = i
    })

    return idx;
}

function transitionMarimekko(index, divId) {
    const delay = 500;

    if (index === getDivIndexInStep(divId)) {

        const rectFg = d3.select(`#${divId}`)
                .selectAll(".rect-fg")
        
        rectFg.attr("y", d => d.y0)
                .attr("height", d => d.h0);

        setTimeout(()  => {
            rectFg.transition().duration(1000)
                .attr("y", d => d.y1)
                .attr("height", d => d.h1);
        }, delay)
        
    }
}

function transitionMarimekkoCompetitivo(index, divId) {
    const delay = 500;

    if (index === getDivIndexInStep(divId)) {

        const rectFg = d3.select(`#${divId}`)
                .selectAll(".rect-fg")
        
        rectFg.attr("y", d => d.y1)
                .attr("height", d => d.h1);

        setTimeout(()  => {
            rectFg.transition().duration(1000)
                .attr("y", d => d.y2)
                .attr("height", d => d.h2);
        }, delay)
        
    }
}

scroller
    .setup({ step: ".step", offset: 0.8, debug: false })
    .onStepEnter(({ element }) => {
        const stepIndex = Number(element.dataset.step);

        steps.style("opacity", d => d === stepIndex ? 1 : 0)
            .classed("active", d => d === stepIndex);

        transitionMarimekko(stepIndex, "encabezamiento-hcdn");
        transitionMarimekko(stepIndex, "encabezamiento-hcs");
        transitionMarimekko(stepIndex, "encabezamiento-provincial");

        transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcdn");
        transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcs");
        transitionMarimekkoCompetitivo(stepIndex, "competitivas-provincial");

    })

window.addEventListener("resize", scroller.resize);