import React from 'react'
import { format } from 'timeago.js'

export const Messages = ({message, own, arrival}) => {
    
    return (
        <>
            <div class="text-center">
                <span class="message-data-time">{format(message.createdAt)}</span>
            </div>
            {
                own?
                <p class="from-me">{message.text}</p>
                :
                <p class="from-them">{message.text}</p>
            }
        </>
    )
}
