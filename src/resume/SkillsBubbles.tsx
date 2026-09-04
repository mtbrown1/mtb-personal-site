import * as d3 from "d3";

import { SkillGroup } from "./Skills";

enum TechCategory {
    language = "Languages",
    framework = "Frameworks and Supporting Technology",
    cloud = "Cloud Computing",
    process = "Process Management and Improvement",
    project = "Project Management",
    people = "People Management",
    undefined = "Unknown",
}

interface SkillData {
    name: string;
    yearStarted: number;
}

interface Skill {
    group: TechCategory,
    name: string,
    skillLevel: number,
    children: Skill[]
}

const COLORS = [
    '#e0ac2b',
    '#e85252',
    '#6689c6',
    '#9a6fb0',
    '#a53253',
    '#69b3a2',
];

export function SkillsBubbles(config: { 'skilldata': { [key: string]: SkillGroup } }) {
    const { skilldata } = config;
    let minyear = new Date().getFullYear()
    let maxyear = 0
    const typesUsed = []
    let knownSkills: Skill[] = []
    for (const types of Object.values(skilldata)) {
        for (const [key, value] of Object.entries(types)) {
            typesUsed.push(key)
            const skillCategory = key as TechCategory;
            const skillGroup = value as SkillData[];
            skillGroup.forEach((skill: SkillData) => {
                minyear = Math.min(skill.yearStarted, minyear);
                maxyear = Math.max(skill.yearStarted, maxyear);
                knownSkills.push({
                    group: skillCategory,
                    name: skill.name,
                    skillLevel: skill.yearStarted,
                    children: [],
                })
            })
        }
    }
    const levelScale = d3.scaleLinear()
        .domain([minyear, maxyear])
        .range([5, 1])
    knownSkills = knownSkills.map(s => {
        s.skillLevel = levelScale(s.skillLevel)
        return s
    })
    const width = 928;
    const height = width;
    const margin = 2;
    const labelSize = 15
    const rectSize = 12;
    const spacing = 20;

    const colorScale = d3.scaleOrdinal<string>().domain(Object.values(TechCategory)).range(COLORS);

    const pack = d3.pack<Skill>()
        .size([width - margin * 2, height - margin * 2])
        .padding(3);

    const emptyRootNode: Skill = {
        name: "", group: TechCategory.undefined, skillLevel: -1, children: knownSkills
    }
    const hierarchy: d3.HierarchyNode<Skill> = d3.hierarchy(emptyRootNode);

    hierarchy.sum(d => d.skillLevel);
    const root = pack(hierarchy);

    return (
        <div>
            <svg
                style={{
                    width,
                    height,
                }}
                width={width}
                height={height}>
                {root.leaves().map(n => {
                    const splitname = n.data.name.split(" ")
                    const baseY = (-(labelSize / 2) * splitname.length) + (labelSize / 2)
                    return (
                        <g transform={`translate(${n.x}, ${n.y})`}>
                            <circle r={n.r} fill={colorScale(n.data.group)} />
                            <text textAnchor='middle' dominantBaseline='middle' fontSize={labelSize} clipPath={`circle(${n.r})`} x="0" y="0">
                                {splitname.map((s, i) => (
                                    <tspan x="0" y={baseY + (labelSize * i)}>{s}</tspan>
                                ))}
                            </text>
                        </g>
                    )
                }
                )}
                <g>
                    {typesUsed.map((key, i) => (
                        <g key={key} transform={`translate(0, ${i * (rectSize + spacing / 2)})`}>
                            <rect
                                width={rectSize}
                                height={rectSize}
                                fill={colorScale(key)}
                                rx={2}
                            />
                            <text
                                x={rectSize + 8}
                                y={rectSize / 2}
                                alignmentBaseline="middle"
                                fontSize={labelSize * .85}
                            >
                                {key}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </div >
    );
}