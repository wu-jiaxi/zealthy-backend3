import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//prevent cors errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
let formDataStorage = [];

// Routes

app.use("/", (req, res) => {
  res.send("welcome to the server");
});

//route to create tickets from frontend to server
app.post("/api/tickets", (req, res) => {
  const formData = req.body.formData;
  formDataStorage.push(formData);

  console.log("Received form data:", formData);

  res.status(200).send("Ticket submitted successfully.");
  console.log("here is post", formDataStorage);
});

//updates status from server
app.put("/api/tickets/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  const index = formDataStorage.findIndex((item) => item.id === id);

  if (index !== -1) {
    formDataStorage[index].status = status;
    console.log("Ticket status updated successfully.");
    res.status(200).send("Ticket status updated successfully.");
  } else {
    console.log("Ticket not found.");
    res.status(404).send("Ticket not found.");
  }
});
//deletes ticket from server
app.delete("/api/tickets/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log("Delete request received for ID:", id);
  console.log("showing delete formdata", formDataStorage);
  const index = formDataStorage.findIndex((item) => item.id);
  console.log("index", index);
  if (index !== -1) {
    formDataStorage.splice(index, 1);
    console.log("Ticket deleted successfully.");
    res.status(200).send("Ticket deleted successfully.");
  } else {
    console.log("Ticket not found.");
    res.status(404).send("Ticket not found.");
  }
});
//get tickets from server to show in Admin component
app.get("/api/tickets", (req, res) => {
  res.json(formDataStorage);
  console.log("here is get", formDataStorage);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
app.listen(port, "0.0.0.0", function () {
  console.log(`Server running on port ${port}`);
  app.use("/", (req, res) => {
    res.send("welcome to the server");
  });
});
