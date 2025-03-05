import { mergeStyles } from "@fluentui/merge-styles";
import { MenuItem, MenuList, makeStyles } from "@fluentui/react-components";
import { JSX } from "react";

interface INavBarProps {
    pages: IPageConfig[];
    currentPage: string;
    setCurrentPage(page: string): void;
}

export interface IPageConfig {
    key: string;
    header: string;
    page: JSX.Element;
}

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "row",
    columnGap: "10px",
  },
  selected: {
  },
  navItem: {
  },
});

export function NavBar(props: INavBarProps): JSX.Element {
    const { currentPage, pages, setCurrentPage } = props;
    const styles = useStyles()
    
    return (
        <MenuList className={styles.menu}>
            {pages.map(pageConfig => 
                <MenuItem dir="right" className={currentPage == pageConfig.key ? mergeStyles(styles.selected, styles.navItem) : styles.navItem} onClick={()=>setCurrentPage(pageConfig.key)}>{pageConfig.header}</MenuItem>
            )}
        </MenuList>
    )
}