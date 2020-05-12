import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default function Profile() {
    const currentState = AuthService.getCurrentUser();
    const {
        id,
        username,
        accessToken,
        email,
        roles
    } = currentState;
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{username}</strong> Profile
          </h3>
            </header>
            <p>
                <strong>Token:</strong>{" "}
                {accessToken.substring(0, 20)} ...{" "}
                {accessToken.substr(accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong>{" "}
                {id}
            </p>
            <p>
                <strong>Email:</strong>{" "}
                {email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {roles &&
                    roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );

}