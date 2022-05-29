# [Donex](https://donex.netlify.app)

An edgy todo list. 🤠

[![Netlify Status](https://api.netlify.com/api/v1/badges/cc7cda85-22d1-4862-9f28-c14b4a9a59a4/deploy-status)](https://app.netlify.com/sites/dreamy-frangipane-7653ec/deploys)

## What’s up with this?

Donex is a showcase of a bunch of cool technologies. It's a demo, a PoC, and a template. It's also part of my upcoming talk in [React Norway 🇳🇴](https://reactnorway.com) (tickets still available).

Prepare your _buzzword bingo_, here’s our stack and architecture:

- 💿 [Remix](https://remix.run)
- 🦋 [Xata](https://xata.io)
- 🦕 [Deno](https://deno.land)
- ☁️ [Netlify Edge](https://netlify.com/docs/edge/)

  ...maybe I’m not done yet. 😏

## Run locally

1. Add a new database named `donex` in your [Xata](https://xata.io) dashboard

2. You can use the `schema.json` to create the necessary tables

3. With the Xata Shell install, run `xata init` and connect the project to the database

4. `npm run xata-codegen` will create typescript types, and a file for `XataClient`

5. Create an `.env` and add your credentials (you can use `.env.template` as reference)

6. `npm run dev` will start the app on [3000](http://localhost:3000)
