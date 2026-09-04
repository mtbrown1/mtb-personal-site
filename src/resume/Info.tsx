import { Link, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { JSX, useState } from "react";
import { isMobile } from "react-device-detect";
import reactStringReplace from "react-string-replace";
import MattBadge from "./MattBadge";
import { getImageFor, useCommonCardStyles } from "./Utils";

interface ILinkConfig {
    display: string;
    url: string;
}

function formatLinks(text: string, links: { [key: string]: ILinkConfig }): JSX.Element {
    const replaced = reactStringReplace(text, /\{(\w+)\}/g, (match) => {
        const linkConfig = links[match]
        return <Link href={linkConfig.url} target="_blank">{linkConfig.display}</Link>
    })
    return <span>{replaced}</span>;
}

const links: { [key: string]: ILinkConfig } = {
    aifoundry: {
        display: "AI Foundry",
        url: "https://ai.azure.com/"
    },
    mlstudio: {
        display: "ML Studio",
        url: "https://ml.azure.com/"
    },
    vite: {
        display: "Vite",
        url: "https://vite.dev/guide/"
    },
    azurewebapp: {
        display: "Static Web App",
        url: "https://learn.microsoft.com/en-us/azure/static-web-apps/"
    }
}

const useStyles = makeStyles({
    section: {
        marginBottom: tokens.spacingVerticalXL,
    },
    sectionTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightBold,
        marginBottom: tokens.spacingVerticalXL,
    },
    sectionParagraph: {
        marginTop: tokens.spacingVerticalM,
        fontSize: tokens.fontSizeBase400,
    },
    sectionLink: {
        display: "inline"
    },
    descriptionContainer: {
        fontSize: tokens.fontSizeBase500,
    },
    expandingLink: {

    },
    grimdark: {
        background: "#302f2e",
    },
});

interface IInfoIconConfig {
    label: string;
    url: string;
    description: string;
    setDescription(val: string): void;
}

function InfoIcon(config: IInfoIconConfig): JSX.Element {
    const styles = useStyles();
    const commonCardStyles = useCommonCardStyles();
    const { label, url, description, setDescription } = config;
    return (
        <div className={styles.sectionLink}>
            <Link href={url} target="_blank">
                <img
                    className={
                        label in styles
                            ? mergeClasses(commonCardStyles.portfolioLink, styles[label as keyof typeof styles])
                            : commonCardStyles.portfolioLink}
                    src={getImageFor(label)}
                    alt={`${label} logo`}
                    onMouseEnter={() => {
                        setDescription(description)
                    }}
                    onMouseLeave={() => {
                        setDescription("")
                    }}
                />
            </Link>
        </div>
    )
}

export function Info(): JSX.Element {
    const [currentDescription, setCurrentDescription] = useState("");
    const styles = useStyles();
    const descriptionText = [
        "I am an experienced software developer with a focus on front-end web technologies.  In my 15 years of experience, I have worked with a diverse set of technologies, acting in roles spanning development, technical leadership, and project management.  My most recent role was working on Microsoft Azure's {aifoundry} and {mlstudio}, developing new features to improve user experience, and often working with deadlines such as live demonstrations in the Microsoft ignite conference.",
        "This personal website is my own creation.  I utilized {vite} to create an initial codebase, built the application using React, Typescript, and Fluent, then deployed in Microsoft Azure as a {azurewebapp}.",
    ]
    const findme = [
        { label: "linkedin", url: "https://www.linkedin.com/in/matthew-brown-01160346/" },
        { label: "github", url: "https://github.com/mtbrown1" }
    ]
    const portfolio = [
        { label: "grimdark", url: "https://thegrimdarkemporium.com/", description: "E-Commerce site that I made for a friend using Squarespace." }
    ]
    console.log(portfolio)

    const commonCardStyles = useCommonCardStyles();
    return (
        <div>
            <div className={styles.section}>
                {isMobile && <MattBadge minimize={true} />}
                <div className={styles.sectionTitle}>About Me</div>
                {descriptionText.map(text =>
                    <div className={styles.sectionParagraph}>
                        {formatLinks(text, links)}
                    </div>
                )}
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Where to find me</div>
                {findme.map(link =>
                    <div className={styles.sectionLink}>
                        <img
                            className={commonCardStyles.logo}
                            src={getImageFor(link.label)}
                            alt={`${link.label} logo`}
                        />
                    </div>
                )}
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>My Other Work</div>
                {portfolio.map(link =>
                    <InfoIcon label={link.label} description={link.description} url={link.url} setDescription={setCurrentDescription} />
                )}
                <div className={styles.descriptionContainer}>{currentDescription}</div>
            </div>
        </div >
    );
}