import { FluentProvider, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { HomeFilled } from "@fluentui/react-icons";
import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import { darkTheme, lightTheme } from '../data/theme';
import { Education } from './Education';
import { Experience } from './Experience';
import { Info } from './Info';
import MattBadge from './MattBadge';
import { IPageConfig, NavBar } from './NavBar';
import { Skills } from './Skills';
import { getImage } from './Utils';

const useStyles = makeStyles({
  pageBackgroundLight: {
    backgroundImage: `url(${getImage("background")})`,
  },
  pageBackgroundDark: {
    backgroundImage: `url(${getImage("backgrounddark")})`,
  },
  pageContent: {
    display: "flex",
    backgroundSize: 'cover',
    height: "100vh",
    width: "100vw",
    minWidth: "1100px",
    fontFamily: tokens.fontFamilyNumeric
  },
  pageContentInner: {
    display: "flex",
    margin: tokens.spacingVerticalXXXL,
    width: "-webkit-fill-available",
  },
  leftContent: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    margin: tokens.spacingVerticalXL,
    flex: 1,
  },
  rightContent: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    margin: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground3,
    height: "-webkit-fill-available",
    overflow: "hidden",
  },
  mainContentInner: {
    padding: tokens.spacingVerticalXXXL,
    height: "-webkit-fill-available",
    overflowY: "auto",
  },
  navBar: {
    margin: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  mobilePageContent: {
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
  },
  mobilePageContentInner: {
    display: "flex",
    flexDirection: "column",
    height: "-webkit-fill-available",
  },
  mobileMainContent: {
    margin: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground3,
    height: "-webkit-fill-available",
    overflow: "hidden"
  },
  mobileMainContentInner: {
    padding: tokens.spacingHorizontalL,
    height: "-webkit-fill-available",
    overflow: "auto",
  },
});

function Resume() {
  const [currentPage, setCurrentPage] = useState("info");
  const [darkMode, setDarkMode] = useState(false);
  useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setDarkMode(isSystemDark)
  );

  const styles = useStyles();
  const pages: Array<IPageConfig> = [
    {
      key: "info",
      header: "About Matt",
      icon: HomeFilled,
      page: <Info />
    },
    {
      key: "languages",
      header: 'Skills',
      page: <Skills />
    },
    {
      key: "experience",
      header: 'Experience',
      page: <Experience />
    },
    {
      key: "education",
      header: 'Education',
      page: <Education />
    },
  ];

  const backgroundClass = darkMode ? styles.pageBackgroundDark : styles.pageBackgroundLight;

  return (
    <FluentProvider theme={darkMode ? darkTheme : lightTheme} >
      <BrowserView className={mergeClasses(styles.pageContent, backgroundClass)}>
        <div className={styles.pageContentInner}>
          <div className={styles.leftContent}>
            <MattBadge />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.navBar} >
              <NavBar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <div className={styles.mainContent}>
              <div className={styles.mainContentInner}>
                {pages.filter(pageConfig => currentPage == pageConfig.key)[0].page}
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView className={mergeClasses(styles.mobilePageContent, backgroundClass)}>
        <div className={styles.mobilePageContentInner}>
          <NavBar useMobile={true} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className={styles.mobileMainContent}>
            <div className={styles.mobileMainContentInner}>
              {pages.filter(pageConfig => currentPage == pageConfig.key)[0].page}
            </div>
          </div>
        </div>
      </MobileView>
    </FluentProvider>
  )
}

export default Resume
