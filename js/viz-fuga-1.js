function drawDots(svgId) {

    const nDots = 24;
    const radius = 19;
    const padding = 15;

    const width = radius * 2 * nDots / 2 + padding * (nDots / 2 + 2);
    const height = 3 * padding + 2 * radius * 2 + 100;

    // Create a SVG container.
    const svg = d3.select(`#viz${svgId}`)
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; font: 10px sans-serif;");

    svg.selectAll(".dot-provincia")
      .data(d3.range(nDots))
      .join("circle")
        .attr("class", "dot-provincia")
        .attr("cx", d => d < nDots / 2
          ? (d + 1) * padding + (2 * d + 1) * radius
          : (d - nDots / 2 + 1) * padding + (2 * (d - nDots / 2) + 1) * radius
        )
        .attr("cy", d => d < nDots / 2 ? padding + radius : 2 * padding + 3 * radius)
        .attr("r", radius)
        .attr("fill", d => [nDots - 1, nDots - 2].includes(d) ? "#b0b0b0" : "#ea98ff")

    
}