
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'

const PodcastDetails = () => {
    
    const { id } = useParams()
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch(`https://finalproject-ls-2.herokuapp.com/episodes/${id}`)
        .then((res) => res.json())
        .then((details) => {
            setDetails(details)
        });
    }, [id]);

    return (
        <>
            <Card className="bg-dark text-white">
                <Card.Img src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Card image"/>
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
            {details.map((detail) => {
                return(
                    <Card key={detail.id}>
                    <Card.Body style={{ padding: '20px' }}>
                        <Card.Title>
                            <h1>
                                {detail.title}
                            </h1>
                        </Card.Title>
                        <Card.Text>
                            <p>
                                {detail.description}
                            </p>
                        </Card.Text>
                    </Card.Body>
                    <iframe style={{ padding: '15px' }} src={"https://open.spotify.com/embed-podcast/episode/0Czbp5OHT870Vuy8rOmLOn"} width="100%" height="232" title="podcast-episode" allowtransparency="true" allow="encrypted-media"></iframe>
                </Card>
                )
            })}
        </>
    );
}

export default PodcastDetails;
