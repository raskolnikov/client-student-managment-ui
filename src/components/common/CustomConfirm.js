import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, Modal } from 'semantic-ui-react'

let resolve;
const defaultProps = {
  title: 'Confirmation',
  message: 'Are you sure?'
};
class CustomConfirm extends Component {
  static create(props = {}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<CustomConfirm createConfirmProps={props} />, containerElement);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, title, ...rest } = showConfirmProps;

    return (

        <Modal size='tiny' open={isOpen} onClose={this.handleCancel}>
            <Modal.Header>{title || defaultProps.title}</Modal.Header>
            <Modal.Content>
                <p>{message || defaultProps.message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={this.handleCancel}>No</Button>
                <Button onClick={this.handleConfirm}
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                />
            </Modal.Actions>
        </Modal>
    );
  }
}

export default CustomConfirm;
