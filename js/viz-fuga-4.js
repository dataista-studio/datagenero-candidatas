function drawCirclePack(data, svgId) {

    const colorMujer = "#7dea87";
    const colorHombre = "#ea98ff";

    const width2 = 600;
    const height2 = 600;

    // Create a SVG container.
    const svg2 = d3.select(`#viz${svgId}`)
          .attr("width", width2)
          .attr("height", height2)
          .attr("viewBox", [0, 0, width2, height2])
          .attr("style", "max-width: 100%;");


    const currentRadius = height2 / 2.5;
    const circleRadius = currentRadius / 0.9;
    const radii = circleRadius / 14;

    svg2.append("circle")
        .attr("cx", width2 / 2)
        .attr("cy", height2 / 2)
        .attr("r", circleRadius)
        .attr("fill", "#544059");

    const padding = 10;

    // const circles = d3.packSiblings(d3.range(30).map(() => ({r: radii + padding + Math.random()})));
    const circles = d3.range(30).map((i) => {
        const angle = Math.PI * (3 - Math.sqrt(5));
        const r = (radii + padding) * 1.2 * Math.sqrt(i + 1);
        const a = (i + 1) * angle;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        return {
            x: x,
            y: y
        }
    })
    console.log(circles)

    const g2 = svg2.append("g")

    g2.selectAll('circle')
        .data(circles)
        .join("circle")
            .attr("cx", d => width2 / 2 + d.x)
            .attr("cy", d => height2 / 2 + d.y)
            .attr("r", radii)
            .attr("fill", "white")

    // build the one level hierarchy
    // const rootChildren = Array.from({ length: 30 }).map(
    //     (m, i) => (m = { name: i })
    // );
    // const rootData = { name: "root", children: rootChildren };
    // const root = d3.hierarchy(rootData);
    // root.count();
    // // apply the pack
    // d3
    //     .pack()
    //     .size([currentRadius * 1.8, currentRadius * 1.8])
    //     .padding(0)(root);
    //     console.log(root)

    // // build new data with packX + packY and centre node fixed with radius of the rest * 2
    // const circleData = root.children.reduce((acc, descendant, i) => {
    //     const newDescendant = descendant;
    //     newDescendant.packX = descendant.x;
    //     newDescendant.packY = descendant.y;
    //     acc.push(newDescendant);
    //     return acc;
    // }, []);

    // const packShift =
    //     (height2 - currentRadius * 2) / 2 + currentRadius * 0.1;

    // const circleGroup = svg2
    //     .selectAll(".circleGroup")
    //     .data(root.children)
    //     .join((group) => {
    //         const enter = group.append("g").attr("class", "circleGroup");
    //         enter.append("circle").attr("class", "packCircle");

    //         return enter;
    //     });

    // circleGroup.attr("transform", `translate(${packShift},${packShift})`);

    // circleGroup
    //     .select(".packCircle")
    //     .attr("fill", (d) => (d.depth === 0 ? "red" : "white"))
    //     .attr("stroke-width", 0)
    //     .attr("r", (d) => d.r * 0.8);

    // const simulation = d3
    //     .forceSimulation()
    //     .force("x", d3.forceX((d) => d.packX))
    //     .force("y", d3.forceY((d) => d.packY))
    //     .force(
    //     "collide",
    //     d3
    //         .forceCollide()
    //         .radius((d) => d.r * 1.2)
    //         .iterations(50)
    //         .strength(1)
    //     )
    //     .on("tick", () => {
    //     circleGroup
    //         .selectAll(".packCircle")
    //         .attr("cx", (d) => d.x)
    //         .attr("cy", (d) => d.y);
    //     });

    // simulation.stop();
    // simulation.nodes(circleData);
    // simulation.alpha(1).restart();
    
}

const circles = [
    {
        'mujeres': 15,
        'hombres': 15
    }
]

drawCirclePack(circles, "04-01");
