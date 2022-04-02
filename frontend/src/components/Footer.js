import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Footer = () => {
    return (
    <Card style={{ padding: '20px' }} bg='secondary' variant='secondary'>
        <Row>
            <Col sm={5}>
                <h5>Wir sind kaffeepause cum tempore...</h5>
                <p>...der Podcast, der dich vom Studentenleben ins Berufsleben begleitet</p>
            </Col>
            <Col sm={4}>
                <h5>Kontakt</h5>
                <p>Lena Simma & Jens Bergweiler</p>
                <p>Alfredstraße 9</p>
                <p>10365 Berlin</p>
                <p>E-Mail: kaffeepausecumtempore@gmail.com</p>
            </Col>
            <Col sm={3}>
                <h5>Informationspflicht</h5>
                <p>Impressum</p>
                <p>Datenschutz</p>
            </Col>
        </Row>
    </Card>
    )
}

export default Footer