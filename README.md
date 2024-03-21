
## Run In Dev

1. Clone repository
2. Create a copy of ```.env.template``` and rename it to ```.env``` and change the environment variables.
3. Install dependencies ```npm install```
4. Start the data base ```docker compose up -d```
5. Run prisma migrations ```npx prisma migrate dev```
6. Run seed ```npm run seed```
5. Run the project ```npm run dev```