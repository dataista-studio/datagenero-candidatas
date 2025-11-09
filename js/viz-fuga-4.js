function drawCirclePack(data, svgId) {

    const colorMujer = "#7dea87";
    const colorHombre = "#ea98ff";

    const width2 = 600;
    const height2 = 600;

    // Create a SVG container.
    const svg2 = d3.select(`#viz${svgId}`)
          .attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%;");

    data.forEach((bigCircle, idx) => {
        const radii = bigCircle.radius / 12;
        const padding = 10;

        svg2.append("circle")
            .attr("cx", bigCircle.x)
            .attr("cy", bigCircle.y)
            .attr("r", bigCircle.radius)
            .attr("fill", "#544059");

        const mujeres = d3.range(bigCircle.mujeres).map(() => ({ color: colorMujer}));
        const hombres = d3.range(bigCircle.hombres).map(() => ({ color: colorHombre}));
        const cand = d3.shuffle([...mujeres, ...hombres]);

        const circles = cand.map((d, i) => {
            const angle = Math.PI * (3 - Math.sqrt(5));
            const r = (radii + padding) * 1.2 * Math.sqrt(i + 1);
            const a = (i + 1) * angle;
            const x = r * Math.cos(a);
            const y = r * Math.sin(a);
            return {
                x: x,
                y: y,
                color: d.color
            }
        })

        const g2 = svg2.append("g")

        g2.selectAll(`.small-circle-${idx}`)
            .data(circles)
            .join("circle")
                .attr("class", `.small-circle-${idx}`)
                .attr("cx", d => width2 / 2 + d.x)
                .attr("cy", d => height2 / 2 + d.y)
                .attr("r", radii)
                .attr("fill", d => d.color);
        })
}

const circles = [
    {
        'mujeres': 15,
        'hombres': 15,
        'radius': 300,
        'x': 300, 
        'y': 300,
    }
]

drawCirclePack(circles, "04-01");
