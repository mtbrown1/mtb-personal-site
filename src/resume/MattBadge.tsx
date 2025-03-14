import { makeStyles, tokens, Image } from "@fluentui/react-components";
import MTBLogo from '../assets/mtb-icon.svg';
import MTBHeadshot from '../assets/mtb-canoeing.jpg';

const useStyles = makeStyles({
    badge: {
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXL,
    },
    name: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightBold,
        marginBottom: tokens.spacingVerticalS,
    },
    title: {
        fontWeight: tokens.fontWeightSemibold,
    },
});

function MattBadge(): JSX.Element {
    const styles = useStyles();
    return <div className={styles.badge}>
        <div className={styles.name}>Matt Brown</div>
        <div className={styles.title}>Software Engineer</div>
        <Image
            src={MTBHeadshot}
            fit="contain"
        />
        <Image 
            src={MTBLogo}
            fit="contain"
        />
    </div>
}

export default MattBadge