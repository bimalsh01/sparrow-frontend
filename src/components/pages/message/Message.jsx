import React, { useState, useEffect, useRef } from 'react'
import "./Message.css";
import { Search } from '../../common/search/Search';
import { useSelector } from 'react-redux';
import { getConversations, getMessages, sendMessage } from '../../../http/Index';
import Conversation from './conversations/Conversation';
import { Messages } from './messages/Messages';
import { io } from 'socket.io-client';

const Message = () => {

    const user = useSelector(state => state.Auth.user);
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null)
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        getConversations(user.id).then(res => {
            setConversation(res.data);
        })
    }, [user])


    useEffect(() => {
        if(currentChat){
            try {
                getMessages(currentChat._id).then(res => {
                    setMessages(res.data);
                })
            } catch (error) {
                console.log(error);
            }
        }
    }, [currentChat])

    useEffect(() => {
        if (user.id) {
            socket.current = io('http://localhost:5500');
            socket.current.emit("add-user", user.id);
        }
    }, [user])



    // 1:43:42 time

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(() => {
        scrollToBottom()
      }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((m) => m !== user.id);

        socket.current.emit("send-msg", {
            from: user.id,
            to: receiverId,
            msg: newMessage
        });

        try {
            sendMessage(message).then(res => {
                setMessages([...messages, res.data]);
                setNewMessage('');
            })

        } catch (error) {
            console.log(error)
        }
    }

    // useffetct to get new message from socket.io
    useEffect(() => {
        if (socket.current) {
        socket.current.on("new-msg", (data) => {
            console.log(data,"new message from server");
            setArrivalMessage(data);
        })
    }
    })

    console.log(messages, "arrival message");

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev , arrivalMessage]);
    }, [arrivalMessage])



    return (
        <>

            <div class="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className=' display-4 fw-bold mt-2 mb-2'>Sparrow chat</h1>

                    </div>
                    <div className="d-flex justify-content-center fs-5 fw-bold">
                        <p className='me-3'>Bimal Shrestha</p>
                        <p class="status"> <i class="fa fs-6 fa-circle offline"></i> </p>
                    </div>

                    <div className="d-flex justify-content-center">
                        <i class="fa fs-4 fa-phone me-3"></i>

                        <i class="fa fs-4 fa-video"></i>
                        <i class="fa fs-4 fa-info-circle ms-3"></i>

                    </div>

                </div>
                <hr />
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="card-mess chat-app">
                            <div class="people-list">
                                <ul class="list-unstyled chat-list mt-2 Mscroller">

                                    {
                                        conversation.map((c) => (
                                            <div onClick={() => setCurrentChat(c)}>
                                                <Conversation conversation={c} currentUser={user.id} socket={socket} />
                                            </div>
                                        ))
                                    }

                                </ul>

                            </div>

                            <div class="chat">


                                <div class=" Cscroller">

                                    <div class="Cscroller">
                                  
                                        <div class="imessage">
                                            {
                                                currentChat ?
                                                    <>
                                                        {
                                                            messages.map((m) => (

                                                                <Messages message={m} own={m.sender === user.id} />

                                                            ))
                                                        }
                                                    </>

                                                    :
                                                    <div>
                                                        <img src="/images/message.png" alt="" width={"30%"} />
                                                        <span className='text-center'>No conversation found!</span>
                                                    </div>
                                                    
                                            }
                                            <div ref={messagesEndRef} />

                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="searchSection mt-3">
                                    <div className="d-flex justify-content-between">
                                        <div className="search">
                                            <i class=" fa-solid fs-5 fa-plus-circle me-2"></i>
                                            <i class=" fa-solid fs-5 fa-paperclip me-2"></i>

                                            <i class=" fa-solid fs-5 fa-image"></i>

                                            <form action="" >
                                                <input
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    type="text"
                                                    placeholder="Enter your message"
                                                    className="searchInput"
                                                />
                                            </form>
                                        </div>
                                        <div>
                                            <button onClick={handleSubmit} className='btn btn-primary shadow-0'>Send</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Message
