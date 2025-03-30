import { makeStyles, tokens } from "@fluentui/react-components";
import background from "../assets/background.jpg";
import backgrounddark from "../assets/backgrounddark.jpg";
import css from "../assets/logos/css.svg";
import d3 from "../assets/logos/d3.svg";
import elasticsearch from "../assets/logos/elasticsearch.svg";
import git from "../assets/logos/git.svg";
import html from "../assets/logos/html.svg";
import java from "../assets/logos/java.svg";
import javascript from "../assets/logos/javascript.svg";
import johnshopkinsuniversity from "../assets/logos/johnshopkinsuniversity.svg";
import jquery from "../assets/logos/jquery.svg";
import jsx from "../assets/logos/jsx.svg";
import kafka from "../assets/logos/kafka.svg";
import kibana from "../assets/logos/kibana.svg";
import microsoft from "../assets/logos/microsoft.svg";
import microsoftazure from "../assets/logos/microsoftazure.svg";
import nodejs from "../assets/logos/nodejs.svg";
import northropgrumman from "../assets/logos/northropgrumman.svg";
import python from "../assets/logos/python.svg";
import react from "../assets/logos/react.svg";
import typescript from "../assets/logos/typescript.svg";
import universityofmaryland from "../assets/logos/universityofmaryland.svg";
import universityofmarylandcattlab from "../assets/logos/universityofmarylandcattlab.svg";
import mtbcanoeing from "../assets/mtbcanoeing.jpg";
import mtbicon from "../assets/mtbicon.svg";
import mtbiconsmall from "../assets/mtbiconsmall.svg";

const images: { [key: string]: any } = {
    background,
    backgrounddark,
    mtbicon,
    mtbiconsmall,
    mtbcanoeing,
    typescript,
    javascript,
    css,
    html,
    jsx,
    python,
    java,
    react,
    nodejs,
    git,
    d3,
    jquery,
    microsoftazure,
    elasticsearch,
    kibana,
    kafka,
    microsoft,
    northropgrumman,
    universityofmarylandcattlab,
    johnshopkinsuniversity,
    universityofmaryland,
}

export function getImage(imagename: string): any {
    return images[imagename];
};

export function getImageFor(item: string): any {
    return images[item.toLowerCase().replace(/\s|\./g, "")]
}

export const useCommonCardStyles = makeStyles({
    card: {
        marginTop: tokens.spacingVerticalM,
    },
    description: {
        fontSize: tokens.fontSizeBase300,
    },
    logo: {
        width: "80px",
        height: "80px",
    },
    name: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightBold,
    },
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
