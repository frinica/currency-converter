# currency-converter

Code challenge for Anyfin. Search for countries and display information about it's population, currency &amp; exchange rate + feature to select an amount in SEK and display the local currency for countries in a list.

# Get Started

- Clone the project
- Run "pnpm i" to install dependencies
- Recreate .env files with the env-examples in the project. There is one for the server folder and one for the client.

# Project structure

## Server

| File          | Description               |
| ------------- | ------------------------- |
| index.ts      | Server connection         |
| data.ts       | Mock database             |
| middleware.ts | Authentication middleware |
| utils.ts      | Helper functions          |

| Folder | Description           |
| ------ | --------------------- |
| routes | Handling API requests |
| types  | Interfaces            |

## Client

| Components | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| Login      | Login user. Default view for unauthenticated users                                 |
| Home       | Default view after login                                                           |
| Converter  | Form to input amount to convert                                                    |
| Search     | Lookup a country                                                                   |
| List       | Display countries in a list and the amount in local currency after being converted |

## Future features
