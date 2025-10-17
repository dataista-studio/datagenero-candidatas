const scroller = scrollama();
const steps = [
    document.querySelector(".step1-elements"),
    document.querySelector(".step2-elements"),
    document.querySelector(".step3-elements"),
    document.querySelector(".step4-elements"),
    document.querySelector(".step5-elements"),
    document.querySelector(".step6-elements"),
    document.querySelector(".step7-elements"),
    document.querySelector(".step8-elements"),
    document.querySelector(".step9-elements")
];
const wrapper = document.querySelector(".wrapper");

const bgColors = ["black", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729", "#261729"];

scroller
    .setup({ step: ".step", offset: 0.8, debug: false })
    .onStepEnter(({ element }) => {
        const stepIndex = Number(element.dataset.step) - 1;

        steps.forEach((el, i) => {
            if (!el) return;
            if (i === 0) {

                el.style.opacity = i === stepIndex ? "1" : "0";
            } else {
                el.classList.toggle("active", i === stepIndex);
            }
        });

        wrapper.style.backgroundColor = bgColors[stepIndex] || "black";
    })
    .onStepExit(({ element, direction }) => {
        const stepIndex = Number(element.dataset.step) - 1;

        if (direction === "up") {
            steps.forEach((el, i) => {
                if (!el) return;
                if (i === 0) {
                    el.style.opacity = i === stepIndex - 1 ? "1" : "0";
                } else {
                    el.classList.toggle("active", i === stepIndex - 1);
                }
            });

            wrapper.style.backgroundColor =
                bgColors[stepIndex - 1] || "black";
        }
    });

window.addEventListener("resize", scroller.resize);