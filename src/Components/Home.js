import React, { useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { useHistory } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import axios_base from '../axios_base'
import Container from 'react-bootstrap/Container'

function Home() {
    const history = useHistory()
    const [continents, Setcontinents] = useState(null)
    const axiosInstance = axios_base();

    useEffect(() => {
        axiosInstance.get('/continents/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                console.log("Login successfull");
                Setcontinents(response.data)
            }
            else {
                console.log("Something went wrong");
                alert("Something went wrong");
            }
        }).catch(function (error) {
            console.log(error);
            if (error.response.status==403){
                history.push({
                    pathname: '/',
                });
            }
        });
    }, []);
    const handleClick = async (continent) => {
        history.push({
            pathname: '/regions',
            state: {
                update_continent: continent,
            },
        });
    }
    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Continents"
                    />
                     <Container>
                        <Row className="justify-content-md-center">
                    <Row>
                        {
                            continents && continents.map((continent, i) => {
                                return (
                                    <Card border="secondary"  style={{ width: '18rem', height: '18rem', 'font-size': '2rem' }} key={i} onClick={() => handleClick(continent)}>
                                        <Card.Body>
                                            <Card.Title className="justify-content-md-center" style={{'line-height': '1000%'}}>{continent}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </Row>
                    </Row>

                    </Container>

                </div>
            </MuiThemeProvider>
        </div>
    )
}

export default Home
