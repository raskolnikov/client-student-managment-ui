import React from 'react';
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'

export const YesNoModal = (props) => {

    const size = 'tiny'
    const { onClickYes, onClickNo, selectedItem, showModal, message } = props

    return (

        <Modal size={size} open={showModal} onClose={() => onClickNo()}>
            <Modal.Header>Please confirm</Modal.Header>
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => onClickNo()}>No</Button>
                <Button onClick={() => onClickYes(selectedItem)}
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Yes'
                />
            </Modal.Actions>
        </Modal>
    )

}

YesNoModal.propTypes = {
    onClickYes: PropTypes.func.isRequired,
    onClickNo: PropTypes.func.isRequired,
    application: PropTypes.objectOf(PropTypes.string),
    showModal: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
}
export default YesNoModal

