import React from 'react'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Home = () => {
    return (
    <>
    <Card className="bg-dark text-white text-center">
    <Card.Img className="thumbnail" style={{ height: '300px'}} src="https://arnowelzel.de/wp-content/uploads/2017/11/test-dark-640x480.png" />
    <Card.ImgOverlay>
        <Card.Title>kaffeepause cum tempore</Card.Title>
        <Card.Text>Vom Studentenleben ins Berufsleben: Der Podcast</Card.Text>
        <Card.Text>
        Spaghetti mit Pesto, WG-Partys. Diskussionen über Gott und die Welt: Das Studentenleben hat seine Vorzüge. Und in der Prüfungsphase verfluchen wir es doch manchmal. Aber schnell als man denkt, ist es vorbei und man steht mit beiden Beinen im Berufsleben. Der Wechsel wirkt viele Fragen auf. Den Fragen möchten wir mit den unterschiedlichsten Gesprächspartnern auf den Grund gehen. Lassen wir uns alle inspirieren.
        </Card.Text>
        <Link to={'/episodes/'}>
        <Button variant="secondary" size="lg">Zu den Folgen</Button>
        </Link>
    </Card.ImgOverlay>
    </Card>
    <Card>
    <Card.Img className="fluid" src="https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdyYWR1YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60" />
    </Card>
    </>
    )
}

export default Home