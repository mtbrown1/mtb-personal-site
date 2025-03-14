import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Resume from './resume/Resume'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Resume />
  </StrictMode>,
)
