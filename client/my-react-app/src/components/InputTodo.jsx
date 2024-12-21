import React, { Fragment, useState } from "react";

const InputTodo = () => {
  //use state returns array with 2 elements, current value of the state and a function to update state
  const [description, setDescription] = useState("");
  console.log(description);

  const onSubmitForm = async (e) => {
    e.preventDefault(); //keeps it from refreshing
    try {
      const body = { description }; //shorthand object notation, so description is the object key
      await fetch("http://localhost:5000/todos", {
        //hitting up server/api /todos route...
        method: "POST", // ...with a POST request...
        headers: { "Content-Type": "application/json" }, //...telling the server that the request body is a json...
        body: JSON.stringify(body), //...and actually passing the data as a JSON
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">InputTodo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)} //e is the function parameter that stores the event object, using the stateupdate function to update the state
        ></input>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
