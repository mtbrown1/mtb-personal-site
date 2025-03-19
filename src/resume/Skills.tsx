import { Card, CardHeader, CardPreview } from "@fluentui/react-components";

interface Skill {
    name: string,
    yearStarted: number,
    yearEnded?: number,
}

const skills: {[key: string]: Skill[]} = {
	"Languages": [
		{
			name: "Typescript",
			yearStarted: 2022
		},
		{
			name: "Javascript",
			yearStarted: 2010
		},
		{
			name: "CSS",
			yearStarted: 2010
		},
		{
			name: "HTML",
			yearStarted: 2010
		},
		{
			name: "JSX",
			yearStarted: 2015
		},
		{
			name: "Python",
			yearStarted: 2011
		},
		{
			name: "Java",
			yearStarted: 2014
		}
	],
	"Frameworks and Supporting Technology": [
		{
			name: "React.js",
			yearStarted: 2015
		},
		{
			name: "Node.js",
			yearStarted: 2014
		},
		{
			name: "git",
			yearStarted: 2012
		},
		{
			name: "D3",
			yearStarted: 2015
		},
		{
			name: "jQuery",
			yearStarted: 2010
		}
	],
	"Cloud Computing": [
		{
			name: "Microsoft Azure",
			yearStarted: 2022
		},
		{
			name: "Azure Blob Storage",
			yearStarted: 2022
		},
		{
			name: "Elasticsearch",
			yearStarted: 2015
		},
		{
			name: "Kibana",
			yearStarted: 2015
		},
		{
			name: "Kafka",
			yearStarted: 2015
		}
	],
	"Process Management and Improvement": [
		{
			name: "Agile",
			yearStarted: 2012
		},
		{
			name: "Scrum",
			yearStarted: 2014
		},
		{
			name: "SAFe",
			yearStarted: 2018
		},
		{
			name: "Kanban",
			yearStarted: 2018
		},
		{
			name: "Product Owner",
			yearStarted: 2018
		},
		{
			name: "Scrum Master",
			yearStarted: 2014
		},
		{
			name: "DevOps",
			yearStarted: 2018
		},
		{
			name: "CI/CD Pipelines",
			yearStarted: 2014
		},
		{
			name: "Team problem solving",
			yearStarted: 2014
		}
	],
	"Project Management": [
		{
			name: "Budget Tracking",
			yearStarted: 2018
		},
		{
			name: "Schedule Tracking",
			yearStarted: 2018
		},
		{
			name: "Staffing",
			yearStarted: 2018
		},
		{
			name: "Communicating customer and project needs",
			yearStarted: 2014
		},
		{
			name: "Reporting team progress to stakeholders",
			yearStarted: 2014
		}
	],
	"People Management": [
		{
			name: "Career Counseling",
			yearStarted: 2017
		},
		{
			name: "Performance Reviews",
			yearStarted: 2020
		},
		{
			name: "Promotions",
			yearStarted: 2020
		},
		{
			name: "Handling personnel issues",
			yearStarted: 2018
		},
		{
			name: "Individual problem solving",
			yearStarted: 2015
		},
		{
			name: "Individual improvement",
			yearStarted: 2014
		}
	]
};

const resolveAsset = (asset: string) => {
    const ASSET_URL =
      "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/";
  
    return `${ASSET_URL}${asset}`;
  };

export function Skills() {

    return <div>
        {Object.keys(skills).map((tc) => (
            <Card>
                <CardHeader header={tc} />
                {skills[tc].map(s => (
                    <Card orientation="horizontal">
                        <CardPreview>
                            <img
                            src={resolveAsset("app_logo.svg")}
                            alt="App Name Document"
                            />
                        </CardPreview>
                        <CardHeader
                            header={s.name}
                        />
                        {`since ${s.yearStarted}`}
                    </Card>
                ))}
            </Card>
        ))}
    </div>
}