window.onload = () => {

	const rows = Array.from({length: 8}, (v,k) => k+1)
	const columns = Array.from({length: 8}, (v,k) => k+1)
	for (row of rows) {
		for (column of columns) {
			document.querySelector('.grid-container').insertAdjacentHTML (
				'beforeend',
				'<div class="grid-item" data-row="${row}" data-column="${column}"></div>'
			)
		}
	}



	Array.from(document.getElementsByClassName('grid-item')).forEach(element => {
		element.addEventListener('click', (e) => {
			e.target.dataset.color = 'white';
		})
	})
}