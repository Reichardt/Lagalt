import React from "react";
import { Button, Modal } from "react-bootstrap";

function SearchFilterModal({ show, handleClose }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Filter search</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SearchFilterModal;
