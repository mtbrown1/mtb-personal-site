
enum TechCategory {
    language,
    framework,
    cloud,
    process,
    project,
    people
}

export function Skills() {
    const knownSkills: Array<{group: TechCategory, title: string, list: string[]}> = [
        { 
            group: TechCategory.language, 
            title: "Languages",
            list: ["Typescript","Javascript","CSS","HTML","JSX","Python","Java"]
        }, {
            group: TechCategory.framework,
            title: "Frameworks and Supporting Technology",
            list: ["React.js", "Node.js", "git", "Jersey", "Tomcat", "D3", "jQuery"]
        }, {
            group: TechCategory.cloud,
            title: "Cloud Computing",
            list: ["Microsoft Azure", "Azure Blob Storage", "Elasticsearch", "Kibana", "Kafka"]
        }, {
            group: TechCategory.process,
            title: "Process Management and Improvement",
            list: ["Agile", "Scrum", "SAFe", "Kanban", "Product Owner", "Scrum Master", "DevOps", "CI/CD Pipelines", "Team problem solving"
]
        }, {
            group: TechCategory.project,
            title: "Project Management",
            list: ["Budget Tracking", "Schedule Tracking", "Staffing", "Communicating customer and project needs", "Reporting team progress to stakeholders"
]
        }, {
            group: TechCategory.people,
            title: "People Management",
            list: ["Career Counseling", "Performance Reviews", "Promotions", "Handling personnel issues", "Individual problem solving", "Individual improvement"]
        }
    ];
    
    return <div>
        {knownSkills.map(skillCategory => 
            <div>
                <div>{skillCategory.title}</div>
                {skillCategory.list.map(skill => <div>{skill}</div>)}
            </div>
        ) }
    </div>
}