import { Card, CardHeader } from "@fluentui/react-components";
import moment from "moment";
import { getImageFor, useCommonCardStyles } from "./Utils";

interface Education {
    schoolName: string;
    schoolLocation: string;
    schoolLogo: string;
    degreeName: string;
    dateAwarded: moment.Moment;
}



export function Education() {
    const educations: Array<Education> = [
        {
            schoolName: "Johns Hopkins University",
            schoolLocation: "Baltimore, MD",
            schoolLogo: "",
            degreeName: "Master of Science, Computer Science",
            dateAwarded: moment("May 2021", "MMM YYYY")
        },{
            schoolName: "University of Maryland",
            schoolLocation: "College Park, MD",
            schoolLogo: "",
            degreeName: "Bachelor of Science, Computer Science",
            dateAwarded: moment("Dec 2011", "MMM YYYY")
        }
    ]
    return <div>
        {educations.map(edu => <Degree {...edu} />)}
    </div>
}

function Degree(params: Education): JSX.Element {
    const {schoolName, degreeName, dateAwarded} = params;
    const commonCardStyles = useCommonCardStyles();
    return <Card className={commonCardStyles.card}>
        <CardHeader 
            className={commonCardStyles.name}
            header={degreeName}
            image={<img
                className={commonCardStyles.logo}
                src={getImageFor(schoolName)}
                alt={`${schoolName} logo`}
            />}
            description={<div className={commonCardStyles.description}>
                {dateAwarded.format("MMMM YYYY")}
            </div>}
        />
        <div>{schoolName}</div>
    </Card>
}