import React from 'react'
import GotService from '../../services/gotService'
import ItemDetails, { Field } from '../itemDetails'

export default props => {
	const gotService = new GotService()

	return (
		<ItemDetails itemId={props.bookId} getData={gotService.getBook}>
			<Field field='numberOfPages' label='Number of pages' />
			<Field field='publisher' label='Publisher' />
			<Field field='released' label='Released' />
		</ItemDetails>
	)
}
