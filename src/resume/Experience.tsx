
import { JSX } from 'react';
import experience from '../data/experience.json';

interface IEmployer {
    employerName: string;
    employerStartMonth: string;
    employerStartYear: string;
    employerEndMonth: string;
    employerEndYear: string;
    employerLocation: string;
    roles: IRole[];
}

interface IRole {
    roleName: string;
    roleProject: string;
    roleStartMonth: string;
    roleStartYear: string;
    roleEndMonth: string;
    roleEndYear: string;
    roleBullets: string[];
}

function Employer(params: IEmployer): JSX.Element {
    const {
        employerName, 
        employerStartMonth, 
        employerStartYear, 
        employerEndMonth, 
        employerEndYear, 
        employerLocation, 
        roles
    } = params;
    return <div>
        <div>{employerName}</div>
        <div>{employerStartMonth} {employerStartYear} - {employerEndMonth} {employerEndYear}</div>
        <div>{employerLocation}</div>
        {roles.map(role => <Role {...role} />)}
    </div>;
}

function Role(params: IRole): JSX.Element {
    const {
        roleName,
        roleProject,
        roleStartMonth,
        roleStartYear,
        roleEndMonth,
        roleEndYear,
        roleBullets
    } = params
    return <div>
        <div>{roleName}</div>
        <div>{roleProject}</div>
        <div>{roleStartMonth} {roleStartYear} - {roleEndMonth} {roleEndYear}</div>
        {roleBullets.map(bullet => <div>- {bullet}</div>)}       
    </div>
}

export function Experience(): JSX.Element {
    return <div>{(experience as IEmployer[]).map(employer => 
        <Employer {...employer}/>
    )}</div>
}