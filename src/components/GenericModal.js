import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class GenericModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    // This binding is necessary to make `this` work in the callback
    this.handleOpen = this.handleOpen.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleClose = this.handleClose.bind(this)


  }



  handleOpen = () => this.props.childProps.setModal(true);

  handleClose = () => this.props.childProps.setModal(false);

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.props.childProps.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content={this.props.childProps.modalHeading} />
        <Modal.Content>
          <h3>{this.props.childProps.modalMessage}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(GenericModal)