import React, { Component } from "react";

import AuthService from "../services/auth.service";
import { useState } from "react";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = value => {
    if (!(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default function Register() {
    const initialState = {
        username: "",
        email: "",
        password: "",
        successful: false,
        message: ""
    };

    const [currentState, setCurrentState] = useState(initialState);
    const { username, email, password, successful, message } = currentState;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentState({ ...currentState, [name]: value });
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setCurrentState({
            ...currentState,
            message: "",
            successful: false
        });


        AuthService.register(
            username,
            email,
            password
        ).then(
            response => {
                setCurrentState({
                    ...currentState,
                    successful: true,
                    message: response.data.message
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setCurrentState({
                    ...currentState,
                    successful: false,
                    message: resMessage
                });
            }
        );

    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form
                    onSubmit={handleRegister}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={handleInputChange}
                                //validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
