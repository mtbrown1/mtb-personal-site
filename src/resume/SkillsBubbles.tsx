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
    yearStarted: number,
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

interface ISkillsBubblesConfig {
    skilldata: { [key: string]: SkillGroup }
    width: number
}

export function SkillsBubbles(config: ISkillsBubblesConfig) {
    const { skilldata, width: containerwidth } = config;

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
                    yearStarted: skill.yearStarted,
                    skillLevel: 0,
                    children: [],
                })
            })
        }
    }
    const levelScale = d3.scaleLinear()
        .domain([minyear, maxyear])
        .range([5, 1])
    knownSkills = knownSkills.map(s => {
        s.skillLevel = levelScale(s.yearStarted)
        return s
    })
    const height = containerwidth;
    const width = Math.max(containerwidth, 820)
    const margin = 2;
    const labelSize = 15
    const legendRadius = 6;
    const spacing = 20;

    const colorScale = d3.scaleOrdinal<string>().domain(Object.values(TechCategory)).range(COLORS);

    const pack = d3.pack<Skill>()
        .size([width - margin * 2, height - margin * 2])
        .padding(3);

    const emptyRootNode: Skill = {
        name: "", group: TechCategory.undefined, skillLevel: -1, yearStarted: 0, children: knownSkills
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
                            <circle r={n.r} fill={colorScale(n.data.group)}>
                                <title>{`Since ${n.data.yearStarted}`}</title>
                            </circle>
                            <text textAnchor='middle' dominantBaseline='middle' fontSize={labelSize} clipPath={`circle(${n.r})`} x="0" y="0">
                                <title>{`Since ${n.data.yearStarted}`}</title>
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
                        <g key={key} transform={`translate(0, ${i * (legendRadius + spacing / 2)})`}>
                            <circle
                                r={legendRadius}
                                fill={colorScale(key)}
                                cx={legendRadius}
                                cy={legendRadius}
                            />
                            <text
                                x={legendRadius * 2 + 4}
                                y={legendRadius }
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