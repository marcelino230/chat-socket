import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { TextField, Grid, Button, Container, CircularProgress } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom'
import { welcome, stopSpamming, messageCannotBeLeftBlank, userExists } from '../notifications.js'
import SideBar from './SideBar'
import { useHistory } from 'react-router-dom'

let socket;

const Chat = () => {
    const history = useHistory();
    const location = useLocation();
    const [username] = useState(location.state.username);
    const [channel] = useState(location.state.channel);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [ableToSendMessage, setAbleToSendMessage] = useState(true);
    const [canChat, setCanChat] = useState(false);
    const SERVER = "http://localhost:5050";

    useEffect(() => {   // do the connection when the user joins the chat.
        socket = io(SERVER);
        socket.emit('join-chat', { username, channel }, (err) => {
            if (err) {
                console.log(err);
                store.addNotification(userExists);
                history.push('/');
            }
            else {
                setCanChat(true);
                store.addNotification(welcome);
            }
        });
    }, [SERVER, location.state]);

    useEffect(() => {
        socket.on('chat-message', ({ username, message }) => {
            const messageDate = getCurrentDate();
            setChatMessages(chatMessages => [...chatMessages, { username, message, messageDate }]);
        });

        socket.on('welcome-message', ({ username, message }) => {
            const messageDate = getCurrentDate();
            setChatMessages(chatMessages => [...chatMessages, { username, message, messageDate }]);
        });

        socket.on('disconnect', ({ username, message }) => {
            setChatMessages(chatMessages => [...chatMessages, { username, message }]);
        });

        socket.on('allUsersConnected', (usersConnected) => {    // for updating users connected in a channel
            setAllUsers(usersConnected);
        });

        return () => {  //cb when manual disconnection occurs.
            socket.disconnect();
            socket.off();
            sessionStorage.clear();   // user not longer connected
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ableToSendMessage) return store.addNotification(stopSpamming);
        if (message.replace(/\s/g, '').length === 0) return store.addNotification(messageCannotBeLeftBlank);

        socket.emit('chat-message', ({ username, message, channel }));
        setMessage('');
        setAbleToSendMessage(false);
        setTimeout(() => {
            setAbleToSendMessage(true); // user cannot spam messages.
        }, 700);
    }

    const getCurrentDate = () => {
        let currentDate = new Date();
        return currentDate.getHours() + ':' +
            (currentDate.getMinutes() < 10 ? "0" : '') + currentDate.getMinutes() + ':' +
            (currentDate.getSeconds() < 10 ? "0" : '') + currentDate.getSeconds();  // date format examples: 8:42:01 - 20:00:00
    }

    if (!canChat) return (
        <Grid container className="container-height" justify="center" alignContent="center">
            <CircularProgress />
        </Grid>
    )

    return (
        <Grid>
            <Container maxWidth="md">
                <h1 className='text-center mt-5'>{channel} - <FontAwesomeIcon icon={faCommentDots} /> </h1>
                <ScrollToBottom debug={false}>
                    <Message username={username} chatMessages={chatMessages} />
                </ScrollToBottom>
            </Container>
            <Grid container className="mt-4 pt-5">
                <Grid item sm={4} container justify="center">
                    <SideBar allUsers={allUsers} username={username} />
                </Grid>
                <Grid item container justify="center" sm={4}>
                    <form onSubmit={handleSubmit}>
                        <TextField autoFocus value={message} style={{ width: 350 }} placeholder="Enter your message..." onChange={e => setMessage(e.target.value)}></TextField>
                        <Button size="small" type="submit"><FontAwesomeIcon style={{ marginTop: 15, marginRight: 20 }} icon={faPaperPlane} /></Button>
                    </form>
                </Grid>
                <Grid item container justify="center" sm={4}>
                    <Link className="text-dec" to="/"><Button size="large" color="primary"><FontAwesomeIcon icon={faArrowLeft} />Exit</Button></Link>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Chat