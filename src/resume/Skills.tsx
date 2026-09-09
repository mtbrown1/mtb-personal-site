import { Card, CardHeader, CardPreview, Label, List, ListItem, makeStyles, Switch, tokens } from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import skillData from '../data/skills.json';
import { SkillsBubbles } from "./SkillsBubbles";
import { getImageFor } from "./Utils";

interface Skill {
    name: string,
    yearStarted: number,
}

export interface SkillGroup {
    [key: string]: Skill[]
}

const skills: { [key: string]: SkillGroup } = skillData;
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
    listCategoryMobile: {
        display: "flex",
        flexDirection: "column",
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
    const [bubbleMode, setBubbleMode] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(0);
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        // Set initial width
        setWidth(element.getBoundingClientRect().width);

        // Observe changes to the container size
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(element);

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, []);
    return <div ref={containerRef}>
        {!isMobile && <Switch label="Use Bubble Mode" checked={bubbleMode} onChange={() => setBubbleMode(!bubbleMode)} />}
        {bubbleMode ? <SkillsBubbles skilldata={skillData} width={width} /> :

            Object.keys(skills).map((category => (
                <SkillCategory name={category} skillGroups={skills[category]} listFormat={category == "Soft"} />
            )))

        }
    </div>
}

function SkillCategory(props: { name: string; skillGroups: SkillGroup; listFormat: boolean; hideLogos?: boolean }) {
    const { name, skillGroups, listFormat } = props;
    const styles = useStyles();
    return <Card appearance="subtle">
        <CardHeader className={styles.category} header={`${name} Skills`} />
        <div className={listFormat ? (isMobile ? styles.listCategoryMobile : styles.listCategory) : ""}>
            {Object.keys(skillGroups).map(name => (
                <SkillGroup name={name} skills={skillGroups[name]} listFormat={listFormat} />
            ))}
        </div>
    </Card>
}

function SkillGroup(props: { name: string; skills: Skill[]; listFormat: boolean; hideLogos?: boolean }): JSX.Element {
    const { name, skills, listFormat } = props;
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
                {skills.map(skill => (
                    <ListItem className={styles.skillText}>{skill.name}</ListItem>
                ))}
            </List>
        ) : (
            <div className={styles.cardGroup}>
                {skills.map(skill => (
                    <SkillCard skill={skill} />
                ))}
            </div>
        )}
    </Card>
}

function SkillCard(props: { skill: Skill }) {
    const { skill } = props;
    const styles = useStyles()
    return (
        <Card appearance="subtle" className={styles.card}>
            <CardPreview className={styles.cardLogo}>
                <img
                    className={styles.cardLogo}
                    src={getImageFor(skill.name)}
                    alt={skill.name}
                    title={`${skill.name} since ${skill.yearStarted}`}
                />
            </CardPreview>
            {isMobile && <Label>{skill.name}</Label>}
        </Card>
    )
}