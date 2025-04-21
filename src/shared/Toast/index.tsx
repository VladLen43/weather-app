import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { JSX } from 'react'

interface Props {
  handleOpen: (arg: boolean) => void
  open: boolean
  message: string
}
export const Toast = ({ handleOpen, open, message }: Props): JSX.Element => {
  const handleClose = (_: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    handleOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} action={action} />
}
