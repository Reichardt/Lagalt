import { Accordion, Card } from "react-bootstrap";
import { useState } from "react";

function ProfilePortfolioItem({ checked, title, body }) {
    const [state, setState] = useState({
        itemTitle: title,
        itemBody: body,
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = () => {
        console.log("Deleting");
    };

    const renderPortfolioTitle = () => {
        return state.itemTitle;
    };

    const renderPortfolioEditableTitle = () => {
        return (
            <div className='d-flex justify-content-between align-items-center'>
                <input
                    className='form-control skill-editable'
                    onChange={handleChange}
                    value={state.itemTitle}
                    type='text'
                    name='itemTitle'
                />
                <button className='btn btn-primary' onClick={handleDelete}>
                    Delete item
                </button>
            </div>
        );
    };

    const renderPortfolioBody = () => {
        return state.itemBody;
    };

    const renderPortfolioEditableBody = () => {
        return (
            <div className='d-flex justify-content-between align-items-center'>
                <input
                    className='form-control skill-editable'
                    onChange={handleChange}
                    value={state.itemBody}
                    type='text'
                    name='itemBody'
                />
            </div>
        );
    };
    return (
        <Accordion>
            <Card className='mt-2'>
                <Accordion.Toggle
                    className='bg-white'
                    as={Card.Header}
                    eventKey='0'>
                    {checked
                        ? renderPortfolioEditableTitle()
                        : renderPortfolioTitle()}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                        {checked
                            ? renderPortfolioEditableBody()
                            : renderPortfolioBody()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default ProfilePortfolioItem;
