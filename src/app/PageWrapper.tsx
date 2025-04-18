import classes from './PageWrapper.module.scss'
import { Header } from '../features/Header'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { Charts } from '../features/Charts'

function PageWrapper() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            transition: 'background-color 0.3s ease',
          },
        }}
      />
      <div className={classes.container}>
        <Header />
        <Charts />
      </div>
    </>
  )
}

export default PageWrapper
