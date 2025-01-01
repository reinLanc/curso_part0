import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const ToggleMenu = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => ({ toggleVisibility }))

  return (
    <Box>
      {!visible ? (
        <Button variant="contained" color="primary" onClick={toggleVisibility} sx={{ marginBottom:2 }}>
          {props.buttonLabel}
        </Button>
      ) : (
        <Box sx={{ mt: 3 }}>
          {props.children}
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
            sx={{ marginTop: 2, marginBottom:2 }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

ToggleMenu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default ToggleMenu
