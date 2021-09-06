import React, { useState } from 'react'
import { Col, Row, Container } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import ErrorMessage from '../errorMessage'
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './app.css'

export default () => {
	const [state, setstate] = useState({
		showRandomChar: true,
		error: false,
		selectedHouse: 20,
	})

	// componentDidCatch() {
	// 	console.log('error')
	// 	setState({
	// 		error: true,
	// 	})
	// }

	const toggleRandomChar = () => {
		setstate(state => {
			return { showRandomChar: !state.showRandomChar }
		})
	}

	const char = state.showRandomChar ? <RandomChar /> : null

	if (state.error) {
		return <ErrorMessage />
	}

	return (
		<Router>
			<div className='app'>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							{char}
							<button className='toggle-btn' onClick={toggleRandomChar}>
								Toggle random character
							</button>
						</Col>
					</Row>
					<Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact />
					<Route path='/characters' component={CharacterPage} />
					<Route path='/books' component={BooksPage} exact />
					<Route
						path='/books/:id'
						render={({ match }) => {
							const { id } = match.params
							return <BooksItem bookId={id} />
						}}
					/>
					<Route path='/houses' component={HousesPage} />
				</Container>
			</div>
		</Router>
	)
}
