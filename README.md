# Under Construction

Building a couple of pages with authentication using nextjs and level as DB

# Requirements
 - Node.js.
 - An account at [Unsplash](https://unsplash.com/) to use their api.


# Steps to run
Clone the repo and go to the root of the project.

## Installing
Run `npm install`

## Configuration
Rename `.env.default` to `.env` and set `NEXT_PUBLIC_UNSPLASH` to your Unsplash api public\
Run `node config/migration.js` to create the database and insert fake users (important ⚠️)

## Starting
Run `npm run build && npm run start`
