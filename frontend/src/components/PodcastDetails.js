
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'

const PodcastDetails = () => {
    
    const { id } = useParams()
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/episodes/id/:id")
        .then((res) => res.json())
        .then((data) => {
            setDetails(data);
        });
    }, [id]);

    return (
        <>
        <Card className="bg-dark text-white">
            <Card.Img src={details.image} alt="Card image"/>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                    erat a ante.{' '}
                </p>
                <footer className="blockquote-footer">
                    Jens Bergweiler <cite title="Source Title">über den Einstieg ins Berufsleben</cite>
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body style={{ padding: '20px' }}>
                <Card.Title>
                    <h1>
                        {details.title}
                    </h1>
                </Card.Title>
                <Card.Text>
                    <p>
                        {details.description}
                    </p>
                </Card.Text>
            </Card.Body>
            <iframe style={{ padding: '15px' }} src={"https://open.spotify.com/embed-podcast/episode/0Czbp5OHT870Vuy8rOmLOn"} width="100%" height="232" title="podcast-episode" allowtransparency="true" allow="encrypted-media"></iframe>
        </Card>
        </>
    );
}

export default PodcastDetails;