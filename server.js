import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import router from './routes/index.js';
dotenv.config();
const app = express();
//init middleware
app.use(express.json())
/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})*/
//define routes
app.use('/api',router);
const port = process.env.PORT||4000;
app.listen(port,()=>
    console.log(`server listening on port ${port}`),
);

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((res)=>console.log("monge db connection created"));
/*import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import db from "./backend/db.js";
import Query from "./backend/resolvers/Query.js";
import Mutation from "./backend/resolvers/Mutation.js";
import Subscription from "./backend/resolvers/Subscription.js";
import mongo from "./backend/mongo.js";
import apiRoute from "./backend/route/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/schema.graphql");
const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use("/api", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});*/

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
