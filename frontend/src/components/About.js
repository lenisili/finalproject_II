import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel'

const AboutUs = () => {
    return (
    <>
    <Card className="bg-dark text-white text-center">
    <Card.Img class="thumbnail" style={{ height: '250px'}} src="https://arnowelzel.de/wp-content/uploads/2017/11/test-dark-640x480.png" />
    <Card.ImgOverlay style={{ padding: '75px'}}>
        <Card.Title>
        <h1>Wir nehmen dich mit ins Berufsleben</h1>
        </Card.Title>
        <Card.Text>
        <p>Wir sind vor nicht allzu langer Seite ins Berufsleben eingestiegen. Der Umstieg vom wunderschöenen und wilden Studentenleben ins Berufsleben war wie erwartet und doch komplett anders. Wir möchten euch auf diesem Weg begleiten und euch Mut machen, euren Weg zu gehen!</p>
        </Card.Text>
    </Card.ImgOverlay>
    </Card>

    <Accordion defaultActiveKey="0" style={{ padding: '50px' }}>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Woher</Accordion.Header>
        <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Warum</Accordion.Header>
        <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
        <Accordion.Header>Wohin</Accordion.Header>
        <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
        </Accordion.Body>
    </Accordion.Item>
    </Accordion>

    <Carousel style={{ padding: '50px' }}>
    <Carousel.Item>
        <img
        className="d-block w-100"
        src="https://arnowelzel.de/wp-content/uploads/2017/11/test-dark-640x480.png"
        alt="First slide"
        />
        <Carousel.Caption>
        <h3>Wer wir sind</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        <img
        className="d-block w-100"
        src="https://arnowelzel.de/wp-content/uploads/2017/11/test-dark-640x480.png"
        alt="Second slide"
        />

        <Carousel.Caption>
        <h3>Lena Simma</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        <img
        className="d-block w-100"
        src="https://arnowelzel.de/wp-content/uploads/2017/11/test-dark-640x480.png"
        alt="Third slide"
        />

        <Carousel.Caption>
        <h3>Jens Bergweiler</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
    </>
    )
}

export default AboutUs