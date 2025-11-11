function drawReplacement(svgId, sexo) {

    const colorMujer = "#ea98ff";
    const colorHombre = "#7dea87";

    const nDots = 24;
    const radius = 40;
    const padding = 15;

    const width = d3.select(`#viz${svgId}`).node().parentNode.getBoundingClientRect().width;
    const height = 100;

    // Create a SVG container.
    const svg = d3.select(`#viz${svgId}`)
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; font: 10px sans-serif;");

    svg.selectAll(".va")
      .data([{ width: width }])
      .join("circle")
        .attr("class", "va")
        .attr("cx", d => d.width / 2)
        .attr("cy", d => height / 2)
        .attr("r", radius)
        .attr("fill", d => sexo === 'mujer' ? colorMujer : colorHombre)
        .style("opacity", 1);

    svg.selectAll(".cupo")
      .data([{ width: width }])
      .join("circle")
        .attr("class", "cupo")
        .attr("cx", d => d.width / 2)
        .attr("cy", d => height / 2)
        .attr("r", radius)
        .attr("fill", "transparent")
        .attr("stroke", d => sexo === 'mujer' ? colorMujer : colorHombre)
        .style("opacity", 1);

    svg.selectAll(".viene")
      .data([{ width: width }])
      .join("circle")
        .attr("class", "viene")
        .attr("cx", d => d.width / 2 + 200)
        .attr("cy", d => height / 2)
        .attr("r", radius)
        .attr("fill", d => sexo === 'mujer' ? colorMujer : colorHombre)
        .style("opacity", 0);

    
}