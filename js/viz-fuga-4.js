function drawCirclePack(data, svgId) {

    const colorMujer = "#ea98ff";
    const colorHombre = "#7dea87";

    const width2 = 600;
    const height2 = 600;

    // Create a SVG container.
    const svg2 = d3.select(`#viz${svgId}`)
          .attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%;");

    data.forEach((bigCircle, idx) => {
        const radii = bigCircle.r;
        const padding = bigCircle.padding;

        svg2.append("circle")
            .attr("cx", bigCircle.x)
            .attr("cy", bigCircle.y)
            .attr("r", bigCircle.radius)
            .attr("fill", "#544059");

        const mujeres = d3.range(bigCircle.mujeres).map(() => ({
            color: colorMujer,
            sexo: 'mujer'
        }));
        const hombres = d3.range(bigCircle.hombres).map(() => ({
            color: colorHombre,
            sexo: 'hombre'
        }));
        const cand = d3.shuffle([...mujeres, ...hombres]);

        const circles = cand.map((d, i) => {
            const angle = Math.PI * (3 - Math.sqrt(5));
            const r = (radii + padding) * 1.2 * Math.sqrt(i + 1);
            const a = (i + 1) * angle;
            const x = r * Math.cos(a);
            const y = r * Math.sin(a);
            return {
                ...d,
                xc: bigCircle.x,
                yc: bigCircle.y,
                x: x,
                y: y,
            }
        })

        const g2 = svg2.append("g")

        g2.selectAll(`.small-circle-${idx}`)
            .data(circles)
            .join("circle")
                .attr("class", `.small-circle-${idx} small-circle`)
                .attr("cx", d => d.xc + d.x)
                .attr("cy", d => d.yc + d.y)
                .attr("r", radii)
                .attr("fill", d => d.color);

        })
}

const circles1 = [
    {
        'mujeres': 15,
        'hombres': 15,
        'radius': 300,
        'x': 300, 
        'y': 300,
        'r': 25,
        'padding': 10,
    }
]

drawCirclePack(circles1, "04-01");

const circles2 = [
    {
        'mujeres': 5,
        'hombres': 6,
        'radius': 100,
        'x': 150, 
        'y': 150,
        'r': 12,
        'padding': 5,
    },
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 400, 
        'y': 180,
        'r': 12,
        'padding': 5,
    },
    {
        'mujeres': 5,
        'hombres': 6,
        'radius': 100,
        'x': 400, 
        'y': 450,
        'r': 12,
        'padding': 5,
    },
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 150, 
        'y': 400,
        'r': 12,
        'padding': 5,
    }
]

drawCirclePack(circles2, "04-02");

const circles3 = [
    {
        'mujeres': 1,
        'hombres': 3,
        'radius': 60,
        'x': 300, 
        'y': 300,
        'r': 12,
        'padding': 5,
    }
]

drawCirclePack(circles3, "04-03");
