import ReactDom from 'react-dom';

function SearchOverlay() {
	return ReactDom.createPortal(
		<div className="search-overlay"></div>,
		document.getElementById('overlay')
	);
}

export default SearchOverlay;
