import React, { useState, useRef } from "react";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default function Login(props) {
    console.log(props)
    const initialState = {
        username: "",
        password: "",
        loading: false,
        message: ""
    };

    const [currentState, setCurrentState] = useState(initialState);
    const { username, password, loading, message } = currentState;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentState({ ...currentState, [name]: value });
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setCurrentState({
            ...currentState,
            message: "",
            loading: true
        });

        // check validation here!
        AuthService.login(username, password).then(
            () => {
                props.history.push("/profile");
                window.location.reload();
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
                    message: resMessage,
                    loading: false
                });
            }
        );

        // the "else" for if validation fails
        // setCurrentState({
        //     ...currentState,
        //     loading: false
        // });
    }


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card" />

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={handleInputChange} /></div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handleInputChange} /></div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>)}
                            <span>Login</span>
                        </button></div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div></div>)}
                </form>
            </div>
        </div>
    );
}