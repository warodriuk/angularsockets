import { Component } from '@angular/core';

/**
 * This is our service. Import it to
 * use their functions.
 */
import { SocketServiceService } from './services/socket-service.service';

/**
 * Subscriptions will listen for events from the server.
 * This is part of Angular. No need to install anything new.
 *  
 * */ 
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'angular-sockets';

    /**
     * This object acts as a pipeline to the socket.
     * We use it to listen for messages. Don't
     * need to make any requests to your server.
     */
    newMessages : Subscription;

    constructor(

        /**
         * Create this object to use your
         * socket service, we created before.
         */
        private socketService : SocketServiceService
    )
    {}

    /**
     * We will call our service to send this message!
     * the idea is 
     */
    handleClickSendMessage()
    {
        /**
         * We hardcode the username here.
         * A good idea is to use the login username
         * when sending message to your server.
         */
        const username = 'test-user';

        /**
         * This is a hardcoded message.
         * A good idea is to send any custom message
         * your users want to communicate or 
         * you can use this system to send and
         * receive internal commands in your app.
         */
        const message = 'Hello World!';

        this.socketService.sendMessage(
            username, message);


    }

    /**
     * This function is automatically executed
     * by Angular once the view is created.
     */
    ngAfterContentInit() 
    {
        /**
         * This is executed only once.
         * It will wait until we receive messages from the server.
         */
        this.newMessages = this.socketService.newMessageArrives.subscribe(
            (response : any) => 
            {
                /**
                 * The message we receive from the server
                 * is located in the "response" element. 
                 * Feel free to do whatever you need with it.
                 */
                console.log("We have a new message: ");
                console.dir(response);
                
            }
        );

    }

}
