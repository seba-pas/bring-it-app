import React from 'react'
import '../styles/Modal.css'

const Modal = ({ isOpen, closeModal, title, children }) => {

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <h1>{ title }</h1> 
                <button className='btn-delete' onClick={closeModal}>
                    X
                </button>

                {children}

            </div>
        </div>
    )
}

export default Modal