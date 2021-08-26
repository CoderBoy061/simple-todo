import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { motion } from "framer-motion";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const [alert, setAlert] = useState({ showSnackbar: false, message: "" });
  const closeSnack = () => {
    setAlert({
      showSnackbar: false,
    });
  };

  const add = () => {
    if (todo === "") {
      setAlert({
        showSnackbar: true,
        message: "Please enter something to add",
      });
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setAlert({
        showSnackbar:true,
        message:"Item added successfully"
      })
      setTodo("");
    }
  };
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        placeholder="Enter words to Add Todolist"
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <Tooltip title="Click here to add todo" aria-label="Todos">
          <AddCircleIcon />
        </Tooltip>
      </motion.button>
      <br />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
        onClose={closeSnack}
      />
    </div>
  );
};
//connection the store with connect method
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
