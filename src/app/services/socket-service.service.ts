import { Injectable } from '@angular/core';

/**
 * Let's include the socket library
 * 
 * IMPORTANT! Go and see app.module.ts 
 * for more configuration.
 * 
 */
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

    /**
     * New messages arriving from server
     */
    newMessageArrives = this.socket.fromEvent<any>('new_message_from_server');


    constructor(
        
        /**
         * Use the socket library here
         */
        private socket : Socket,

    ) { }


    /**
     * Let's create a function which will send messages
     * to our server.
     * 
     * @param username : the username sending the message.
     * @param message : the message we want to send to the server.
     */
    sendMessage(username : string, message : string)
    {
        /**
         * Create any object you like to send
         * any information to the server. Feel
         * free and creative.
         */
        const obj = {
            username,
            message,
        }

        /**
         * Once you have the object, send the message
         * to your server. In this case, the message is
         * the string "new_message" but you can use
         * any you like. Remember to write the same one
         * on the server side.
         */
        this.socket.emit('new_message', obj, (success : boolean) => 
        {
            console.log("Message sent!");
        })
        
    }


}
