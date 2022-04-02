
import React, {useEffect, useState} from "react"
import {Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


const PodcastOverview = () => {
    
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
    fetch("http://localhost:8080/episodes")
        .then((res) => res.json())
        .then((episodes) => setEpisodes(episodes));
    }, []);

    return (
        <>
       <Row xs={1} md={2} className="g-4" style={{ padding: '75px' }}>
        {episodes.map((episode) => { 
            return (
                <Col style={{ padding: '15px' }} key={episode._id}>
                    <Card style={{ padding: '10px' }}>
                    <Card.Img 
                    variant="top"
                    class="img-fluid"
                    style={{ padding: '15px' }}
                    src={episode.image}
                    alt={episode.title}
                    width = "calc(100% - 20px)"
                    />
                        <Card.Body>
                            <Card.Title>
                                {episode.title}
                            </Card.Title>
                            <Card.Text>
                                {episode.episodenumber}
                                {episode.description}
                                {episode.release_date}
                            </Card.Text>
                        </Card.Body>
                <Link className="episode" key={episode._id} to={`/episodes/id/${episode._id}`}>
                    <Button variant="outline-dark" style={{ margin: '15px' }}>Hör rein</Button>
                    </Link>
                    </Card>
                </Col>
            )
        })}
        </Row>
        </>
    );
}

export default PodcastOverview;