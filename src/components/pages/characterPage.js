import React, { useState } from 'react'
import ItemList from '../itemList'
import ItemDetails, { Field } from '../itemDetails'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'

export default () => {
	const gotService = new GotService()

	const [state, setstate] = useState({
		selectedChar: null,
		error: false,
	})

	const onItemSelected = id => {
		setstate({
			selectedChar: id,
		})
	}

	// componentDidCatch() {
	// 	setState({
	// 		error: true,
	// 	})
	// }

	if (state.error) {
		return <ErrorMessage />
	}

	const itemList = (
		<ItemList
			onItemSelected={onItemSelected}
			getData={gotService.getAllCharacters}
			renderItem={({ name, gender }) => `${name} (${gender})`}
		/>
	)

	const itemDetails = (
		<ItemDetails itemId={state.selectedChar} getData={gotService.getCharacter}>
			<Field field='gender' label='Gender' />
			<Field field='born' label='Born' />
			<Field field='died' label='Died' />
			<Field field='culture' label='Culture' />
		</ItemDetails>
	)

	return <RowBlock left={itemList} right={itemDetails} />
}
