import React from "react";
import UserService from "../services/user.service";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
    const [content, setContent] = useState("")

    useEffect(() => {
        UserService.getPublicContent().then(
            response => {
                setContent(response.data);
            },
            error => {
                setContent(error.response && error.response.data) ||
                    error.message || error.toString();
            }
        );
    }, [content]);

    return (
        <div className="container">
            <header className="jumbotron">
                <div>IM HOME!</div>
                <h3>{content}</h3>
            </header>
        </div>
    );
}