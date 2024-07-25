# Star Wars 2

**Star Wars** is a project about all the characters from the movie **"Star Wars"**.
It's main essence is to show information about all characters, planets, films in the form of an api. You can create, edit and delete a character, as well as attach pictures to it.

### How does the project work?
Our project works very simply, it takes data from [swapi](https://swapi.dev "swapi") in JSON format and puts it into a database

### Requirements for launching the project
To start the project, you will need:
1. Docker >= **20.10.18**
2. Docker Compose >= **1.29.2**

### How to launch the project?
1. Clone a repository:

   `git clone https://github.com/shavlenkov/star_wars.git`

2. Run containers using Docker Compose:

   `docker-compose up -d`

3. Make an .env file from the .env.example file:

   `cp .env.example .env`

4. Make the necessary configuration changes to the .env file:

   ```
   PORT=
   SECRET=

   MYSQL_HOST=
   MYSQL_PORT=
   MYSQL_USERNAME=
   MYSQL_PASSWORD=
   MYSQL_DB=

   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_S3_BUCKET=
   ```

5. Go to the star_wars folder:

   `cd star_wars`

6. Install all dependencies using npm:

   `npm install --force`

7. Run the migrations:

   `npm run migration:run`

8. Run the seeders:

   `npm run seed:run`

9. Run the program:

   `npm run start:dev`

10. Open the browser, go to the address: http://localhost:3000/api