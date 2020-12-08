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
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import axios_base from '../axios_base'
import Modal from 'react-bootstrap/Modal'

function City(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory()
    const [name, setName] = useState('')
    const [population, Setpopulation] = useState('')
    const [districts, setdistrict] = useState('')
    const [district, Setstate] = useState('')
    const [cities, Setcity] = useState('')
    const [id, Setcityid] = useState('')
    const [languages, Setlanguages] = useState(null)
    const axiosInstance = axios_base();

    console.log(props.location.state.update)

    useEffect(() => {
        axiosInstance.get(`/cities/${props.location.state.update_city_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            if (response.status == 200) {
                Setcity(response.data)
                const res = response.data
                res.map((city, i) => {
                    Setcityid(city.id)
                    Setpopulation(city.population)
                    setName(city.name)
                    Setstate(city.district)
                })
            }
            else {
                console.log("Something went wrong");
                alert("Something went wrong");
            }
        })
            .catch(function (error) {
                console.log(error);
                if (error.response.status==403){
                    history.push({
                        pathname: '/',
                    });
                }
            });

        axiosInstance.get(`/district/?country_code=${props.location.state.update}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                setdistrict(response.data)
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
    }, []);
    const handleClick = async (event) => {
        const countrycode = props.location.state.update
        await axiosInstance.post('/allCities/', { id, name, district, population, countrycode }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    console.log("Login successfull");
                    history.push({
                        pathname: '/city',
                        state: {
                            updates: props.location.state.update,
                        },
                    });
                }
                else {
                    console.log("Something went wrong");
                    alert("Something went wrong");
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status==403){
                    history.push({
                        pathname: '/',
                    });
                }
            });
    }
    const homeClick = async (contry) => {
        history.push({
            pathname: '/home',
        });
    }
    const regionClick = async (contry) => {
        console.log(props.location.state.update_continent)

        history.push({
            pathname: '/regions',
            state: {
                update_continent: props.location.state.update_region,
                update_continent: props.location.state.update_continent,
            },
        });

    }

    const countryClick = async (contry) => {
        console.log(props.location.state.updates)
        history.push({
            pathname: '/country',
            state: {
                update_region: props.location.state.update_region,
                update_continent: props.location.state.update_continent,
            },
        });

    }

    const cityClick = async (contry) => {
        console.log(props.location.state.updates)
        history.push({
            pathname: '/city',
            state: {
                update_continent: props.location.state.update_continent,
                update_region: props.location.state.update_region,
                updates: props.location.state.update,
            },
        });
    }
    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title={props.location.state.update}
                    />
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => homeClick()}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => regionClick()}>Region</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => countryClick()}>Country</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => cityClick()}>Cities</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
                    </Breadcrumb>
                    <Container>
                        {
                            cities && cities.map((city, i) => {
                                return (
                                    <Row className="justify-content-md-center">
                                        <Form xs lg="4">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="Enter name"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Population</Form.Label>
                                                <Form.Control type="number" placeholder="Population"
                                                    value={population}
                                                    onChange={(event) => Setpopulation(event.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Country Code</Form.Label>
                                                <Form.Control type="text" placeholder="Country Code" value={props.location.state.update} disabled />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control as="select" onChange={(event) => Setstate(event.target.value)}>
                                                    <option value={district}>{district}</option>
                                                    {
                                                        districts && districts.map((district, i) => {
                                                            return (
                                                                <option value={district}>{district}</option>)
                                                        })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button variant="primary" onClick={handleClick}>
                                                Submit
                                            </Button>
                                        </Form>
                                    </Row>)
                            })}
                    </Container>
                </div>
            </MuiThemeProvider>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default City
