# accessibility-analyzer
A Node.js-based web accessibility analyzer that scans any public website URL for WCAG 2.1 accessibility issues using axe-core and Puppeteer. Returns detailed reports highlighting violations, affected elements, and recommended code fixes. Ideal for developers aiming to improve website accessibility

# Accessibility Analyzer
A command-line tool that analyzes the accessibility of any public website using [axe-core](https://github.com/dequelabs/axe-core) and
[Puppeteer](https://github.com/puppeteer/puppeteer).

## Features

-Runs a headless browser to load the provided URL
-Injects the axe-core library for accessibility auditing
-Detects and lists all accessibility violations
-Saves results in structured JSON format inside a folder called results
-Easy to extend with multi-page scans and/or a web UI

---

## Tech Stack

-[Node.js](https://nodejs.org)
-[Puppeteer](https://github.com/puppeteer/puppeteer)
-[axe-core](https://github.com/dequelabs/axe-core)
-[express.js](https://expressjs.com/) {for future web interface}

---

## Installation

```bash
git clone https://github.com/devmanyu-singhz/accessibility-analyzer.git
cd accessibility-analyzer
npm install

---

## How to Use

in bash

node index.js <URL>

EXAMPLE - 

node index.js https://www.wikipedia.org/

THIS WILL:
-run an accessibility audit on the page
-print a summary in the terminal
-save a JSON report inside the results folder

OUTPUT - 
each scan generates a file like:

results/report-2025-06-04T12-42-00-000Z.json

this file contains all the accessibility violations returned by axe-core, formatted for easy reading

---

## Project Structure

accessibility-analyzer/
->index.js                  #main script
->results/                  #stores json audit reports
->package.json              #project metadata
->package-lock.json         #locks dependency versions to ensure consistency
->node_modules/             #dependencies
->README.md                 #project description

```

## Future Ideas

-web interface with forms to enter urls
-batch scanning for multiple urls
-filter or group results by severity
-generate human-readable HTML or PDF reports
-email accessibility reports automatically

# Author
Abhimanyu Singh
GitHub : @devmanyu-singhz
LinkedIn : https://www.linkedin.com/in/abhimanyu-singh-87886b28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app


