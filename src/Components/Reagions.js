import React, { useEffect } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { useHistory } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap'
import { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import axios_base from '../axios_base'

import axios from 'axios'

function Reagions(props) {
    const history = useHistory()
    const [regions, Setregions] = useState(null)
    const axiosInstance = axios_base();
    useEffect(() => {
        axiosInstance.get(`/region/?continent=${props.location.state.update_continent}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.status == 200) {
                Setregions(response.data)
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

    const handleClick = async (region) => {
        history.push({
            pathname: '/country',
            state: {
                update_region: region,
                update_continent: props.location.state.update_continent,
            },
        });
    }
    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title='Regions'
                    />
                    <h3>{props.location.state.update_continent}</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Resions</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        {
                            regions && regions.map((region, i) => {
                                return (
                                    <Card style={{ width: '18rem' }} key={i} onClick={() => handleClick(region)}>
                                        <Card.Body>
                                            <Card.Title>{region}</Card.Title>
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

export default Reagions
