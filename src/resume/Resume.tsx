import { FluentProvider, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { HomeFilled } from "@fluentui/react-icons";
import { useEffect, useState } from 'react';
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
    padding: "48px",
    backgroundColor: tokens.colorNeutralBackground3,
    height: "-webkit-fill-available",
    overflowY: "auto"
  },
  navBar: {
    margin: tokens.spacingVerticalXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground3,
  }
});

function Resume() {
  const [currentPage, setCurrentPage] = useState("info");
  const [darkMode, setDarkMode] = useState(false)
  useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setDarkMode(isSystemDark)
  );
  useEffect
  const styles = useStyles();
  const pages: Array<IPageConfig> = [
    {
      key: "info",
      icon: HomeFilled,
      page: <Info />
    },
    {
      key: "languages",
      header: 'SKILLS',
      page: <Skills />
    },
    {
      key: "experience",
      header: 'EXPERIENCE',
      page: <Experience />
    },
    {
      key: "education",
      header: 'EDUCATION',
      page: <Education />
    },
  ];

  const backgroundClass = darkMode ? styles.pageBackgroundDark : styles.pageBackgroundLight;

  return (
    <FluentProvider theme={darkMode ? darkTheme : lightTheme} >
      <div className={mergeClasses(styles.pageContent, backgroundClass)}>
        <div className={styles.pageContentInner}>
          <div className={styles.leftContent}>
            <MattBadge />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.navBar} >
              <NavBar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <div className={styles.mainContent}>
              {pages.filter(pageConfig => currentPage == pageConfig.key)[0].page}
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  )
}

export default Resume
