import { makeStyles, tokens } from "@fluentui/react-components";

export function resolveAsset(asset: string): string {
    const ASSET_URL = "/src/assets/logos/";  
    return `${ASSET_URL}${asset.toLowerCase().replace(/\s/g, "")}.svg`;
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