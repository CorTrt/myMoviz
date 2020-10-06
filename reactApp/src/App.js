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
			{ name: movieDatas.name, img: movieDatas.img },
		]);
	};

  /* Suppression d'un film de la likelist */
	let delFromList = (movieDatas) => {
		setMovieLikeList([
			...movieLikeList.filter((e) => e.name !== movieDatas.name),
		]);
	};

	/* Requette au back collecte des films depuis l'API */
	useEffect(() => {
		let getMoviesDatas = async () => {
			let rawResponse = await fetch('/get-movies');
			let response = await rawResponse.json();

			setMoviesDatas(response.results);

			console.log(response.results);
		};

		getMoviesDatas();
	}, []);

	const moviesList = moviesDatas.map((movie, i) => {

		let result = movieLikeList.find((item) => item.title == movie.name);
		let isLiked = false;
		if (result != undefined) {
			isLiked = true
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

	const wishListItems = movieLikeList.map((movie, i) => {
		return (
			<ListGroupItem>
				<div className='d-flex justify-content-center align-items-center'>
					<div>
						<Image
							style={{ height: '5em', width: '5em', marginRight: '1em' }}
							src={movie.img}
							roundedCircle
						/>
						{movie.name}
					</div>

					<FontAwesomeIcon
						onClick={() => delFromList({ name: movie.name, img: movie.img })}
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
