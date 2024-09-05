import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';
import Button from '../Button';
const CustomModal = ({ title, content, check, onClose }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(true);

        let timer;
        if (!check) {
            timer = setTimeout(() => {
                setModalIsOpen(false);
                onClose();
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [check, onClose]);

    const closeModal = () => {
        if (onClose) {
            onClose();
            return;
        }
        setModalIsOpen(false);
        onClose();
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="custom-modal"
            overlayClassName="custom-overlay"
            appElement={document.getElementById('root')}
        >
            <div className="modal-header">
                <h2>{title}</h2>
            </div>
            <div className="modal-body">
                <p>{content}</p>
            </div>
            <div className="modal-footer">
                {check && <Button onClick={closeModal} text="확인"></Button>}
            </div>
        </Modal>
    );
};

export default CustomModal;
