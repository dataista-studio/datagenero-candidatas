function drawDiagram(data, index) {
    const field = "jurisdicción"
    const jurisdicciones = Array.from(new Set(data.map(d => d[field])));
    const nJuri = jurisdicciones.length;

    const padding = 8;
    const radius = 22.5;

    const margin4 = ({ top: 40, right: 20, bottom: 10, left: 50 });

    const width4 = jurisdicciones.length / 2 * 65;
    const height4 = 600;

    // Create a SVG container.
    const svg4 = d3.select(`#viz02-${index < 10 ? `0${index}` : `${index}`}`)
          .attr("width", width4)
          .attr("height", height4)
          .attr("viewBox", [0, 0, width4, height4])
          .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    function drawRow(rowData, y0) {
      
      const chartWidth4 = width4 - margin4.left - margin4.right;
      const chartHeight4 = height4 / 2 - margin4.top - margin4.bottom;

      const g4 = svg4.append("g")
        .attr("transform", "translate(0, " + y0 + ")");

      const candWidth = (chartHeight4 * 2/3 - 4 * padding) / 2;

      const xScale4 = d3.scalePoint()
          .range([margin4.left, width4 - margin4.right])
          .domain(rowData)
          .padding(1);

      const listaRect = g4.selectAll(".lista")
        .data(["mayoria", "minoria"])
        .join("rect")
          .attr("class", "lista")
          .attr("y", d => d === 'mayoria' ? margin4.top - padding / 4 : margin4.top + chartHeight4 * 2/3 + padding / 2)
          .attr("x", margin4.left)
          .attr("height", d => d === "mayoria" ? chartHeight4 * 2/3 : chartHeight4 / 3 - padding)
          .attr("width", width4 - margin4.left - margin4.right)
          .style("fill", "white")
          .style('display', "block")
          .style("fill-opacity",d => d === "mayoria" ? 0.1 : 0.3) 

      const listaText = g4.selectAll(".nombre-lista")
        .data(["mayoria", "minoria"])
        .join("text")
          .attr("class", "nombre-lista")
          .attr("y", d => d === 'mayoria' 
            ? margin4.top + chartHeight4 * 2/3 * 1 / 2
            : margin4.top + chartHeight4 * 2/3 + chartHeight4 * 1/3 * 1 / 2
          )
          .attr("x", margin4.left / 2)
          .attr("text-anchor", "middle")
          .style("fill", 'white')
          .style("display", "block")
          .attr("transform", d => {
            const y = d === 'mayoria' 
              ? margin4.top + chartHeight4 * 2/3 * 1 / 2
              : margin4.top + chartHeight4 * 2/3 + chartHeight4 * 1/3 * 1 / 2;
            const x = margin4.left / 2;
            return "rotate(-90 " + x + " " + y + ")"
          })
          .text(d => d)

      const j = g4.selectAll(".juri")
        .data(rowData)
        .join("g")
          .attr("class", "juri")
          .attr("transform", d => `translate(${xScale4(d)}, 0)`);

      j.selectAll(".label")
        .data(d => [d])
        .join("text")
          .attr("text-anchor", "middle")
          .style("fill", 'white')
          .attr("x", xScale4.bandwidth() / 2)
          .attr("y", margin4.top / 2)
          .text(d => d)

      const candidatxs = j.selectAll(".cand")
        .data(d => data.filter(f => f[field] === d))
        .join('circle')
        .attr("class", "cand")
          .attr("cy", (d, i) => i === 0 ? margin4.top + padding / 2 + candWidth / 2 : 
            (i === 1 
              ? margin4.top + padding + candWidth + 2 * padding + candWidth / 2
              : margin4.top + chartHeight4 * 2/3 + padding + candWidth / 2)
          )
          .attr("cx", 0)
          .attr("r", radius)
          .style("fill", d => d.genero === '' ? 'none'
            : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
          )
          .style("stroke", 'white')
          .style('stroke-width', 1)
          .style("stroke-opacity", 1)
          .style("fill-opacity", 1)
          .style("display", "none");


      if (index === 2) {
          candidatxs.style('fill', 'none')
              .style("stroke", "white")
              .style("display", "block");
      } else if (index === 3) {
          candidatxs.style('fill', (d, i) => i < 2
              ? (d.genero === '' ? 'none'
                  : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
              )
              : 'none' )
            .style("stroke", (d, i) => i < 2
              ? (d.genero === '' ? 'white' : 'none')
              : 'white')
            .style("display", "block");
      } else if (index === 4) {
          candidatxs.style('fill', (d, i) => d.genero === '' 
              ? 'none'
              : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
            )
            .style("stroke", (d, i) => d.genero === '' 
              ? 'white'
              : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
            )
            .style("display", "block");
      } else if (index === 5) {
        candidatxs.style('fill', (d, i) => d.genero === '' 
              ? 'none'
              : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
            )
            .style("stroke", (d, i) => d.genero === '' 
              ? 'white'
              : (d.genero === "femenino" ? '#ea98ff' : '#7dea87')
            )
            .style("display", "block");
          listaRect.style("opacity", d => d === 'mayoria' ? 0.4 : 1);
          listaText.style("opacity", d => d === 'mayoria' ? 0.4 : 1);
          candidatxs.style('opacity', (d, i) => i < 2 ? 0.4 : 1 )
        }
    }

    drawRow(jurisdicciones.slice(0, nJuri / 2), 0);
    drawRow(jurisdicciones.slice(nJuri / 2, nJuri), height4 / 2);

    
}

Promise.all([
    d3.csv('./datos/f2-encabezamiento.csv'),
]).then((csv) => {
    const fe = csv[0];
    const indices = d3.range(2, 6);

    indices.forEach(idx => {
        drawDiagram(fe, idx);
    })

})
