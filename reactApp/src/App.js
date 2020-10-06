import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

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
  ListGroupItem
} from 'reactstrap';

import { 
  Button,
  Image
} from 'react-bootstrap';

import Moviz from './moviz'

import './App.css';

function App() {

  const moviesDatas = [
    {
      name: 'Frozen',
      desc: 'Un film glaçant.',
      img: '/img/frozen.jpg',
      note: 6.7,
      vote: 7
    },
    {
      name: 'BadBoy 3',
      desc: 'Un film méchant.',
      img: '/img/badboy3.jpg',
      note: 5.3,
      vote: 4
    },
    {
      name: 'Jumanji',
      desc: 'Un film sauvage.',
      img: '/img/jumanji.jpg',
      note: 4.8,
      vote: 6
    },
    {
      name: 'Maléfique',
      desc: 'Un film maléfique.',
      img: '/img/maleficent.jpg',
      note: 6.4,
      vote: 11
    },
    {
      name: 'Il était une fois',
      desc: 'Un film casse-cou.',
      img: '/img/once_upon.jpg',
      note: 5.8,
      vote: 9
    },
    {
      name: 'Star-Wars',
      desc: 'Un film fort.',
      img: '/img/starwars.jpg',
      note: 10,
      vote: 16
    },
    {
      name: 'Terminator',
      desc: 'Un film mécanique.',
      img: '/img/terminator.jpg',
      note: 6.3,
      vote: 5
    },
  ]

  const [isOpen, setIsOpen] = useState(false);
  const [movieLikeList, setMovieLikeList] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const [liked, setLiked] = useState(false);


  /* Ajouter un film */
  let addToList = (movieDatas) => {
      setMovieLikeList([...movieLikeList, {name: movieDatas.name, img: movieDatas.img}]);
      setLiked(true);
  }

  let delFromList = (movieDatas) => {
          setMovieLikeList([...movieLikeList.filter((e) => e.name !== movieDatas.name)]);
          setLiked(false);
  }


  /* Requette au back collecte des films depuis l'API */
  useEffect(() => {    
    
    let getMoviesDatas = async () => {
      
      let rawResponse = await fetch('/likelist-movie');
      let response = rawResponse.json();
      
      console.log(response)
    }

    getMoviesDatas()
   
  }, []);


  const moviesList = moviesDatas.map((movie, i) => {

    var result = movieLikeList.find(item => item.name == movie.name);
    var isSee = false
    if(result != undefined){
      isSee = true
    }

    return(
      <Moviz addListParent={addToList} delListParent={delFromList} liked={isSee} movieName={movie.name} movieDesc={movie.desc} movieImg={movie.img} movieNote={movie.note} movieVote={movie.vote} />
    )
  })

  const wishListItems = movieLikeList.map((movie, i) => {
    return(
      <ListGroupItem>
        <div className='d-flex justify-content-center align-items-center'>
          <div>
            <Image style={{height:'5em', width:'5em', marginRight:'1em'}} src={movie.img} roundedCircle />{movie.name}
          </div>

          <FontAwesomeIcon onClick={()=>delFromList({name: movie.name, img: movie.img})} style={{marginLeft:'1em'}} icon={faTimesCircle} />
        </div>
      </ListGroupItem>
    )
  }) 

  return (

    <div style={{backgroundColor:'#333333'}}>
      <Container>

        <Row>
            <Col>

            <div>
                <Navbar color="dark" light expand="md">
                  <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto d-flex align-items-center justify-content-center" navbar>
                      
                      <NavItem>
                        <NavLink href="/components/">
                            <img src='/img/logo.png' alt='logo' />
                        </NavLink>
                      </NavItem>

                      <Button id='Popover1' type='button' style={{height:'50%', marginLeft: '5em'}} variant="outline-warning">{movieLikeList.length} Films likés</Button>
                    
                      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                        <PopoverHeader>Like List</PopoverHeader>
                          <PopoverBody>
                            <ListGroup variant='flush'>
                              {wishListItems.length === 0 ? <p>Il faut ajouter un film ;)</p> : wishListItems}
                            </ListGroup>
                          </PopoverBody>
                      </Popover>
                      
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
            
            </Col>
        </Row>

        <Row style={{marginTop:30}}>
            
              {moviesList}
              
        </Row>


      </Container>
    </div>

  );

}

export default App;
