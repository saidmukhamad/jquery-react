import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ReactGraph: React.FC = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const data = [
        { name: "A", value: 5 },
        { name: "B", value: 10 },
        { name: "C", value: 12 },
        { name: "D", value: 18 },
        { name: "E", value: 25 },
      ];

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand().range([0, width]).padding(0.1);

      const y = d3.scaleLinear().range([height, 0]);

      x.domain(data.map((d) => d.name));
      y.domain([0, d3.max(data, (d) => d.value)]);

      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => height - y(d.value))
        .attr("fill", "steelblue");

      svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));
    }
  }, []);

  return <div ref={d3Container} />;
};

export default ReactGraph;
