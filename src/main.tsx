import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Resume from './Resume'
import { BrandVariants, createDarkTheme, createLightTheme, FluentProvider, Theme } from '@fluentui/react-components';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Resume />
  </StrictMode>,
)
