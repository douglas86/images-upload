import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { keys } from "./config/keys";
import api from './routes/user.routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/api', api)

const CONNECTION_URL = keys.mongodb.connection;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((err) => err.message);

mongoose.set("useFindAndModify", false);

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
