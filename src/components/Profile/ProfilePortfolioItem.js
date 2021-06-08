import { Accordion, Card } from 'react-bootstrap';

function ProfilePortfolioItem() {
	return (
		<Accordion>
			<Card className="mt-2">
				<Accordion.Toggle className="bg-white" as={Card.Header} eventKey="0">
					Portfolio item
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body>Hello! I'm the body</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

export default ProfilePortfolioItem;
