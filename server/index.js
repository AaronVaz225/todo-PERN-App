const express = require("express");
const app = express(); //gives app all the methods to run a server
const cors = require("cors"); //middleware
const pool = require("./db");

//middleware
app.use(cors()); //app.use just mounts the middleware. Lets host 5000 and 3000 talk to each other
app.use(express.json()); // allows us to access the req.body (like body parser)

//ROUTES//

//get all Todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows); // returns a json of the todo id and description (all rows)
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body; // is the same as -> const description = req.body.description;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *", //"RETURNING *" just shows you the data you inserted on postman (might do more, idk yet)
      [description] //$1 is a variable that is defined by that array (so its "description")
    );

    res.json(newTodo.rows[0]); //responding with the json of a new todo, just the todo row
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const description = req.body.description;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (err) {
    console.log(err);
  }
});

//delete a todo
//the : in :id is just a rout parameter, just making id into a dynamic parameter
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
