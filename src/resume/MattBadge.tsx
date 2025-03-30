import { Badge, Button, Card, CardHeader, Image, List, ListItem, makeStyles, Text, tokens } from "@fluentui/react-components";
import { CircleFilled, DrawerArrowDownloadRegular } from "@fluentui/react-icons";
import moment from "moment";
import resume from "../assets/MTBResume.pdf";
import { getImage } from "./Utils";

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
    download: {
        //align: "center",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        minWidth: "200px",
        //flexWrap: "wrap",
        textWrap: "nowrap",
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalXL,
        textAlign: "center",
        //margin: tokens.spacingVerticalL,
        borderRadius: tokens.borderRadiusLarge,
        backgroundColor: tokens.colorBrandForeground1,
        ":hover": {
            backgroundColor: tokens.colorNeutralForeground2BrandPressed,
        },
    },
    downloadIcon: {
        fontSize: tokens.fontSizeBase500,
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

    const onButtonClick = () => {
        let alink = document.createElement("a");
        alink.href = resume;
        alink.download = "MTBResume.pdf";
        alink.click();
        document.body.removeChild(alink);

    };

    return (
        <Card appearance="subtle" className={styles.badge}>
            <CardHeader
                image={
                    <img height="40px" src={getImage("mtbicon")} />
                }
                header={<div className={styles.name}>Matt Brown</div>}
                description={<div className={styles.title}>Software Engineer</div>}
            />
            <Image
                src={getImage("mtbcanoeing")}
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
            <Button className={styles.download} onClick={onButtonClick}>
                Donwload Resume
                <DrawerArrowDownloadRegular className={styles.downloadIcon} />
            </Button>
        </Card>
    )
}

export default MattBadge