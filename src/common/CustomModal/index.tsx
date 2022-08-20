import React from 'react'
import Modal from 'react-modal'

interface CustomModalType {
  isOpen: boolean
  onRequestClose: () => void
  children: any
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export const CustomModal = ({ isOpen, onRequestClose, children }: CustomModalType) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="custom-modal">{children}</div>
    </Modal>
  )
}
