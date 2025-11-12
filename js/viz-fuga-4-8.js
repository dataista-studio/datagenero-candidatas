const toCamelCase = (word) => {
  if (word === 'del') return word;

  return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

const fixName = (name) => {
      if (name === 'cordoba') {
    return 'Córdoba';
  } else if (name === 'santa cruz') {
    return 'Santa Cruz';
  } else if (name === 'san juan') {
    return "San Juan";
  } else if (name === 'rio negro') {
    return "Río Negro";
  } else {
    return name.split(" ").map(d => toCamelCase(d))
  }
}

function drawDumbbell(data, svgId) {

    const mobile =  window.innerWidth < 768;
    
    const margin2 = ({ top: 10, right: 40, bottom: 60, left: mobile ? 80 : 120 });

    const width2 = d3.select(`#viz${svgId}`).node().parentNode.getBoundingClientRect().width;
    const height2 = mobile ?  width2 / 2 : width2 / 3;

    const yValues = data.map(d => d.jurisdiccion)

    // Create a SVG container.
    const svg2 = d3.select(`#viz${svgId}`)
          .attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%; font: 10px sans-serif; background-color: white");

    const g2 = svg2.append("g");

    const xScale2 = d3.scaleLinear()
        .range([margin2.left, width2 - margin2.right])
        .domain([0, 1]);

    const yScale2 = d3.scalePoint()
        .range([height2 - margin2.bottom, margin2.top])
        .domain(yValues)
        .padding(1);

    svg2.append("g")
        .attr("transform", `translate(${margin2.left},0)`)
        .call(d3.axisLeft(yScale2).ticks(5).tickFormat(fixName))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line").remove();
        })

    svg2.append("g")
      .attr("transform", `translate(0, ${height2 - margin2.bottom})`)
      .call(d3.axisBottom(xScale2).ticks(5).tickFormat(d => `${(d * 100).toFixed(0)}%`))
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll(".tick line")
          .attr("y2", d => d === 0 ? -6 : -(height2 - margin2.top - margin2.bottom))
          .attr("stroke", "#d2d2d2")
      });

    svg2.append("text")
        .attr("class", "annotation")
        .attr("x", margin2.left + (width2 - margin2.left - margin2.right) / 2)
        .attr("y", height2 - 12)
        .attr("text-anchor", "middle")
        .text("Porcentaje de mujeres")

    const circleRadius = 5;
    const colorUnico = '#EA98FF';
    const colorSeccion = '#8A40FF';

    data.forEach(d => {
      d.x1 = xScale2(d["distrito unico mujeres porcentaje"]);
      d.x2 = xScale2(d["secciones mujeres porcentaje"]);
      d.y = yScale2(d["jurisdiccion"]);
    });

    const lineas = svg2.selectAll(".linea")
      .data(data)
      .join("line")
        .attr("class", "linea")
        .attr("x1", d => d.x1)
        .attr("y1", d => d.y + 0.01)
        .attr("x2", d => d.x1)
        .attr("y2", d => d.y - 0.01)
        .style("stroke", "url(#gradient)")
        .style("stroke-width", 1.5)

    const unicos = svg2.selectAll(".unico")
      .data(data)
      .join("circle")
        .attr("class", "unico")
        .attr("cx", d => d.x1)
        .attr("cy", d => d.y)
        .attr("r", 0)
        .attr("fill", colorUnico);

    const secciones = svg2.selectAll(".seccion")
      .data(data)
      .join("circle")
        .attr("class", "seccion")
        .attr("cx", d => d.x2)
        .attr("cy", d => d.y)
        .attr("r", 0)
        .attr("fill", colorSeccion);
    
}
