import React, { useEffect, useState } from 'react';

import { Col, Card, CardImg, CardBody, CardText, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faStar,
	faVideo,
	faArrowDown,
	faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

function Moovie(props) {
	const [watchMovie, setWatchMovie] = useState(false);
	const [myRatingMovie, setMyRatingMovie] = useState(5);
	const [countWatchMouvie, setCountWatchMouvie] = useState(0);
	const [globalRatingMovie, setGlobalRatingMovie] = useState(props.movieNote);
	const [countRating, setCountRating] = useState(props.movieVote);
	const [alreadyVoted, setAlreadyVoted] = useState(false);
	const [longDesc, setLongDesc] = useState(false);

  /* Définition de la couleur des pictos coeur */
  let colorHeart = '';
  console.log('PROPS.LIKED ==', props.liked);
	if (props.liked === true) {
		colorHeart = '#e74c3C';
	} else {
		colorHeart = '';
	}

	let clickWatch = () => {
		setWatchMovie(true);
		setCountWatchMouvie(countWatchMouvie + 1);
	};

	/* Modifie la note de l'utilisateur avec MouseHover (avant le clique) */
	let mouseHoverRating = (id) => {
		if (alreadyVoted === false) {
			setMyRatingMovie(id);
		}
	};

	/* Valide la note de l'utilisateur */
	let clickRating = (id) => {
		setCountRating(props.movieVote + 1);
		setAlreadyVoted(true);
		setMyRatingMovie(id);
	};

	let likeListParent = async (movieDatas) => {
    console.log('MOVIEDATAS ==', movieDatas);
		if (props.liked === false) {
			props.addListParent(movieDatas);

			let rawResponse = await fetch(
				'/likelist-movie',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: `title=${props.movieName}&image=${props.movieImg}`,
				}
			);
			let response = rawResponse.json();
		}

		if (props.liked === true) {
			props.delListParent(movieDatas);

			let rawResponse = await fetch(`/likelist-movie/${props.movieName}`, {
				method: 'DELETE',
			});
			let response = await rawResponse.json();
		}
	};

	/* Calcul note moyenne du film */
	let totalRating = (globalRatingMovie + myRatingMovie) / 2;

	let myRatingStars = [];
	for (let i = 0; i < 10; i++) {
		var starColor = 'black';
		if (alreadyVoted === false) {
			let action = 'onMouseOver';
		} else {
			let action = 'onClick';
		}
		if (i < myRatingMovie) {
			starColor = '#f1c40f';
		}
		myRatingStars.push(
			<FontAwesomeIcon
				onMouseOver={() => mouseHoverRating(i + 1)}
				onClick={() => clickRating(i + 1)}
				style={{ color: starColor }}
				icon={faStar}
			/>
		);
	}

	var globalRatingStars = [];
	for (let i = 0; i < 10; i++) {
		var starColor = 'black';
		if (i < totalRating) {
			starColor = '#f1c40f';
		}
		globalRatingStars.push(
			<FontAwesomeIcon style={{ color: starColor }} icon={faStar} />
		);
	}

	let shortDesc = props.movieDesc;
	if (longDesc === false) {
		if (shortDesc.length > 80) {
			shortDesc = `${shortDesc.slice(0, 80)}...`;
		}
	}

	return (
		<Col xs='12' lg='6' xl='4'>
			<div style={{ marginBottom: 10 }}>
				<Card>
					<CardImg
						top
						width='100%'
						src={`https://image.tmdb.org/t/p/w500${props.movieImg}`}
						alt={`${props.movieName} Image`}
					/>
					<CardBody>
						<CardText style={{ marginTop: 5, marginBottom: 5 }}>
							{' '}
							Likes{' '}
							<FontAwesomeIcon
								onClick={() => {
									likeListParent({
										name: props.movieName,
										img: props.movieImg,
									});
								}}
								style={{ cursor: 'pointer', color: colorHeart }}
								icon={faHeart}
							/>{' '}
						</CardText>
						<CardText style={{ marginTop: 5, marginBottom: 5 }}>
							{' '}
							Nombre de vues
							<FontAwesomeIcon
								onClick={() => clickWatch()}
								style={{
									cursor: 'pointer',
									marginLeft: '1em',
									marginRight: '0.5em',
								}}
								icon={faVideo}
							/>
							({countWatchMouvie})
						</CardText>
						<CardText style={{ marginTop: 5, marginBottom: 5 }}>
							{' '}
							Mon avis
							{myRatingStars}({myRatingMovie})
						</CardText>
						<CardText style={{ marginTop: 5, marginBottom: 5 }}>
							Moyenne {globalRatingStars} ({countRating})
						</CardText>
						<CardText style={{ marginTop: 5, marginBottom: 5 }}>
							<h5>{props.movieName}</h5>
						</CardText>
						{longDesc === false ? (
							<>
								<CardText style={{ marginTop: 5, marginBottom: 5 }}>
									<h6>{shortDesc}</h6>
								</CardText>
								<FontAwesomeIcon
									onClick={() => {
										setLongDesc(!longDesc);
									}}
									style={{ cursor: 'pointer', color: '#FFC104' }}
									icon={faArrowDown}
								/>
							</>
						) : (
							<>
								<CardText style={{ marginTop: 5, marginBottom: 5 }}>
									<h6>{shortDesc}</h6>
								</CardText>
								<FontAwesomeIcon
									onClick={() => {
										setLongDesc(!longDesc);
									}}
									style={{ cursor: 'pointer', color: '#FFC104' }}
									icon={faArrowUp}
								/>
							</>
						)}
					</CardBody>
				</Card>
			</div>
		</Col>
	);
}

export default Moovie;
