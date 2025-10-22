const scroller = scrollama();
const wrapper = document.querySelector(".wrapper");

const allSteps = d3.selectAll(".step-display");

const nSteps = allSteps._groups[0].length;
const intSteps = d3.range(0, nSteps);

const steps = allSteps.data(intSteps);

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

const delay = 500;

function transitionMarimekko(index, divId) {
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

function transitionDumbbell(index, divId) {
    const circleRadius = 5;
    const dt = 1000;

    if (index === getDivIndexInStep(divId)) {

        const lineas = d3.select(`#${divId}`)
            .selectAll(".linea");

        const unicos = d3.select(`#${divId}`)
            .selectAll(".unico");

        const secciones = d3.select(`#${divId}`)
            .selectAll(".seccion");

        lineas.attr("x1", d => d.x1)
            .attr("x2", d => d.x1);

        unicos.attr("r", 0);
        secciones.attr("r", 0)


        setTimeout(()  => {
            unicos.transition().duration(dt)
                .attr("r", circleRadius);
        }, delay);

        setTimeout(()  => {
            lineas.transition().duration(dt)
                .attr("x2", d => d.x2);
        }, 2*delay);

        setTimeout(()  => {
            secciones.transition().duration(dt)
                .attr("r", circleRadius);
        }, 3*delay);


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

        transitionDumbbell(stepIndex, "distrito-secciones")

    })

window.addEventListener("resize", scroller.resize);