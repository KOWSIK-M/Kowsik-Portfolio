import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        toast.info("Form cleared!");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
        return phoneRegex.test(phone);
    };

    const handleSend = () => {
        if (!name || !email || !phone || !message) {
            toast.error("Please fill out all fields.");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email.");
            return;
        }
        if (!validatePhone(phone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        const templateParams = {
            to_email: '2200030358cseh@gmail.com',
            from_name: name,
            from_email: email,
            message: message,
            phone: phone,
        };

        emailjs.send('service_siyox4g', 'template_79hyhgj', templateParams, 'Wl6x-mFiuqXkR-fyd')
            .then((response) => {
                toast.success("Message sent successfully!");
                console.log('Email sent successfully:', response.status, response.text);
            })
            .catch((error) => {
                toast.error("Failed to send message. Please try again.");
                console.error('Failed to send email:', error);
            });
    };

    return (
        <div>
            <ToastContainer />
            <div className="background" id="contact-background">
                <Draggable>
                    <div className="container draggable" id="draggable-container">
                        <div className="screen">
                            <div className="screen-header">
                                <div className="screen-header-left">
                                    <div className="screen-header-button close"></div>
                                    <div className="screen-header-button maximize"></div>
                                    <div className="screen-header-button minimize"></div>
                                </div>
                                <div className="screen-header-right">
                                    <div className="screen-header-ellipsis"></div>
                                    <div className="screen-header-ellipsis"></div>
                                    <div className="screen-header-ellipsis"></div>
                                </div>
                            </div>
                            <div className="screen-body">
                                <div className="screen-body-item left">
                                    <div className="app-title">
                                        <span>CONTACT</span>
                                        <span>ME</span>
                                    </div>
                                    <div className="app-contact">CONTACT INFO : +91 7981793537</div>
                                </div>
                                <div className="screen-body-item">
                                    <div className="app-form">
                                        <div className="app-form-group">
                                            <input
                                                className="app-form-control"
                                                placeholder="NAME"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="app-form-group">
                                            <input
                                                className="app-form-control"
                                                placeholder="EMAIL"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="app-form-group">
                                            <input
                                                className="app-form-control"
                                                placeholder="CONTACT NO"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="app-form-group message">
                                            <input
                                                className="app-form-control"
                                                placeholder="MESSAGE"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                        </div>
                                        <div className="app-form-group buttons">
                                            <button className="app-form-button" onClick={handleCancel}>CANCEL</button>
                                            <button className="app-form-button" onClick={handleSend}>SEND</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        </div>
    );
}
