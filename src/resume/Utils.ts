import { makeStyles, tokens } from "@fluentui/react-components";

export function resolveAsset(asset: string, subdir?: string): string {
    const directory = `/src/assets${subdir ? "/" : ""}${subdir ?? ""}`;
    const filename = `${asset.toLowerCase().replace(/\s/g, "")}`;
    const extension = `${asset.includes('.') ? "" : ".svg"}`;
    return `${directory}/${filename}${extension}`;
};

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