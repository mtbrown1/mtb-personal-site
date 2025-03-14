import { Link, makeStyles, tokens } from "@fluentui/react-components";
import { JSX } from "react";
import reactStringReplace from "react-string-replace";

interface ILinkConfig {
    display: string;
    url: string;
}

function formatLinks(text: string, links: {[key: string]: ILinkConfig}): JSX.Element {
    const replaced = reactStringReplace(text, /\{(\w+)\}/g, (match) => {
            const linkConfig = links[match]
            return <Link href={linkConfig.url} target="_blank">{linkConfig.display}</Link>
        })
    return <span>{replaced}</span>;
}

const links: {[key: string]: ILinkConfig} = {
    aifoundry : {
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
    sectionTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightBold,
        marginBottom: tokens.spacingVerticalXL,
    },
    sectionParagraph: {
        marginTop: tokens.spacingVerticalM,
    },
});

export function Info(): JSX.Element {
    const styles = useStyles();
    const descriptionText = [
        "I am an experienced software developer with a focus on front-end web technologies.  In my 15 years of experience, I have worked with a diverse set of technologies, acting in roles spanning development, technical leadership, and project management.  My most recent role was working on Microsoft Azure's {aifoundry} and {mlstudio}, developing new features to improve user experience, and often working with deadlines such as live demonstrations in the Microsoft ignite conference.",
        "This personal website is my own creation.  I utilized {vite} to create an initial codebase, built the application using React, Typescript, and Fluent, then deployed in Microsoft Azure as a {azurewebapp}.",
    ]
    return (
        <div>
            <div className={styles.sectionTitle}>About Me</div>
            {descriptionText.map(text => 
                <div className={styles.sectionParagraph}>
                    {formatLinks(text, links)}
                </div>
            )} 
        </div>
    );
}