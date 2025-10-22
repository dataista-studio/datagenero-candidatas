function drawMarimekko(data, svgId) {
    const margin1 = ({ top: 10, right: 20, bottom: 10, left: 40 });

    const width1 = 800 + margin1.left + margin1.right;
    const height1 = 400;

    // Create a SVG container.
    const svg1 = d3.select(`#viz${svgId}`)
        .attr("width", width1)
        .attr("height", height1)
        .attr("viewBox", [0, 0, width1, height1])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const g1 = svg1.append("g");

    const xSum = d3.sum(data, d => d['listas']);

    const xScale1 = d3.scaleLinear()
        .range([0, width1 - margin1.right - margin1.left])
        .domain([0, xSum]);

    const yScale1 = d3.scaleLinear()
        .range([height1 - margin1.bottom, margin1.top])
        .domain([0,1]);

    svg1.append("g")
        .attr("transform", `translate(${margin1.left},0)`)
        .call(d3.axisLeft(yScale1).ticks(5))
        .call((g) => g.select(".domain").remove())

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

Promise.all([
    d3.csv('./datos/f2f3-nacional-hcdn.csv'),
    d3.csv('./datos/f2f3-nacional-hcs.csv'),
    d3.csv('./datos/f2f3-provincial.csv'),
]).then((csv) => {

    function processData(rawData) {
        rawData.forEach((d, i) => {
            d["listas"] = +d["listas"];
            d["listas encabezadas por mujeres"] = +d["listas encabezadas por mujeres"];
            d["listas competitivas encabezadas por mujeres"] = +d["listas competitivas encabezadas por mujeres"];
            d['% mujeres'] = +(d["listas encabezadas por mujeres"] / d["listas"]).toFixed(2);
            d['% comp mujeres'] = +(d["listas competitivas encabezadas por mujeres"] / d["listas"]).toFixed(2);
        });

        const processedData = rawData.sort((a,b) => b['% comp mujeres'] - a['% comp mujeres']);
        processedData.forEach((d, i) => {
            d.cumsum = d3.sum(rawData.slice(0, i), d => d['listas']);
        });

        return processedData;
    }
    const f2d = csv[0];
    const f2s = csv[1];
    const f2p = csv[2];

    const data2d = processData(f2d);
    const data2s = processData(f2s);
    const data2p = processData(f2p);

    console.log(data2d, data2s, data2p)

    drawMarimekko(data2d, '02-07');
    drawMarimekko(data2s, '02-08');
    drawMarimekko(data2p, '02-10');

    drawMarimekko(data2d, '03-03');
    drawMarimekko(data2s, '03-04');
    drawMarimekko(data2p, '03-05');

})