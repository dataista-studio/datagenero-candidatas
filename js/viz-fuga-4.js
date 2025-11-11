function drawCirclePack(data, svgId) {

    const colorMujer = "#ea98ff";
    const colorHombre = "#7dea87";

    const width2 = 400;
    const height2 = 400;

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
