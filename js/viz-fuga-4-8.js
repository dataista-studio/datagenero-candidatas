function drawDumbbell(data, svgId) {
  console.log(data)
    
    const margin2 = ({ top: 20, right: 20, bottom: 40, left: 80 });

    const width2 = 600;
    const height2 = 140;

    const yValues = data.map(d => d.jurisdiccion)

    // Create a SVG container.
    const svg2 = d3.select(`#viz${svgId}`)
          .attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; background-color: white");

    const g2 = svg2.append("g");

    const xScale2 = d3.scaleLinear()
        .range([margin2.left, width2 - margin2.right])
        .domain([0, 1]);

    const yScale2 = d3.scalePoint()
        .range([height2 - margin2.bottom, margin2.top])
        .domain(yValues);

    svg2.append("g")
        .attr("transform", `translate(${margin2.left},0)`)
        .call(d3.axisLeft(yScale2).ticks(5))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line").remove();
        })

    svg2.append("g")
      .attr("transform", `translate(0, ${height2 - margin2.bottom + 20})`)
      .call(d3.axisBottom(xScale2).ticks(5))
      .call((g) => {
        g.select(".domain").remove();
      });

    const circleRadius = 5;
    const colorUnico = 'orange';
    const colorSeccion = 'steelblue';

    const lineas = svg2.selectAll(".linea")
      .data(data)
      .join("line")
        .attr("class", "linea")
        .attr("x1", d => xScale2(d["distrito unico mujeres porcentaje"]))
        .attr("y1", d => yScale2(d["jurisdiccion"]))
        .attr("x2", d => xScale2(d["distrito unico mujeres porcentaje"]))
        .attr("y2", d => yScale2(d["jurisdiccion"]))
        .attr("stroke", "darkgrey")
        .attr("stroke-width", 1.5)

    const unicos = svg2.selectAll(".unico")
      .data(data)
      .join("circle")
        .attr("class", "unico")
        .attr("cx", d => xScale2(d["distrito unico mujeres porcentaje"]))
        .attr("cy", d => yScale2(d["jurisdiccion"]))
        .attr("r", 0)
        .attr("fill", colorUnico);

    const secciones = svg2.selectAll(".seccion")
      .data(data)
      .join("circle")
        .attr("class", "seccion")
        .attr("cx", d => xScale2(d["secciones mujeres porcentaje"]))
        .attr("cy", d => yScale2(d["jurisdiccion"]))
        .attr("r", 0)
        .attr("fill", colorSeccion);
    
}

Promise.all([
    d3.csv('./datos/f4-provincias-mixtas.csv'),
]).then((csv) => {
    const f4 = csv[0];

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
})
