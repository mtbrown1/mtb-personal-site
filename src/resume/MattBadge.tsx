import { Badge, Card, CardHeader, Image, List, ListItem, makeStyles, Text, tokens } from "@fluentui/react-components";
import { CircleFilled } from "@fluentui/react-icons";
import moment from "moment";
import { resolveAsset } from "./Utils";

const useStyles = makeStyles({
    badge: {
        borderRadius: tokens.borderRadiusXLarge,
        padding: tokens.spacingVerticalXL,
    },
    name: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightBold,
    },
    title: {
        fontWeight: tokens.fontWeightSemibold,
    },
    bullets: {
        display: "flex",
        marginBottom: "10px",
        textIndent: "10px",
    },
    bulletText: {
        fontWeight: tokens.fontWeightSemibold,
    },
});

function MattBadge(): JSX.Element {
    const styles = useStyles();
    const yearsExperience = Math.round(moment().diff(moment('2010-04-05'), 'year', true));
    const bullets = [
        `${yearsExperience} years of experience`,
        "Focus on Javascript & Typescript",
        "Experience from development to project mangement",
        "Love for working with great people and great teams"
    ]
    return (
        <Card appearance="subtle" className={styles.badge}>
            <CardHeader 
                image={            
                    <img height="40px" src={resolveAsset("mtb-icon")} />
                }
                header={<div className={styles.name}>Matt Brown</div>}
                description = {<div className={styles.title}>Software Engineer</div>}
            />
            <Image
                src={resolveAsset("mtb-canoeing.jpg")}
                fit="contain"
            />
            <List>
                {bullets.map(b => 
                    <ListItem className={styles.bullets}>
                        <Badge icon={<CircleFilled />} />
                        <Text className={styles.bulletText}>{b}</Text>
                    </ListItem>
                )}
            </List>
        </Card>
    )
}

export default MattBadge