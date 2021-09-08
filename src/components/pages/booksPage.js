import React, { useState } from 'react'
import ItemList from '../itemList'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import { withRouter } from 'react-router-dom'

const BooksPage = props => {
	const gotService = new GotService()

	try {
		return (
			<ItemList
				onItemSelected={itemId => {
					props.history.push(itemId)
				}}
				getData={gotService.getAllBooks}
				renderItem={({ name }) => name}
			/>
		)
	} catch {
		return <ErrorMessage />
	}
}
export default withRouter(BooksPage)
