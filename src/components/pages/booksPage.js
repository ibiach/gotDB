import React, { useState } from 'react'
import ItemList from '../itemList'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import { withRouter } from 'react-router-dom'

const BooksPage = props => {
	const gotService = new GotService()

	const [state, setState] = useState({
		selectedBook: null,
		error: false,
	})

	function onItemSelected(id) {
		setState({ selectedBook: id })
	}

	// componentDidCatch() {
	// setState({
	// 		error: true,
	// 	})
	// }

	if (state.error) {
		return <ErrorMessage />
	}

	return (
		<ItemList
			onItemSelected={itemId => {
				props.history.push(itemId)
			}}
			getData={gotService.getAllBooks}
			renderItem={({ name }) => name}
		/>
	)
}
export default withRouter(BooksPage)
