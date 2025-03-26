import { Card, CardHeader, CardPreview, List, ListItem, makeStyles, tokens } from "@fluentui/react-components";
import skillData from '../data/skills.json';
import { resolveAsset } from "./Utils";

interface Skill {
    name: string,
    yearStarted: number,
}

interface SkillGroup {
    [key: string]: Skill[]
}

const skills: {[key: string]: SkillGroup} = skillData;
const ICONSIZE = 120;

const useStyles = makeStyles({
    category: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightBold,
    },
    card: {
        margin: tokens.spacingVerticalM,
    },
    cardLogo: {
        width: `${ICONSIZE}px`,
        maxHeight: `${ICONSIZE}px`,
    },
    cardGroup: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    listCategory: {
        display: "flex",
    },
    listGroup: {
        marginRight: tokens.spacingHorizontalXXXL,
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
    },
    skillGroup: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
    },
    skillText: {
        fontSize: tokens.fontSizeBase400,
    },
})

export function Skills() {
    return <div>
        {Object.keys(skills).map((category => (
            <SkillCategory name={category} skillGroups={skills[category]} listFormat={category=="Soft"} />
        )))}
    </div>
}

function SkillCategory(props: {name: string; skillGroups: SkillGroup; listFormat: boolean;  hideLogos?: boolean}) {
    const {name, skillGroups, listFormat} = props;
    const styles = useStyles();
    return <Card appearance="subtle">
        <CardHeader className={styles.category} header={`${name} Skills`} />
        <div className={listFormat ? styles.listCategory : ""}>
            {Object.keys(skillGroups).map(name => (
                <SkillGroup name={name} skills={skillGroups[name]} listFormat={listFormat} />
            ))}
        </div>
    </Card>
} 

function SkillGroup(props: {name: string; skills: Skill[]; listFormat: boolean; hideLogos?: boolean}): JSX.Element {
    const {name, skills, listFormat} = props;
    const styles = useStyles()
    return <Card 
        appearance="subtle" 
        size="large" 
        orientation={"vertical"} 
        className={listFormat ? styles.listGroup : styles.skillGroup}
    >
        <CardHeader header={name} />
        {listFormat ? (
            <List>
                {skills.map(skill=> (
                    <ListItem className={styles.skillText}>{skill.name}</ListItem>
                ))}
            </List>
        ) : (
            <div className={styles.cardGroup}>
                {skills.map(skill=> (
                    <SkillCard skill={skill} />
                ))}
            </div>
        )}
    </Card>
}

function SkillCard(props: {skill: Skill}) {
    const {skill} = props;
    const styles = useStyles()
    return (
        <Card appearance="subtle" className={styles.card}>
            <CardPreview className={styles.cardLogo}>
                <img
                    className={styles.cardLogo}
                    src={resolveAsset(skill.name, "logos")}
                    alt={skill.name}
                    title={skill.name}
                />
            </CardPreview>
        </Card>
    )
}