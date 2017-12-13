import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ErrorModal = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)
export default withRouter(ErrorModal)