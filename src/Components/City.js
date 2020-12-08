import React, { useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Card, Row } from 'react-bootstrap'
import { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios_base from '../axios_base'
import Modal from 'react-bootstrap/Modal'


function City(props) {
    const [show, setShow] = useState(false);
    const [city_id, setcity_id] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (city_id) => {
        setShow(true);
        setcity_id(city_id)
    };

    const history = useHistory()
    const axiosInstance = axios_base();
    const [cities, Setcities] = useState(null)
    const [languages, Setlanguages] = useState(null)
    const [countries, Setcountries] = useState(null)

    useEffect(() => {
        axiosInstance.get(`/city/?country_code=${props.location.state.updates}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            if (response.status == 200) {
                console.log("successfull");
                Setcities(response.data)
            }
            else {
                console.log("Username does not exists");
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


        axiosInstance.get(`/countrylanguage/?country_code=${props.location.state.updates}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                Setlanguages(response.data)
                console.log("successfull");
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


        axiosInstance.get(`/getcountry/?country_code=${props.location.state.updates}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                console.log("successfull");
                Setcountries(response.data)
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
    const handleClick = async () => {
        history.push({
            pathname: '/createcity',
            state: {
                update: props.location.state.updates,
                update_continent: props.location.state.update_continent,
                update_region: props.location.state.update_region,
                update_city: props.location.state.updates,
            },
        });
    }
    const deleteCity = (city_id) => {
        setShow(false)
        axiosInstance.delete(`/cities/${city_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {

            console.log(response);
            if (response.status == 200) {
                console.log("successfull");
                window.location.reload();
                history.push({
                    pathname: '/city',
                    state: {
                        updates: props.location.state.updates,
                    },
                });
            }
            else {
                console.log("City not deleted..");
                alert("City not deleted..");
            }
        }).catch(function (error) {
            console.log(error);
            if (error.response.status==403){
                history.push({
                    pathname: '/',
                });
            }
        });

    }

    const editCity = (city_id) => {
        history.push({
            pathname: '/editcity',
            state: {
                update: props.location.state.updates,
                update_continent: props.location.state.update_continent,
                update_region: props.location.state.update_region,
                update_city: props.location.state.updates,
                update_city_id: city_id,
            },
        });
    }

    const homeClick = async (contry) => {
        history.push({
            pathname: '/home',
        });
    }
    const regionClick = async (contry) => {
        history.push({
            pathname: '/regions',
            state: {
                update_continent: props.location.state.update_region,
                update_continent: props.location.state.update_continent,
            },
        });
    }

    const countryClick = async (contry) => {
        history.push({
            pathname: '/country',
            state: {
                update_region: props.location.state.update_region,
                update_continent: props.location.state.update_continent,
            },
        });
    }

    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="City"
                    />
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => homeClick()}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => regionClick()}>Region</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => countryClick()}>Country</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cities</Breadcrumb.Item>
                    </Breadcrumb>
                    <Container>
                        <Row className="justify-content-md-center">
                            {
                                countries && countries.map((contry, i) => {
                                    return (
                                        <Card style={{ width: '18rem' }} key={i}>
                                            <Card.Body>
                                                <Card.Title>{contry.name}</Card.Title>
                                                <Card.Text>
                                                    Population : {contry.population}
                                                </Card.Text>
                                                <Card.Text>
                                                    Head of state : {contry.headofstate}
                                                </Card.Text>
                                                <Card.Text>
                                                    Local Name : {contry.localname}
                                                </Card.Text>
                                                <Card.Text>
                                                    Country Code : {contry.code}
                                                </Card.Text>
                                                <Card.Text>
                                                    Independent Year : {contry.indepyear}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                    <Button variant="primary" onClick={() => handleClick()}>Create New City</Button>{' '}
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="profile" title="City">
                            <Row>
                                {
                                    cities && cities.map((city, i) => {
                                        return (
                                            <Card style={{ width: '18rem' }} key={i} >
                                                <Card.Body>
                                                    <Card.Title>{city.name}</Card.Title>
                                                    <Card.Text>
                                                        Population : {city.population}
                                                    </Card.Text>
                                                    <Button variant="warning" size="sm" onClick={() => editCity(city.id)}>Edit</Button>{' '}
                                                    <Button variant="danger" ty size="sm" onClick={() => handleShow(city.id)}  >Delete</Button>{' '}
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="language" title="Language">
                            <Row>
                                {
                                    languages && languages.map((language, i) => {
                                        return (
                                            <Card style={{ width: '18rem' }} key={i} onClick={() => handleClick(language.language)}>
                                                <Card.Body>
                                                    <Card.Title>{language.language}</Card.Title>
                                                    <Card.Text>
                                                        Percentage : {language.percentage}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </MuiThemeProvider>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete city</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure ..!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={() => deleteCity(city_id)}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default City
