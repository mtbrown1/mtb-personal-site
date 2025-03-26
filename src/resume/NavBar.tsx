import { MenuItem, Tab, TabList, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { FluentIcon, SendFilled } from "@fluentui/react-icons";
import { JSX } from "react";


interface INavBarProps {
    className?: string;
    pages: IPageConfig[];
    darkMode: boolean;
    currentPage: string;
    setDarkMode(darkMode: boolean): void;
    setCurrentPage(page: string): void;
}

export interface IPageConfig {
    key: string;
    header?: string;
    icon?: FluentIcon;
    page: JSX.Element;
}

const useStyles = makeStyles({
  menu: {
  },
  navItem: {
    alignItems: "center",
    flexWrap: "wrap",
    padding: tokens.spacingVerticalXL, 
    textAlign: "center",
  },
  navIcon: {
    fontSize: tokens.fontSizeHero900,
    color: tokens.colorBrandForeground1,
  },
  navItemText: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
  },
  firstItem: {
    borderTopLeftRadius: tokens.borderRadiusXLarge,
    borderBottomLeftRadius: tokens.borderRadiusXLarge,
  },
  contactMe: {
    margin: tokens.spacingVerticalL,
    marginLeft: "auto",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandForeground1,
    ":hover": {
       backgroundColor: tokens.colorNeutralForeground2BrandPressed,
    },
  },
  contactIcon: {
    marginLeft: tokens.spacingHorizontalM,
  }
});

export function NavBar(props: INavBarProps): JSX.Element {
    const { currentPage, pages, className, setCurrentPage } = props;
    const styles = useStyles()
    
    return (
        <TabList size="large" defaultSelectedValue={currentPage} className={mergeClasses(className, styles.menu)}>
            {pages.map((pageConfig, i) => 
                <Tab
                    className={mergeClasses(i == 0 && styles.firstItem, styles.navItem)}
                    onClick={()=>setCurrentPage(pageConfig.key)}
                    value={pageConfig.key}
                >
                    {pageConfig.icon && <pageConfig.icon className={styles.navIcon} />}
                    <div className={styles.navItemText}>{pageConfig.header}</div>
                </Tab>
            )}
            <MenuItem  
                className={mergeClasses(styles.navItem, styles.contactMe)}                
            >
                Contact Me
                <SendFilled className={styles.contactIcon} />
            </MenuItem>
        </TabList>

    )
}