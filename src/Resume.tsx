import { useState } from 'react'
import { NavBar, IPageConfig } from './NavBar'
import { Info } from './pages/info';
import { Skills } from './pages/skills';
import { Experience } from './pages/experience';
import { Education } from './pages/education';

function Resume() {
  const [ currentPage, setCurrentPage]  = useState("info")
  const pages: Array<IPageConfig> = [
    {
      name: "info",
      header: 'Info',
      page: <Info />
    }, 
    {
      name: "languages",
      header: 'Language/Technologies',
      page: <Skills />
    }, 
    {
      name: "experience",
      header: 'Work Experience',
      page: <Experience />
    }, 
    {
      name: "education",
      header: 'Education',
      page: <Education />
    }, 
  ];

  return (
    <>
      <div>Matthew T Brown</div>
      <NavBar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {pages.map(pageConfig => currentPage == pageConfig.name && pageConfig.page )}
    </>
  )
}

export default Resume
