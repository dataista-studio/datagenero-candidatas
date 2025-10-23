const scroller = scrollama();
const wrapper = document.querySelector(".wrapper");

const nSteps = 30;
const intSteps = d3.range(0, nSteps);

const steps = d3.selectAll(".step-display")
    .data(intSteps);

d3.select("#scrolly-steps")
    .selectAll(".step")
    .data(intSteps)
        .join("div")
        .attr("class", "step")
        .attr("data-step", (_, i) => `${i}`)

scroller
    .setup({ step: ".step", offset: 0.8, debug: false })
    .onStepEnter(({ element }) => {
        const stepIndex = Number(element.dataset.step);

        steps.style("opacity", d => d === stepIndex ? 1 : 0)
            .classed("active", d => d === stepIndex)

        // transitionMarimekko(stepIndex, "encabezamiento-hcdn");
        // transitionMarimekko(stepIndex, "encabezamiento-hcs");
        // transitionMarimekko(stepIndex, "encabezamiento-provincial");

        // transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcdn");
        // transitionMarimekkoCompetitivo(stepIndex, "competitivas-hcs");
        // transitionMarimekkoCompetitivo(stepIndex, "competitivas-provincial");

    })

window.addEventListener("resize", scroller.resize);