const pymChild = new pym.Child();

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

drawDots("01-02");
drawDots("01-03");

const circles1 = [
    {
        'mujeres': 15,
        'hombres': 15,
        'radius': 200,
        'x': 200, 
        'y': 200,
        'r': 15,
        'padding': 8,
    }
]

drawCirclePack(circles1, "04-01");

const circles2 = [
    {
        'mujeres': 5,
        'hombres': 6,
        'radius': 80,
        'x': 100, 
        'y': 100,
        'r': 10,
        'padding': 5,
    },
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 300, 
        'y': 120,
        'r': 10,
        'padding': 5,
    },
    {
        'mujeres': 5,
        'hombres': 6,
        'radius': 80,
        'x': 250, 
        'y': 300,
        'r': 10,
        'padding': 5,
    },
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 90, 
        'y': 260,
        'r': 10,
        'padding': 5,
    }
]

drawCirclePack(circles2, "04-02");

const circles3 = [
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 200, 
        'y': 200,
        'r': 12,
        'padding': 5,
    }
]

drawCirclePack(circles3, "04-03");

drawReplacement("06-01", 'hombre')
drawReplacement("06-02", 'mujer')

Promise.all([
    d3.csv('./datos/f2-encabezamiento.csv'),
    d3.csv('./datos/f4-provincias-mixtas.csv'),
    d3.csv('./datos/f5-nacional.csv'),
    d3.csv('./datos/f5-provincial.csv'),
    d3.csv('./datos/f2f3-nacional-hcdn.csv'),
    d3.csv('./datos/f2f3-nacional-hcs.csv'),
    d3.csv('./datos/f2f3-provincial.csv'),
]).then((csv) => {
    const fe = csv[0];
    const indices = d3.range(2, 5);

    indices.forEach(idx => {
        drawDiagram(fe, idx);
    });

    const f4 = csv[1];

    f4.forEach(d => {
      d["distrito unico mujeres"] = + d["distrito unico mujeres"];
      d["distrito unico total"] = + d["distrito unico total"];
      d["distrito unico mujeres porcentaje"] = + d["distrito unico mujeres porcentaje"];
      d["secciones mujeres"] = + d["secciones mujeres"];
      d["secciones total"] = + d["secciones total"];
      d["secciones mujeres porcentaje"] = + d["secciones mujeres porcentaje"];
    })

    const sortBy = "secciones mujeres porcentaje";

    const data4 = f4.sort((a, b) => b[sortBy] - a[sortBy])

    drawDumbbell(data4, "04-08");

    function processData5(rawData) {
        rawData.forEach(d => {
            d["diputadxs"] = +d["diputadxs"];
            d["cantidad diputadas"] = +d["cantidad diputadas"];
            d["cantidad diputados"] = d["diputadxs"] - d["cantidad diputadas"];
            d["porcentaje diputadas"] = +d["porcentaje diputadas"];
            d["senadorxs"] = +d["senadorxs"];
            d["cantidad senadoras"] = +d["cantidad senadoras"];
            d["porcentaje senadoras"] = +d["porcentaje senadoras"];
        });

        return rawData;
    }
    const f5 = csv[2];
    const f5p = csv[3];

    const data5 = processData5(f5);
    const data5p = processData5(f5p);
    console.log(data5)

    drawBeeswarm(data5, "05-01", "#BC88FF");
    drawBeeswarm(data5p, "05-02", "#76FF89");

    function processData2(rawData) {
        rawData.forEach((d, i) => {
            d["listas"] = +d["listas"];
            d["listas encabezadas por mujeres"] = +d["listas encabezadas por mujeres"];
            d["listas competitivas encabezadas por mujeres"] = +d["listas competitivas encabezadas por mujeres"];
            d['% mujeres'] = +(d["listas encabezadas por mujeres"] / d["listas"]).toFixed(2);
            d['% comp mujeres'] = +(d["listas competitivas encabezadas por mujeres"] / d["listas"]).toFixed(2);
        });

        const processedData = rawData.sort((a,b) => b['% comp mujeres'] - a['% comp mujeres']);
        processedData.forEach((d, i) => {
            d.cumsum = d3.sum(rawData.slice(0, i), d => d['listas']);
        });

        return processedData;
    }
    const f2d = csv[4];
    const f2s = csv[5];
    const f2p = csv[6];

    const data2d = processData2(f2d);
    const data2s = processData2(f2s);
    const data2p = processData2(f2p);

    drawMarimekko(data2d, '02-07');
    drawMarimekko(data2s, '02-08');
    drawMarimekko(data2p, '02-10');

    drawMarimekko(data2d, '03-03');
    drawMarimekko(data2s, '03-04');
    drawMarimekko(data2p, '03-05');

    updateHeight();
})

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

updateHeight();

function updateHeight() {
    // const h = d3.select("#scrolly-steps").node().getBoundingClientRect().height;
    // const vh = d3.select(".wrapper").node().getBoundingClientRect().height;
  
    // d3.select("body").style("height", `${900}px`);
  
    // pymChild.sendHeight();
}