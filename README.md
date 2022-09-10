# ChatApp - Server App

Tech stack: Express, Socket.io

Serves the ChatApp - Client

Copy-paste link:
https://github.com/palvarezimaz/chatapp-client

# ChatApp - Server - Project 4

## Project description

A proof of concept, real-time message app using React as Front end and Express as Back end, served by Socket.io as a websocket implementation.

See the app [here](https://paichatapp.herokuapp.com/)

This is paired with the by the ChatApp client - [open it on a new tab here](https://github.com/palvarezimaz/chatapp-client)

### General Approach

As a POC, the general approach was to fist give an overview to the documentation of both React and Socket.io, as they were, at the time, new technologies for me. Afterwards, I drafted a development plan, which tried to be as down to earth as possible. Considering that I only had a (busy) week to get the job done, I design a POC App with basic but working functionalities.

### Key features

- Socket.io based real-time messaging for a number of Users
- Direct messaging by unique user indeed
- Username selection
- Friendly CSS layout and retro sound effects

## How it looks

This is the CSS animated landing page:
![Landing page screenshot](./chatapp_landing_page.png)

## Tech Stack

### Back end

- Express JS
- Socket io

### Front end

- React
- SCSS

#### NPM packages

This project uses:

- Node.js v16.14.2
- React v18.2.0
- Socket.io v
- Socket.io-client v4.5.1
- Express.js v4.18.1
- Sass v1.53.0
- Uifx v2.0.7

## Instructions

- To install and deploy in production:

1. Clone this REPO
2. Run `npm i` to install all the dependancies
3. Deploy to your favourite service.

### Note:

For development, mind that the client runs through PORT 3000 and the server (server.js) through PORT 3002.

## Stories

- A user can pick its Username
- A user can send messages in a general chat room
- A user can send a direct message to another user

## Development plan

- Implement WebSockets (via Socket.io) to enable messaging between clients

(.this += layout and css === MVP)

- Implement direct messages between users

## Conclusion: commentaries, bugs and design flaws

Building an app using WebSockets (Socket.io) in a week was a beautiful challenge at this stage of my carrer. It was indeed a way to dive into something quite new (what they usually call leave the comfort zone, although there were few comfortable spots left besides CSS and vanilla JS).

The main reflextion after this experience is that it was an amazing road in which I learned a lot about Front-Back communications.

Having achieved the first milestone (a general chat) and while working on the second main feature (private messaging), I realized that my App had a design flaw.

In the beginning, I was hoping to use a DB to store some critical data for the APP operation. However, due to the time and skills constrains, I put most of the weight of the logical operations on the Front end (hoping to get it done quicker) instead of writing it on the Express server and, eventually, into the server.

In the end, this proved to be a major problem as I had a number of roadblocks when utilizing the data transmitted through the socket. This showed me the limitations of my approach. More than a loss, I believe this was a gain in insight on the importance of having enough time to gather enough information before sitting down in the drawing board of app design.

## Upcoming features

While I consider that the POC has been satisfactory, It would be nice to:

- Fix the private messaging.
- Add a persistent instance
- Combine with a DB (PostgreSQL)
- Chat Rooms
- Export conversations
- Image sharing

## Credits

i. Socket.io creators.
ii. The cool CSS typed animation was taken from Brandon McConnell Codepen: https://codepen.io/brandonmcconnell/pen/bZqGdw
iii. All and every one that make the Internet the one true Forum of the XXIth Century
