import React, { useState } from 'react'
import './itemList.css'
import Spinner from '../spinner'
import { useEffect } from 'react/cjs/react.development'

export default props => {
	const [state, setstate] = useState({ itemList: null })

	useEffect(() => {
		const { getData } = props
		getData().then(itemList => {
			setstate({
				itemList,
			})
		})
	})

	const renderItems = arr => {
		return arr.map(item => {
			const { id } = item

			const label = props.renderItem(item)

			return (
				<li key={id} className='list-group-item' onClick={() => props.onItemSelected(id)}>
					{label}
				</li>
			)
		})
	}

	const { itemList } = state

	if (!itemList) {
		return <Spinner />
	}

	const items = renderItems(itemList)

	return <ul className='item-list list-group'>{items}</ul>
}
