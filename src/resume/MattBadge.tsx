import { makeStyles, tokens, Image, Card, CardHeader, List, ListItem, Text, Badge } from "@fluentui/react-components";
import MTBLogo from '../assets/mtb-icon.svg';
import MTBHeadshot from '../assets/mtb-canoeing.jpg';
import moment from "moment";
import { CircleFilled } from "@fluentui/react-icons"

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
                    <img height="40px" src={MTBLogo} />
                }
                header={<div className={styles.name}>Matt Brown</div>}
                description = {<div className={styles.title}>Software Engineer</div>}
            />
            <Image
                src={MTBHeadshot}
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