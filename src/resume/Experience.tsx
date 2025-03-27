
import { Badge, Card, CardHeader, List, ListItem, makeStyles, tokens } from '@fluentui/react-components';
import { CircleFilled } from "@fluentui/react-icons";
import { JSX } from 'react';
import experience from '../data/experience.json';
import { getImageFor, useCommonCardStyles } from './Utils';

interface Employer {
    employerName: string;
    employerStartMonth: string;
    employerStartYear: string;
    employerEndMonth: string;
    employerEndYear: string;
    employerLocation: string;
    roles: Role[];
}

interface Role {
    roleName: string;
    roleProject: string;
    roleStartMonth: string;
    roleStartYear: string;
    roleEndMonth: string;
    roleEndYear: string;
    roleBullets: string[];
}

const useStyles = makeStyles({
    roleBullet: {
        margin: tokens.spacingHorizontalXS,
    },
    roleInfo: {
        fontSize: tokens.fontSizeBase200,
    },
    roleName: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
    },
})

export function Experience(): JSX.Element {
    return <div>
        {(experience as Employer[]).map(employer => 
            <Employer {...employer}/>
        )}
    </div>
}

function Employer(params: Employer): JSX.Element {
    const {
        employerName, 
        employerStartMonth, 
        employerStartYear, 
        employerEndMonth, 
        employerEndYear, 
        employerLocation, 
        roles
    } = params;
    const commonCardStyles = useCommonCardStyles();
    return <Card className={commonCardStyles.card}>
        <CardHeader 
            className={commonCardStyles.name}
            image={<img
                className={commonCardStyles.logo}
                src={getImageFor(employerName)}
                alt={`${employerName} logo`}
            />}
            header={employerName}
            description={
                <div className={commonCardStyles.description}>
                    {employerStartMonth} {employerStartYear} - {employerEndMonth} {employerEndYear}
                    <br />
                    {employerLocation}
                </div>
            }
        />
        
        {roles.map(role => <Role {...role} showDate={roles.length > 1} />)}
    </Card>;
}

function Role(params: Role & {showDate: boolean}): JSX.Element {
    const {
        roleName,
        roleProject,
        roleStartMonth,
        roleStartYear,
        roleEndMonth,
        roleEndYear,
        roleBullets,
        showDate
    } = params
    const styles = useStyles();
    return <Card appearance="subtle">
        <CardHeader 
            className={styles.roleName}
            header={roleName}
            description={
                <div className={styles.roleInfo}>
                    {roleProject}
                    <br />
                    {showDate && `${roleStartMonth} ${roleStartYear} - ${roleEndMonth} ${roleEndYear}`}
                </div>}
        />
        <List>
            {roleBullets.map(bullet => <ListItem>
                <Badge 
                    appearance="outline" 
                    size='small'
                    className={styles.roleBullet} 
                    icon={<CircleFilled />} 
                />
                {bullet}
            </ListItem>)}
        </List>
    </Card>
}