import React, { useEffect, useState } from 'react'
import './randomChar.css'
import GotService from '../../services/gotService'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'

export default () => {
	const gotService = new GotService()

	const [state, setState] = useState({
		char: {},
		loading: true,
		error: false,
	})

	useEffect(() => {
		updateChar()
	}, [])

	useEffect(() => {
		const timerId = setInterval(updateChar, 9000)
		return () => clearInterval(timerId)
	}, [])

	const onCharLoaded = char => {
		setState({
			char,
			loading: false,
		})
	}

	const onError = err => {
		setState({
			error: true,
			loading: false,
		})
	}

	const updateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25) //25-140
		gotService.getCharacter(id).then(onCharLoaded).catch(onError)
	}

	const { char, loading, error } = state

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || error) ? <View char={char} /> : null

	return (
		<div className='random-block rounded'>
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}
const View = ({ char }) => {
	const { name, gender, born, died, culture } = char
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Gender </span>
					<span>{gender}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Born </span>
					<span>{born}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Died </span>
					<span>{died}</span>
				</li>
				<li className='list-group-item d-flex justify-content-between'>
					<span className='term'>Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	)
}
