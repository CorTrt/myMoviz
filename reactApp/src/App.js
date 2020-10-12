import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
	Container,
	Row,
	Col,
	Collapse,
	Navbar,
	Nav,
	NavItem,
	NavLink,
	Popover,
	PopoverHeader,
	PopoverBody,
	ListGroup,
	ListGroupItem,
} from 'reactstrap';

import { Button, Image } from 'react-bootstrap';

import Moviz from './moviz';

import './App.css';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [movieLikeList, setMovieLikeList] = useState([]);
	const [moviesDatas, setMoviesDatas] = useState([]);

	const [popoverOpen, setPopoverOpen] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);

	/* Ajouter un film en likelist*/
	let addToList = (movieDatas) => {
		setMovieLikeList([
			...movieLikeList,
			{ title: movieDatas.title, image: movieDatas.image },
		]);
	};

	/* Suppression d'un film de la likelist */
	let delFromList = async (movieDatas) => {

		let rawResponse = await fetch(`/likelist-movie/${movieDatas.title}`, {
			method: 'DELETE',
		});
		let response = await rawResponse.json();

		setMovieLikeList([
			...movieLikeList.filter((e) => e.title !== movieDatas.title),
		]);
	};

	/* Requette au back collecte des films depuis l'API */
	/* Requette au back collecte des films en likeList */
	useEffect(() => {
		let getMoviesDatas = async () => {
			let rawResponse = await fetch('/get-movies');
			let response = await rawResponse.json();

			setMoviesDatas(response.results);
		};
		let getLikelist = async () => {
			let rawResponse = await fetch('/likelist-movie');
			let response = await rawResponse.json();
			setMovieLikeList(response);
		};

		getMoviesDatas();
		getLikelist();
	}, []);

	var moviesList = moviesDatas.map((movie, i) => {
		var result = movieLikeList.find((item) => item.title === movie.title);

		var isLiked = false;
		if (result != undefined) {
			isLiked = true;
		}

		return (
			<Moviz
				addListParent={addToList}
				delListParent={delFromList}
				liked={isLiked}
				movieName={movie.title}
				movieDesc={movie.overview}
				movieImg={movie.backdrop_path}
				movieNote={movie.vote_average}
				movieVote={movie.vote_count}
			/>
		);
	});

	var wishListItems = movieLikeList.map((movie, i) => {
		return (
			<ListGroupItem>
				<div className='d-flex justify-content-center align-items-center'>
					<div>
						<Image
							style={{ height: '5em', width: '5em', marginRight: '1em' }}
							src={`https://image.tmdb.org/t/p/w500${movie.image}`}
							roundedCircle
						/>
						{movie.title}
					</div>

					<FontAwesomeIcon
						onClick={() =>
							delFromList({ title: movie.title, image: movie.image })
						}
						style={{ marginLeft: '1em' }}
						icon={faTimesCircle}
					/>
				</div>
			</ListGroupItem>
		);
	});

	return (
		<div style={{ backgroundColor: '#333333' }}>
			<Container>
				<Row>
					<Col>
						<div>
							<Navbar color='dark' light expand='md'>
								<Collapse isOpen={isOpen} navbar>
									<Nav
										className='mr-auto d-flex align-items-center justify-content-center'
										navbar>
										<NavItem>
											<NavLink href='/components/'>
												<img src='/img/logo.png' alt='logo' />
											</NavLink>
										</NavItem>

										<Button
											id='Popover1'
											type='button'
											style={{ height: '50%', marginLeft: '5em' }}
											variant='outline-warning'>
											{movieLikeList.length} Films likés
										</Button>

										<Popover
											placement='bottom'
											isOpen={popoverOpen}
											target='Popover1'
											toggle={toggle}>
											<PopoverHeader>Like List</PopoverHeader>
											<PopoverBody>
												<ListGroup variant='flush'>
													{wishListItems.length === 0 ? (
														<p>Il faut ajouter un film ;)</p>
													) : (
														wishListItems
													)}
												</ListGroup>
											</PopoverBody>
										</Popover>
									</Nav>
								</Collapse>
							</Navbar>
						</div>
					</Col>
				</Row>

				<Row style={{ marginTop: 30 }}>{moviesList}</Row>
			</Container>
		</div>
	);
}

export default App;
