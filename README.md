# Artwork Exhibition

Welcome to the Artwork Exhibition Application!

https://sharmistha071.github.io/art-work-exhibition/



## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
   - [Docker Installation](#docker-installation)
3. [Usage](#usage)
4. [Deployment](#deployment)
5. [Contributing](#contributing)
6. [License](#license)

## Project Overview

This application allows users to explore and enjoy a virtual exhibition of artworks.
User can search by artwork or artist name.
User can see the details of an Artwork.

## Installation

### Docker Installation

To run the application using Docker, follow these steps:

1. Install Docker on your machine. You can download Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

2. Clone the repository:

   ```bash
   git clone https://github.com/sharmistha071/art-work-exhibition.git
   ```

3. Navigate to the project directory:

   ```bash
   cd art-work-exhibition
   ```

4. Build the Docker image:

   ```bash
   docker build -t artwork-exhibition .
   ```

5. Run the Docker container:
   ```bash
   docker run -p 8080:80 artwork-exhibition
   ```

Visit [http://localhost:8080](http://localhost:8080/art-work-exhibition/) in your browser to access the application.

## Deployment

Access the application through the deployed link(https://sharmistha071.github.io/art-work-exhibition/)
