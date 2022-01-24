import React from 'react'
import { Container } from '@material-ui/core'

const Message = ({ chatMessages, username }) => {
    return (
        <Container maxWidth="md" className="chat">
            {chatMessages.map((chatMessage, index) => {
                return (
                    <div key={index}>
                        {username === chatMessage.username ? // if the user is the sender.
                            <div className="container-chat">
                                <strong style={{ marginRight: 5 }}>•You:</strong>
                                <div style={{ wordBreak: 'break-word' }}>{chatMessage.message}</div>
                                <span className="time-right">{chatMessage.messageDate}</span>
                            </div>
                            : <div className="container-chat darker">
                                <strong style={{ marginRight: 5 }}>{chatMessage.username}:</strong>
                                <div>{chatMessage.message}</div>
                                <span className="time-right">{chatMessage.messageDate}</span>
                            </div>
                        }
                    </div>
                );
            })}
        </Container>
    )
}

export default Message
