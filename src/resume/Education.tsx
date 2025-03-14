import moment from "moment";

interface IEducation {
    schoolName: string;
    schoolLocation: string;
    schoolLogo: string;
    degreeName: string;
    dateAwarded: moment.Moment;
}

export function Education() {
    const educations: Array<IEducation> = [
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
    return (<div>
        {educations.map(edu => <div>
            <div>{edu.schoolName}</div>
            <div>{edu.schoolLocation}</div>
            <div>{edu.degreeName}</div>
            <div>{edu.dateAwarded.format("MMMM YYYY")}</div>
        </div>)}
    </div>)
}