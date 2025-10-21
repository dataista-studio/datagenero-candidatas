const scroller = scrollama();
const wrapper = document.querySelector(".wrapper");

const nSteps = 9;
const intSteps = d3.range(0, nSteps);

const steps = d3.selectAll(".step-display")
    .data(intSteps);

d3.select("#scrolly-steps")
    .selectAll(".step")
    .data(intSteps)
        .join("div")
        .attr("class", "step")
        .attr("data-step", (_, i) => `${i}`)

const bgColors = ["black", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729"];

scroller
    .setup({ step: ".step", offset: 0.8, debug: false })
    .onStepEnter(({ element }) => {
        const stepIndex = Number(element.dataset.step);

        steps.style("opacity", d => d === stepIndex ? 1 : 0)
            .classed("active", d => d === stepIndex)

        wrapper.style.backgroundColor = bgColors[stepIndex] || "black";
    })
    // .onStepExit(({ element, direction }) => {
    //     const stepIndex = Number(element.dataset.step);

    //     if (direction === "up") {
    //         steps.forEach((el, i) => {
    //             if (!el) return;
    //             if (i === 0) {
    //                 el.style.opacity = i === stepIndex - 1 ? "1" : "0";
    //             } else {
    //                 el.classed("active", i === stepIndex - 1);
    //             }
    //         });

    //         wrapper.style.backgroundColor =
    //             bgColors[stepIndex - 1] || "black";
    //     }
    // });

window.addEventListener("resize", scroller.resize);