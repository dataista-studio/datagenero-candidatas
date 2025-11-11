function drawDiagram(data, index) {

    const toCamelCase = (word) => {
      if (word === 'del') return word;

      return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }

    const splitText = (name) => {
      if (name === 'catamarca') {
        return ['Cata-', 'marca'];
      } else if (name === 'cordoba') {
        return ['Córdoba'];
      } else if (name === 'corrientes') {
        return ['Corrien-', 'tes'];
      } else if (name === 'misiones') {
        return ['Misio-', 'tns'];
      } else if (name === 'santiago del estero') {
        return ['Stgo.', 'del', 'Estero'];
      } else if (name === 'tucuman') {
        return ['Tucu-', 'mán'];
      } else if (name === 'ciudad de buenos aires') {
        return ['CABA']
      } else if (name.split(" ").length === 1) {
        return [toCamelCase(name)];
      } else {
        return name.split(" ").map(d => toCamelCase(d))
      }
    }

    const field = "jurisdicción";
    const jurisdicciones = Array.from(new Set(data.map(d => d[field])));
    const nJuri = jurisdicciones.length;

    const radius = 22.5;

    const margin4 = ({ top: 80, right: 20, bottom: 10, left: 30 });

    const width4 = jurisdicciones.length / 2 * 75;
    const height4 = 600;
    const padding = (height4 / 2 - margin4.top - margin4.bottom - 6 * radius) / 6;

    // Create a SVG container.
    const svg4 = d3.select(`#viz02-${index < 10 ? `0${index}` : `${index}`}`)
          .attr("width", width4)
          .attr("height", height4)
          .attr("viewBox", [0, 0, width4, height4])
          .attr("style", "max-width: 100%; font: 10px sans-serif;");

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
          .attr("y", d => d === 'mayoria' ? margin4.top : margin4.top + 4 * padding + 4 * radius)
          .attr("x", margin4.left)
          .attr("height", d => d === "mayoria" ? 3 * padding + 4 * radius : 2 * padding + 2 * radius)
          .attr("width", width4 - margin4.left - margin4.right)
          .style("fill", d => d === "mayoria" ? "#48394C" : "#625267")
          .style('display', "block");

      const listaLine = g4.selectAll(".lista-line")
        .data(["mayoria", "minoria"])
        .join("rect")
          .attr("class", "lista-line")
          .attr("y", d => d === 'mayoria' ? margin4.top : margin4.top + 4 * padding + 4 * radius)
          .attr("x", margin4.left)
          .attr("height", d => d === "mayoria" ? 3 * padding + 4 * radius : 2 * padding + 2 * radius)
          .attr("width", 10)
          .style("fill", d => d === "mayoria" ? "#A591AA" : "#F8E1FF")
          .style('display', "block")

      const listaText = g4.selectAll(".nombre-lista")
        .data(["mayoría", "minoría"])
        .join("text")
          .attr("class", "nombre-lista annotation")
          .attr("y", d => d === 'mayoría' 
            ? margin4.top + (3 * padding + 4 * radius) * 1 / 2
            : margin4.top + 4 * padding + 4 * radius + (2 * padding + 2 * radius ) * 1 / 2
          )
          .attr("x", margin4.left / 2)
          .attr("text-anchor", "middle")
          .style("fill", 'white')
          .style("display", "block")
          .style("border-left", "100px solid white")
          .style("text-transform", "uppercase")
          .attr("transform", d => {
            const y = d === 'mayoría' 
              ? margin4.top + (3 * padding + 4 * radius) * 1 / 2
              : margin4.top + 4 * padding + 4 * radius + (2 * padding + 2 * radius ) * 1 / 2
            const x = margin4.left / 2;
            return "rotate(-90 " + x + " " + y + ")"
          })
          .text(d => d)

      const j = g4.selectAll(".juri")
        .data(rowData)
        .join("g")
          .attr("class", "juri")
          .attr("transform", d => `translate(${xScale4(d)}, 0)`);

      const juriName = j.selectAll(".label")
        .data(d => [d])
        .join("text")
          .attr("class", "label annotation")
          .attr("text-anchor", "middle")
          .style("fill", 'white')
          .attr("x", xScale4.bandwidth() / 2)
          .attr("y", margin4.top / 2)
        
      juriName.selectAll("tspan")
          .data(d => splitText(d))
          .join("tspan")
            .attr("x", xScale4.bandwidth() / 2)
            .attr("dy", (d,i) => i === 0 ? "0" : "16px")
            .text(d => d)

      const candidatxs = j.selectAll(".cand")
        .data(d => data.filter(f => f[field] === d))
        .join('circle')
        .attr("class", "cand")
          .attr("cy", (d, i) => i === 0 ? margin4.top + padding + radius : 
            (i === 1 
              ? margin4.top + 2 * padding + 3 * radius
              : margin4.top + 5 * padding + 5 * radius)
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


