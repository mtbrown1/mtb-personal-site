import { makeStyles } from "@fluentui/react-components";
import { JSX } from "react";
import reactStringReplace from "react-string-replace";

interface ILinkConfig {
    display: string;
    url: string;
}

function formatLinks(text: string, links: {[key: string]: ILinkConfig}): JSX.Element {
    const replaced = reactStringReplace(text, /\{(\w+)\}/g, (match) => {
            const linkConfig = links[match]
            return <a href={linkConfig.url} target="_blank">{linkConfig.display}</a>
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
    fontSize: "x-large",
    fontWeight: "bold",
    marginBottom: "20px",
    borderBottom: "5px solid",
    width: "fit-content",
  },
  sectionParagraph: {
    margin: "30px",
  },
});

function Section(params: {title: string; paragraphs: string[];}): JSX.Element {
    const styles = useStyles();
    return (
        <div>
            <div className={styles.sectionTitle}>{params.title}</div>
            {params.paragraphs.map(text => 
                <div className={styles.sectionParagraph}>{formatLinks(text, links)}</div>
            )}
        </div>
    );
}

export function Info(): JSX.Element {
    const descriptionText = [
        "Matt Brown is an experienced software developer with a focus on front-end web technologies.  In his 15 years of experience, he has worked with a diverse set of technologies, acting in roles spanning development, technical leadership, and project management.  His most recent role was working on Microsoft Azure's {aifoundry} and {mlstudio}, developing new features to improve user experience, and often working with deadlines such as live demonstrations in the Microsoft ignite conference.",
        "This personal website is Matt's own creation.  He utilized {vite} to create a quick app, built the application using React, Typescript, and Fluent, then deployed in Microsoft Azure as a {azurewebapp}.",
    ]
    return (
        <div>
            <Section title="About Me" paragraphs={descriptionText}/>
        </div>
    );
}