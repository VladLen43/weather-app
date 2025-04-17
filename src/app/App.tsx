import classes from './App.module.scss'
import { Header } from '../features/Header'
import { Outlet } from 'react-router-dom'
import { CssBaseline, GlobalStyles } from '@mui/material'

function App() {
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
        <Outlet />
      </div>
    </>
  )
}

export default App
