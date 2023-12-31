const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const surveyResponsesRouter = require("./routes/survey-responses.router");
const emergenciesRouter = require("./routes/emergencies.router");
const eventsRouter = require("./routes/events.router");
const injuriesRouter = require("./routes/injuries.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/survey", surveyResponsesRouter);
app.use("/api/emergencies", emergenciesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/injuries", injuriesRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
