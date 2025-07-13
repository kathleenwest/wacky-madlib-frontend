# Wacky Madlib Generator

A playful web app that lets you create wacky, AI-powered stories and images! Choose from a list of silly creatures, verbs, and adjectives, then generate a unique story and an AI-generated picture to match.

![Wacky Madlib Logo](/images/demo-start.jpg)

## Play with the App

To be able to play with the app, you can visit the live demo at: [https://kathleenwest.github.io/wacky-madlib-frontend/](https://kathleenwest.github.io/wacky-madlib-frontend/)

## Demo Videos

### Wacky Madlib App Marketing Video

😂Wacky Madlib App Made THIS?! [Watch on YouTube](https://www.youtube.com/shorts/qyWQo9VDbt8 "😂Wacky Madlib App Marketing Video")

🦝✨ Ever wondered what happens when you mix AI with total nonsense? Meet the Wacky Madlib App—where YOU choose the words (like “Disco Raccoon,” “Boogie,” and “Squishy”), and the AI turns them into a hilariously unhinged story… then generates an image to match. Yes, it’s as weird as it sounds—and yes, you’re going to love it.

🎉 In this short demo, watch the magic unfold as our AI spins your wildest word combos into a story that makes zero sense and 100% joy. Bonus: You get to see a raccoon in bell-bottoms. You’re welcome.

🧠 Built with Cloudflare Workers + AI wizardry
🎨 Story + Image = Instant chaos
😂 Try it. Share it. Confuse your friends.
👉 Like, comment, and subscribe for more AI-powered absurdity!

Watch the funny marketing demo video on [YouTube](https://www.youtube.com/shorts/qyWQo9VDbt8 "😂Wacky Madlib App Marketing Video")

### Behind the Code, Architecture, and Demo

🎬 Madlibs, Mayhem & Magic: Behind the Code and Demo of My AI Generator [Watch on Youtube](https://www.youtube.com/watch?v=LTxtzDpAH1A "Behind the Code and Demo of My AI Generator")

Ready for an AI-powered rollercoaster of absurdity and innovation? In this demo, I take you deep into the colorful chaos of my Madlib Generator web app, where users throw in wild nouns, quirky verbs, and eccentric adjectives to spark utterly ridiculous stories. Once a story is born, DALL·E jumps in to create matching visuals—unless you're stuck in cache déjà vu! 💥 This app is lightning-fast thanks to Cloudflare Workers and a strategically crafted AI Gateway that caches responses, reduces costs, and keeps the backend humming.

But it’s not just about the giggles—this walkthrough dives into the technical nuts and bolts. I break down the architecture from frontend to backend, show how token usage and caching strategies are logged in real time, and even zoom into analytics dashboards to analyze traffic patterns, response times, and OpenAI API usage legs. Whether you're here for the weird stories or the sleek design powered by vanilla JavaScript, it’s a wild blend of creativity, performance, and practical engineering. Buckle up, because this isn’t just a demo—it’s a celebration of playful problem-solving at the edge. 🚀🧠

Watch the complete video on [Youtube](https://www.youtube.com/watch?v=LTxtzDpAH1A "Behind the Code and Demo of My AI Generator")

## Project Overview

**Wacky Madlib Generator** is a simple, interactive frontend built with [Vite](https://vitejs.dev/) and vanilla JavaScript. It connects to a backend powered by OpenAI (via Cloudflare Workers) to generate both stories and images based on user selections.

**This frontend app communicates with the backend through a [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/).** The AI Gateway acts as a proxy between the frontend and the OpenAI-powered backend, providing enhanced security, observability, and cost management for AI API usage.

## Features

- Select from a list of wacky creatures, verbs, and adjectives.
- Instantly generate a unique, AI-created story.
- Create a matching AI-generated image for your story.
- Fun, colorful, and easy-to-use interface.

## Architecture

```
Frontend (Vite, JS, HTML, CSS)
        |
        |  (POST /madlib, /image via Cloudflare AI Gateway)
        v
Cloudflare AI Gateway
        |
        v
Backend (Cloudflare Worker, OpenAI API)
```

- **Frontend**: Handles user input, displays results, and communicates with the backend via fetch requests.
- **Cloudflare AI Gateway**: Proxies requests from the frontend to the backend, providing rate limiting, logging, and security for AI API calls.
- **Backend**: Receives requests, uses OpenAI's API to generate stories and images, and returns the results.

### About Cloudflare AI Gateway

The Cloudflare AI Gateway is used to securely route all AI-related API requests from the frontend to the backend. This approach offers several benefits:

- **Security**: Hides backend endpoints and API keys from the client.
- **Observability**: Provides analytics and monitoring for AI API usage.
- **Cost Control**: Enables caching and rate limiting to manage AI costs.
- **Reliability**: Adds an extra layer of protection against abuse and downtime.

## File Structure

- `index.html` – Main HTML page
- `style.css` – App styling
- `script.js` – Handles UI logic and API calls
- `vite.config.js` – Vite configuration
- `package.json` – Project metadata and scripts
- `logo.png`, `favicon.ico` – Branding assets

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd wacky-madlib-chat-app-simple-example-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the App

- **Development mode:**
  ```sh
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Production build:**
  ```sh
  npm run build
  npm run preview
  ```

## Usage

1. Select a creature, verb, and adjective from the dropdowns.
2. Click **Generate Story** to create your wacky story.
3. Click **Create a Picture** to generate an AI image based on your story.

## Backend Endpoints

- `/madlib` – Accepts `{ noun, verb, adjective }` and returns a generated story.
- `/image` – Accepts `{ prompt }` (the story) and returns a base64-encoded image.

> **Note:** The backend is hosted at  
> `https://openai-worker.kathleen-elizabeth-west.workers.dev/`  
> All requests are routed through the Cloudflare AI Gateway for security and observability.

## Caching

To reduce AI costs, story and image responses are cached for 1 month.

## Backend Project

[cloudflare-openai-worker](https://github.com/kathleenwest/cloudflare-openai-worker)

A Cloudflare Worker with simple HTTP endpoints for generating Madlib stories and images using OpenAI APIs. Features /madlib for story creation and /image for AI-generated images. Built with itty-router and the OpenAI Node.js SDK. 

## Credits

- 🚀 by Kathleen West
- Powered by OpenAI, Cloudflare Workers, and Cloudflare AI Gateway

---
Keep the nonsense alive!

