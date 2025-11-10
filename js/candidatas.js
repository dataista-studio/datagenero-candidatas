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

function transitionDropDots(index, divId) {
    if (index === getDivIndexInStep(divId)) {

        const dots = d3.select(`#${divId}`)
                .selectAll(".dot-provincia");

        const nDots = dots._groups[0].length;
        const radius = 19;
        const padding = 15;

        dots.filter(d => d >= nDots / 2)
            .attr("cx", d => (d - nDots / 2 + 1) * padding + (2 * (d - nDots / 2) + 1) * radius)
            .attr("cy", 2 * padding + 3 * radius)
            .style("opacity", 1)

        setTimeout(()  => {
            dots.filter(d => d >= nDots / 2)
                .transition().duration(1000)
                .attr("cx", d => [nDots - 1, nDots - 2].includes(d) 
                    ? (d - nDots / 2 + 1) * padding + (2 * (d - nDots / 2) + 1) * radius
                    : (d - nDots / 2 + 2) * padding + (2 * (d - nDots / 2 + 1) + 1) * radius)
                .attr("cy", d => [nDots - 1, nDots - 2].includes(d)
                    ? 2 * padding + 3 * radius + 100
                    : 2 * padding + 3 * radius
                )
                .style("opacity", d => [nDots - 1, nDots - 2].includes(d) ? 0 : 1)
        }, delay)
        
    }
}

function transitionMarimekko(index, divId) {
    if (index === getDivIndexInStep(divId)) {

        const rectFg = d3.select(`#${divId}`)
                .selectAll(".rect-fg")
        
        rectFg.attr("fill", "#A969C4")
            .attr("y", d => d.y0)
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
        
        rectFg.attr("fill", "#E492FF")
            .attr("y", d => d.y1)
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

function transitionSections(index, divId) {
    if (index === getDivIndexInStep(divId)) {
        const radius = 12;

        const smallCircles = d3.select(`#${divId}`)
                .selectAll(".small-circle")
        
        smallCircles.attr("cx", d => d.xc + d.x)
                .attr("cy", d => d.yc + d.y)
                .attr("r", radius)
                .style('opacity', 1);

        setTimeout(()  => {
            smallCircles.filter(d => d.sexo === 'mujer')
                .transition().duration(1000)
                .attr("cx", d => d.xc + d.x)
                .attr("cy", d => d.yc + d.y)
                .style("opacity", 0);

            smallCircles.filter(d => d.sexo === 'hombre')
                .transition().duration(1000)
                .attr("cx", (d, i) => i === 0 ? d.xc : d.xc + d.x)
                .attr("cy", (d, i) => i === 0 ? d.yc : d.yc + d.y)
                .attr("r", (d, i) => i === 0 ? 2 * radius : radius)
                .style("opacity", (_, i) => i === 0 ? 1 : 0);
        }, delay)
        
    }
}

function transitionReplacement(index, divId) {
    if (index === getDivIndexInStep(divId)) {
        const radius = 12;

        const va = d3.select(`#${divId}`)
                .selectAll(".va");

        const viene = d3.select(`#${divId}`)
                .selectAll(".viene");

        va.attr("cx", d => d.width / 2)
            .style("opacity", 1);

        viene.attr("cx", d => d.width / 2 + 200)
            .style("opacity", 0);

   
        setTimeout(()  => {
            va.transition().duration(1000)
                .attr("cx", d => d.width / 2 - 200)
                .style("opacity", 0);

            viene.transition().duration(1000)
                .attr("cx", d => d.width / 2)
                .style("opacity", 1);
        }, delay)
        
    }
}


scroller
    .setup({ step: ".step", offset: 0.8, debug: false })
    .onStepEnter(({ element }) => {
        const stepIndex = Number(element.dataset.step);

        steps.style("opacity", d => d === stepIndex ? 1 : 0)
            .classed("active", d => d === stepIndex);

        transitionDropDots(stepIndex, "ley-paridad");

        transitionMarimekko(stepIndex, "encabezamiento-hcdn");
        transitionMarimekko(stepIndex, "encabezamiento-hcs");
        transitionMarimekko(stepIndex, "encabezamiento-provincial");

        transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcdn");
        transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcs");
        transitionMarimekkoCompetitivo(stepIndex, "competitivas-provincial");

        transitionDumbbell(stepIndex, "distrito-secciones");
        transitionSections(stepIndex, "fuga-secciones");
        transitionReplacement(stepIndex, "reemplazos");

    })

window.addEventListener("resize", scroller.resize);