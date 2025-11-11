function drawMarimekko(data, svgId) {
    const margin1 = ({ top: 40, right: 20, bottom: 40, left: 40 });

    const width1 = 800 + margin1.left + margin1.right;
    const height1 = 400;

    // Create a SVG container.
    const svg1 = d3.select(`#viz${svgId}`)
        .attr("width", width1)
        .attr("height", height1)
        .attr("viewBox", [0, 0, width1, height1])
        .attr("style", "max-width: 100%; font: 10px sans-serif;");

    const g1 = svg1.append("g");

    const xSum = d3.sum(data, d => d['listas']);

    const xScale1 = d3.scaleLinear()
        .range([0, width1 - margin1.right - margin1.left])
        .domain([0, xSum]);

    const yScale1 = d3.scaleLinear()
        .range([height1 - margin1.bottom, margin1.top])
        .domain([0,1]);

    const yAxis = svg1.append("g")
        .attr("transform", `translate(${margin1.left},0)`)
        .call(d3.axisLeft(yScale1).ticks(5).tickFormat(d => `${(d * 100).toFixed(0)}%`))
        .call((g) => g.select(".domain").remove());

    yAxis.append("text")
        .attr("class", "annotation")
        .attr("x", -margin1.left)
        .attr("y", margin1.top / 2)
        .attr("fill", "#FFF")
        .attr("text-anchor", 'start')
        .text("Porcentaje de listas")

    svg1.append("g")
        .attr("transform", `translate(${margin1.left}, ${height1 - margin1.bottom})`)
        .append("text")
        .attr("class", "annotation")
        .attr("x", (width1 - margin1.left - margin1.right) / 2)
        .attr("y", margin1.bottom / 2)
        .attr("fill", "#FFF")
        .attr("text-anchor", 'middle')
        .text("Jurisdicciones")

    const rectBg = g1.selectAll(".rect-bg")
        .data(data)
        .join("rect")
            .attr("class", "rect-bg")
            .attr("x", d => margin1.left + xScale1(d.cumsum))
            .attr("y", yScale1(1))
            .attr("height", height1 - margin1.bottom - yScale1(1))
            .attr("width", d => xScale1(d['listas']))
            .attr("fill", "#442D54")
            // .attr("fill", d => color(d['number_of_day']))
            .attr('fill-opacity', 1)
            .attr("stroke", '#382541')
            .attr("stroke-width", 0.5);

    const rectMg = g1.selectAll(".rect-mg")
        .data(data)
        .join("rect")
            .attr("class", "rect-mg")
            .attr("x", d => margin1.left + xScale1(d.cumsum))
            .attr("y", d => yScale1(d['% mujeres']))
            .attr("height", d => height1 - margin1.bottom - yScale1(d['% mujeres']))
            .attr("width", d => xScale1(d['listas']))
            .attr("fill", "#A969C4")
            // .attr("fill", d => color(d['number_of_day']))
            .attr('fill-opacity', 1)
            .attr("stroke", '#382541')
            .attr("stroke-width", 0.5);
    

    const rectFg = g1.selectAll(".rect-fg")
        .data(data)
        .join("rect")
            .attr("class", "rect-fg");
    
    rectFg.each(rect => {
        rect.y0 = yScale1(1);
        rect.y1 = yScale1(rect['% mujeres']);
        rect.y2 = yScale1(rect['% comp mujeres']);
        rect.h0 = height1 - margin1.bottom - rect.y0;
        rect.h1 = height1 - margin1.bottom - rect.y1;
        rect.h2 = height1 - margin1.bottom - rect.y2;
    })

    rectFg.attr("x", d => margin1.left + xScale1(d.cumsum))
        .attr("width", d => xScale1(d['listas']))
        .attr("fill", "#E492FF")
        .attr('fill-opacity', 1)
        .attr("stroke", '#382541')
        .attr("stroke-width", 0.5);

}