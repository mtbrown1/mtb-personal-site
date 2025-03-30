import { Button, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle, Image, MenuItem, MenuList, Tab, TabList, makeStyles, mergeClasses, tokens, useRestoreFocusTarget } from "@fluentui/react-components";
import { Dismiss24Regular, FluentIcon, NavigationFilled, SendFilled } from "@fluentui/react-icons";
import { JSX, useState } from "react";
import { ContactMe } from "./ContactMe";
import { getImage } from "./Utils";


interface INavBarProps {
  pages: IPageConfig[];
  darkMode: boolean;
  currentPage: string;
  useMobile?: boolean;
  setDarkMode(darkMode: boolean): void;
  setCurrentPage(page: string): void;
}

export interface IPageConfig {
  key: string;
  header: string;
  icon?: FluentIcon;
  page: JSX.Element;
}

const useStyles = makeStyles({
  navItem: {
    alignItems: "center",
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
    textWrap: "nowrap",
    gap: tokens.spacingHorizontalM,
  },
  mobileBanner: {
    padding: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    justifyContent: "space-between",
  },
  mobileNavMenu: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  mobileNavButton: {
    color: tokens.colorBrandForeground1,
  },
  mobileBannerName: {},
  mobileBannerLogo: {
    width: tokens.spacingVerticalXXL,
  },
});

export function NavBar(props: INavBarProps): JSX.Element {
  const { currentPage, pages, useMobile, setCurrentPage } = props;
  const styles = useStyles()
  const [showContact, setShowContact] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (<>
    {useMobile ?
      <div className={styles.mobileBanner}>
        <Button
          appearance="transparent"
          size="small"
          className={styles.mobileNavButton}
          icon={<NavigationFilled />}
          onClick={() => setIsMobileNavOpen(true)}
        />
        <div className={styles.mobileBannerName}>
          Matt Brown, Software Engineer
        </div>
        <Image className={styles.mobileBannerLogo} src={getImage("mtbiconsmall")} />
        <Drawer open={isMobileNavOpen} className={styles.mobileNavMenu}>
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsMobileNavOpen(false)}
                />
              }
            />
          </DrawerHeader>
          <DrawerBody>
            <MenuList>
              {pages.map((pageConfig) =>
                <MenuItem
                  onClick={() => {
                    setCurrentPage(pageConfig.key);
                    setIsMobileNavOpen(false);
                  }}
                  disabled={currentPage == pageConfig.key}
                >
                  {pageConfig.header}
                </MenuItem>
              )}
            </MenuList>
          </DrawerBody>
        </Drawer>
      </div >
      :
      <TabList size="large" defaultSelectedValue={currentPage}>
        {pages.map((pageConfig, i) =>
          <Tab
            className={mergeClasses(i == 0 && styles.firstItem, styles.navItem)}
            onClick={() => setCurrentPage(pageConfig.key)}
            value={pageConfig.key}
          >
            {pageConfig.icon ?
              <pageConfig.icon className={styles.navIcon} />
              :
              <div className={styles.navItemText}>{pageConfig.header?.toUpperCase()}</div>
            }
          </Tab>
        )}
        <Button
          className={mergeClasses(styles.navItem, styles.contactMe)}
          {...restoreFocusTargetAttribute}
          onClick={() => { setShowContact(!showContact) }}
        >
          Contact Me
          <SendFilled />
        </Button>

      </TabList>
    }
    <ContactMe show={showContact} setShow={setShowContact} />
  </>
  )
}