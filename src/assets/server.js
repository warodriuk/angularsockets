
// File system
var fs = require('fs');

/**
 * Path to your certificates
 * you can get this from sites offering free SSL
 * like "letsencrypt"
 
var options = {
    key  : fs.readFileSync('./privkey.pem'),
    cert : fs.readFileSync('./fullchain.pem')
}; 
*/

// let's use the express framework
var express = require('express');
var app = express();

// create a secure server!
//var server = require('https').createServer(options, app);

// not secure server
var server = require('http').createServer(app);

// this is socket.io!
var io = require('socket.io').listen(server);

// some constants for our socket communication...

// New connection on the server side
NEW_CONNECTION = 'new_connection';

// User sends a new message
NEW_MESSAGE = 'new_message';

// Server sends a message saying a user sent a new message
NEW_MESSAGE_FROM_SERVER = 'new_message_from_server';

// Holds all connected users
arrUsers = [];

// Holds all connections from users to this server
arrConnections = [];

// this is the port our socket is listent to
// select any port you want
server.listen( 3000 );
console.log('Socket listening on port 3000');

// all requests from any Browser / will arrive here
app.get('/', (req, res) => 
{
    res.sendFile( __dirname + '/index.html');
})

/**
 * The following is to wait for connections
 */
io.sockets.on('connection', (socket) =>
{
    // We have a new connection from one of the Angular clients
    arrConnections.push(socket);

    // Console log the total of users we have
    console.log("New Connection. Total users: " + arrConnections.length);

    // Let's inform back to clients the total users connected
    const totalUsers = arrConnections.length;
    io.sockets.emit(NEW_CONNECTION, {msg:totalUsers});

    /**
     * A user is disconnected from this server
     */
    socket.on('disconnect', (data) => 
    {
        // Remove the connection from the list
        arrConnections.splice(arrConnections.indexOf(socket), 1);

        // Remove the user from the list
        // ** Attention! optimise this for a large number of users **
        for (let i=0; i < arrUsers.length; i++)
        {
            const user = arrUsers[i];

            if (user.username == socket.username) 
            {
                arrUsers.splice(i, 1);
            }
        }

        // Print for debug purposes
        console.log('User Disconnected. Total users: ' + 
            arrConnections.length);
        
        // Inform back to all connected Angular user the total of connected users
        updateTotalUsersConnected();
        
    })

    /**
     * We receive a new message!
     */
    socket.on(NEW_MESSAGE, (data) => 
    {
        // Print this for debug purposes
        console.log('New Message: ' + data);

        // Send to everyone on the chat this message
        io.sockets.emit(NEW_MESSAGE_FROM_SERVER, 
            {msg:data, user:socket.username});

    })


    /**
     * This will send a message to all the Angular users, 
     * saying that the total amount of connected users has changed
     */
    function updateTotalUsersConnected()
    {
        const totalUsers = arrConnections.length;
        io.sockets.emit(NEW_CONNECTION, {msg:totalUsers});
    }


})

