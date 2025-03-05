import { useState } from 'react'
import { NavBar, IPageConfig } from './NavBar'
import { Info } from './pages/info';
import { Skills } from './pages/skills';
import { Experience } from './pages/experience';
import { Education } from './pages/education';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  pageContent: {
    display: "flex",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
  },
});

function Resume() {
  const [ currentPage, setCurrentPage]  = useState("info")
  const styles = useStyles();
  const pages: Array<IPageConfig> = [
    {
      key: "info",
      header: 'Info',
      page: <Info />
    }, 
    {
      key: "languages",
      header: 'Language/Technologies',
      page: <Skills />
    }, 
    {
      key: "experience",
      header: 'Work Experience',
      page: <Experience />
    }, 
    {
      key: "education",
      header: 'Education',
      page: <Education />
    }, 
  ];

  return (
    <>
      <div className={styles.leftContent}>
        <div>Matthew T Brown</div>
      </div>
      <div className={styles.rightContent}>
        <NavBar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {pages.map(pageConfig => currentPage == pageConfig.key && pageConfig.page )}
      </div>
      
    </>
  )
}

export default Resume
