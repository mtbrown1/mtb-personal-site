import * as d3 from "d3";
import { HierarchyNode } from "d3";
import { useEffect, useRef, useState } from "react";

enum TechCategory {
    language = "Languages",
    framework = "Frameworks and Supporting Technology",
    cloud = "Cloud Computing",
    process = "Process Management and Improvement",
    project = "Project Management",
    people = "People Management",
}

interface Skill {
    group: TechCategory, 
    name: string,
    level: number,
}

const COLORS = [
    '#e0ac2b',
    '#e85252',
    '#6689c6',
    '#9a6fb0',
    '#a53253',
    '#69b3a2',
  ];

export function Skills() {
    const knownSkills: Skill[] = [
        ...["Typescript","Javascript","CSS","HTML","JSX","Python","Java"]
            .map(s=> {return {group: TechCategory.language, name: s, level: 5}}),
        ...["React.js", "Node.js", "git", "Jersey", "Tomcat", "D3", "jQuery"]
            .map(s=> {return {group: TechCategory.framework, name: s, level: 4}}),
        ...["Microsoft Azure", "Azure Blob Storage", "Elasticsearch", "Kibana", "Kafka"]
            .map(s=> {return {group: TechCategory.cloud, name: s, level: 3}}),
        ...["Agile", "Scrum", "SAFe", "Kanban", "Product Owner", "Scrum Master", "DevOps", "CI/CD Pipelines", "Team problem solving"]
            .map(s=> {return {group: TechCategory.process, name: s, level: 2}}),
        ...["Budget Tracking", "Schedule Tracking", "Staffing", "Communicating customer and project needs", "Reporting team progress to stakeholders"]
            .map(s=> {return {group: TechCategory.project, name: s, level: 1}}),
        ...["Career Counseling", "Performance Reviews", "Promotions", "Handling personnel issues", "Individual problem solving", "Individual improvement"]
            .map(s=> {return {group: TechCategory.people, name: s, level: 1}}),

    ];
    const width = 928;
    const height = width;
    const margin = 2;
    const BUBBLE_MIN_SIZE = 30;
    const BUBBLE_MAX_SIZE = 80;

    const nodes = knownSkills.map((d) => ({ ...d }));

    const [min, max] = d3.extent(nodes.map((d) => d.level)) as [number, number];
    const sizeScale = d3.scaleSqrt()
        .domain([min, max])
        .range([BUBBLE_MIN_SIZE, BUBBLE_MAX_SIZE]);

    const colorScale = d3.scaleOrdinal<string>().domain(Object.values(TechCategory)).range(COLORS);

    const pack = d3.pack<Skill>()
        .size([width - margin * 2, height - margin * 2])
        .padding(3);
    
    console.log(knownSkills)
    const hierarchy = d3.hierarchy({name: "", level: -1, children: [
        ...knownSkills
    ]});

    const root = pack(hierarchy.sum(d => d.level) as unknown as d3.HierarchyNode<Skill>);
    return (
        <div>
            <svg 
            style={{
            width,
            height,
            }}
            width={width}
            height={height}>
                {root.leaves().map(n => 
                    <g>
                        <circle cx={n.x} cy={n.y} r={sizeScale(n.value!)} fill={colorScale(n.data.group)}/>
                        <text style={{'textAnchor': 'middle'}} clipPath={`circle(${sizeScale(n.value!)})`} x={n.x} y={n.y}>{n.data.name}</text>
                    </g>
                )}
            </svg>
        </div>
    );
}