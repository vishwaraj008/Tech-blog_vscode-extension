# Verge Tech News

A lightweight Visual Studio Code extension that fetches the latest tech news from [The Verge](https://www.theverge.com/) and displays articles in a Quick Pick menu. Select any article to read it instantly in your browser.

---

## Features

-  Fetches the latest tech articles from The Verge's RSS feed
-  Displays article titles and descriptions in a searchable Quick Pick menu
-  Opens selected articles in your default web browser
-  Clean and minimal interface with no setup required

---

## Usage

1. Open the Command Palette: `Ctrl+Shift+P` or `Cmd+Shift+P` on macOS
2. Run: `Blogs: Search Tech News`
3. Browse and select a tech article
4. The article will open in your default browser

---

## Extension Commands

| Command | Description |
|--------|-------------|
| `Blogs: Tech News` | Fetches and displays latest Verge tech articles |

---

## Requirements

- VS Code `1.70+`
- Internet connection to fetch the RSS feed

---

## Installation (Manual)

1. Clone or download this repo
2. Run `npm install` to install dependencies
3. Press `F5` in VS Code to launch the extension in a new Extension Development Host

---

## Tech Stack

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Axios](https://github.com/axios/axios) – HTTP client
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) – XML to JSON parsing

---

## Development

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [VS Code Extension Host](https://code.visualstudio.com/api/get-started/your-first-extension)

Then:

```bash
npm install
npm run compile
