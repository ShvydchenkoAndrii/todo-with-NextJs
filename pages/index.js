import { useEffect, useRef, useState } from "react";

export default function ToDo() {
  const [state, setState] = useState({ items: [], filter: "all" });
  const txtInput = useRef(null);

  const handlerAddButt = () => {
    let inputTxt = txtInput.current.value;
    const newItem = {
      title: inputTxt,
      completed: false,
      id: Math.ceil(Math.random() * 1000),
    };
    if (newItem.title !== "") {
      setState({ items: state.items.concat(newItem), filter: "all" });
    }
    inputTxt = txtInput.current.value = "";
  };

  const handletToggleCompleted = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items[itemIdx].completed = !state.items[itemIdx].completed;
    setState({ ...state, items: state.items });
  };

  const handlerDeleteButt = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items.splice(itemIdx, 1);
    setState({ ...state, items: state.items });
  };

  const handlerAllButt = () => {
    setState({ ...state, filter: "all" });
  };
  const handlerCompletedButt = () => {
    setState({ ...state, filter: "Completed" });
  };
  const handlerInProgressButt = () => {
    setState({ ...state, filter: "In progress" });
  };
  const handlerClearButt = () => {
    setState({ items: [], filter: "all" });
    localStorage.clear();
  };

  const filterResult = state.items.filter((item) => {
    if (state.filter === "all") {
      return item;
    }
    if (state.filter === "Completed") {
      return item.completed === true;
    }
    if (state.filter === "In progress") {
      return item.completed === false;
    }
  });

  const list = filterResult.map((item) => {
    return (
      <div key={item.id}>
        <input
          type="checkbox"
          onChange={() => handletToggleCompleted(item.id)}
          checked={item.completed !== false ? "checked" : null}
        ></input>
        <p>{item.title}</p>
        <button onClick={() => handlerDeleteButt(item.id)}>Delete</button>
      </div>
    );
  });

  useEffect(() => {
    const loadedState = JSON.parse(localStorage.getItem("ToDo"));
    if (loadedState) {
      setState(loadedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ToDo", JSON.stringify(state));
  }, [state]);

  return (
    <div>
      <h1>ToDoList with ReactJS & Tailwind</h1>
      <input
        typeof="text"
        id="textInp"
        ref={txtInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlerAddButt();
          }
        }}
      ></input>
      <button onClick={() => handlerAddButt()}>Add</button>
      {state.items.length !== 0 ? <ul>{list}</ul> : null}
      <div>{state.items.length}</div>
      <button onClick={() => handlerAllButt()}>All</button>
      <button onClick={() => handlerCompletedButt()}>Completed</button>
      <button onClick={() => handlerInProgressButt()}>In progress</button>
      <button onClick={() => handlerClearButt()}>Clear</button>
    </div>
  );
}
