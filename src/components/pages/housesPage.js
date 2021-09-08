import React, { useState } from 'react'
import ItemList from '../itemList'
import ItemDetails, { Field } from '../itemDetails'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'

export default () => {
	const gotService = new GotService()

	const [state, setstate] = useState({
		selectedHouse: null,
	})

	const onItemSelected = id => {
		setstate({
			selectedHouse: id,
		})
	}

	const itemList = (
		<ItemList
			onItemSelected={onItemSelected}
			getData={gotService.getAllHouses}
			renderItem={({ name }) => name}
		/>
	)

	const itemDetails = (
		<ItemDetails itemId={state.selectedHouse} getData={gotService.getHouse}>
			<Field field='region' label='Region' />
			<Field field='words' label='Words' />
			<Field field='titles' label='Titles' />
			<Field field='ancestralWeapons' label='Ancestral Weapons' />
		</ItemDetails>
	)

	try {
		return <RowBlock left={itemList} right={itemDetails} />
	} catch {
		return <ErrorMessage />
	}
}
