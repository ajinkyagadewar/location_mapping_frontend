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
import axios_base from '../axios_base'

function Country(props) {
    const history = useHistory()
    const axiosInstance = axios_base();
    const [countries, Setcountries] = useState(null)
    useEffect(() => {
        axiosInstance.get(`/country/?region=${props.location.state.update_region}`, {
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

    const handleClick = async (contry) => {
        history.push({
            pathname: '/city',
            state: {
                updates: contry.code,
                update_continent: props.location.state.update_continent,
                update_region: props.location.state.update_region,
            },
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

    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title='Countries'
                    />
                    <h3>{props.location.state.update_region}</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => homeClick()}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => regionClick()}>Region</Breadcrumb.Item>
                        <Breadcrumb.Item active>Country</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        {
                            countries && countries.map((contry, i) => {
                                return (
                                    <Card style={{ width: '18rem' }} key={i} >
                                        <Card.Body>
                                            <Card.Title>{contry.name}</Card.Title>
                                            <Card.Text>
                                                Population : {contry.population}
                                            </Card.Text>
                                            <Button variant="warning" size="sm" onClick={() => handleClick(contry)}>View</Button>{' '}
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </Row>
                </div>
            </MuiThemeProvider>
        </div>
    )
}

export default Country
