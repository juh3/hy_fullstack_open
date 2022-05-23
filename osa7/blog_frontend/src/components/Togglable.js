import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </Stack>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={toggleVisibility}>
            cancel
          </Button>
        </Stack>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
