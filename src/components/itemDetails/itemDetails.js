import React, { useEffect, useState } from 'react'
import './itemDetails.css'

const Field = ({ item, field, label }) => {
	return (
		<li className='list-group-item d-flex justify-content-between'>
			<span className='term'>{label}</span>
			<span>{item[field]}</span>
		</li>
	)
}

export { Field }

export default props => {
	const [state, setState] = useState({
		item: null,
	})

	const { itemId, getData } = props

	useEffect(
		prevProps => {
			updateItem()

			if (props.itemId !== prevProps?.itemId) {
				updateItem()
			}
		},
		[itemId]
	)

	const updateItem = () => {
		if (!itemId) {
			return
		}

		getData(itemId).then(item => {
			setState({ item })
		})
	}

	if (!state.item) {
		return <span className='select-error'>Please select item in the list</span>
	}
	const { item } = state
	const { name } = item

	return (
		<div className='char-details rounded'>
			<h4>{name}</h4>
			<ul className='list-group list-group-flush'>
				{React.Children.map(props.children, child => {
					return React.cloneElement(child, { item })
				})}
			</ul>
		</div>
	)
}
