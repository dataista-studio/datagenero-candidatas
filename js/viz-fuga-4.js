function drawCirclePack(data, svgId) {

    const colorMujer = "#ea98ff";
    const colorHombre = "#7dea87";

    const svg2 = d3.select(`#viz${svgId}`);

    const mobile =  window.innerWidth < 768;

    const width = svg2.node().parentNode.getBoundingClientRect().width;
    const height = svg2.node().parentNode.getBoundingClientRect().height;
    const length = Math.min(width, height);

    const width2 = mobile ? length : 2 * length;
    const height2 = mobile ? length : 2 * length;

    const transform = (pos) => {
        return pos / 400 * width2;
    }

    // Create a SVG container.
    svg2.attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%;");

    data.forEach((bigCircle, idx) => {
        const radii = transform(bigCircle.r);
        const padding = transform(bigCircle.padding);

        svg2.append("circle")
            .attr("cx", transform(bigCircle.x))
            .attr("cy", transform(bigCircle.y))
            .attr("r", transform(bigCircle.radius))
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
                xc: transform(bigCircle.x),
                yc: transform(bigCircle.y),
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
