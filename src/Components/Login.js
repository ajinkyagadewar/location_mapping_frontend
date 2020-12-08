import React, { useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


import TextField from 'material-ui/TextField';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import axios_base from '../axios_base'


function Login() {
    const history = useHistory()
    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const axiosInstance = axios_base();

    const setSession = (accessToken) => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        } else {
            localStorage.removeItem('accessToken');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    const handleClick = async (event) => {
        event.preventDefault();
        console.log(email)
        console.log(password)
        await axiosInstance.post('/auth/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        })
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    console.log("Login successfull");
                    setSession(response.data.access_token)
                    history.push("/home")
                }
                else if (response.status == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                alert("Something went Wrong");
                console.log(error);
            });
    }

    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Login"
                    />

                    <TextField style={{ width: '20%' }}
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange={(event, newValue) => setUsername(newValue)}
                    />
                    <br />
                    <TextField style={{ width: '20%' }}
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange={(event, newValue) => setPassword(newValue)}
                    />
                    <br />
                    <br />
                    <a href="/register">Signup here</a>
                    <br />
                    <RaisedButton label="Submit" primary={true} style={style} onClick={handleClick} />
                </div>
            </MuiThemeProvider>
        </div>
    );

}
const style = {
    margin: 20,
};
export default Login;