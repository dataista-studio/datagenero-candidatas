function drawBeeswarm(data, svgId, color) {

    const labelWidth = 110;

    const margin3 = ({ top: 20, right: 20, bottom: 50, left: labelWidth + 20 });

    const width3 = d3.select(`#viz${svgId}`).node().parentNode.getBoundingClientRect().width;
    const height3 = 300;

    // Create a SVG container.
    const svg3 = d3.select(`#viz${svgId}`)
          .attr("id", "f5-resultados")
          .attr("width", width3)
          .attr("height", height3)
          .attr("viewBox", [0, 0, width3, height3])
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const g3 = svg3.append("g");

    const xd = 'porcentaje diputadas';
    const rd = "cantidad diputadas";
    const xs = 'porcentaje senadoras';
    const rs = "cantidad senadoras";
    const rMax = Math.max(
        d3.max(data, d => d[rd]),
        d3.max(data, d => d[rs])
    );

    const xScale3 = d3.scaleLinear()
        .range([margin3.left, width3 - margin3.right])
        .domain([0,100]);

    const rScale3 = d3.scaleSqrt()
      .range([2, 20])
      .domain([0, rMax])

    const beeswarmD = beeswarmForce()
      .x(d => xScale3(d[xd]))
      .r(d => rScale3(d[rd]));

    const beeswarmS = beeswarmForce()
      .x(d => xScale3(d[xs]))
      .r(d => rScale3(d[rs]));

    const dataD = beeswarmD
      .y(d => height3 / 3)
      (data);

    const dataS = beeswarmS
      .y(d => height3 * 2 / 3)
      (data);

    // svg3.append("g")
    //     .attr("transform", `translate(${margin3.left},0)`)
    //     .call(d3.axisLeft(yScale3).ticks(5))
        // .call((g) => g.select(".domain").remove())

    svg3.append("g")
        .attr("transform", `translate(0,${height3 - margin3.bottom})`)
        .call(d3.axisBottom(xScale3).ticks(5).tickFormat(d => `${d}%`))
        .call((g) => {
            g.select(".domain").remove();
            g.selectAll(".tick line")
                .attr("y2", -(height3 - margin3.top - margin3.bottom))
        });

    svg3.append("text")
        .attr("class", "annotation")
        .attr("x", margin3.left + (width3 - margin3.left - margin3.right) / 2)
        .attr("y", height3 - 6)
        .attr("text-anchor", "middle")
        .text("Porcentaje de mujeres")

    svg3.selectAll(".diputados")
      .data(dataD)
      .join("circle")
        .attr("class", "diputados")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", color);

    svg3.selectAll(".nacional-label-bg")
      .data(["Diputados"])
      .join("rect")
        .attr("class", "nacional-label-bg")
        .attr("x", 0)
        .attr("y", height3 / 3 - 14)
        .attr('width', labelWidth)
        .attr("height", 28)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", color)

    svg3.selectAll(".nacional-label")
      .data(["Diputados"])
      .join("text")
        .attr("class", "nacional-label")
        .attr("x", labelWidth/2)
        .attr("y", height3 / 3 + 6)
        .attr("text-anchor", "middle")
        .text(d => d)

    svg3.selectAll(".senadores")
      .data(dataS)
      .join("circle")
        .attr("class", "senadores")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", color);

    svg3.selectAll(".provincial-label-bg")
      .data(["Diputados"])
      .join("rect")
        .attr("class", "provincial-label-bg")
        .attr("x", 0)
        .attr("y", height3 * 2 / 3 - 14)
        .attr('width', labelWidth)
        .attr("height", 28)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", color)

    svg3.selectAll(".provincial-label")
      .data(["Senadores"])
      .join("text")
        .attr("class", "provincial-label")
        .attr("x", labelWidth/2)
        .attr("y", height3 * 2 / 3 + 6)
        .attr("text-anchor", "middle")
        .text(d => d);

}