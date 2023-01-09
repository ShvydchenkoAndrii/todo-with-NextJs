import { useState } from "react";

export default function ToDo() {
  // const startState = {
  //   items: [
  //     { title: "1", completed: false },
  //     { title: "2", completed: false },
  //     { title: "3", completed: false },
  //   ],
  // };
  const [state, setState] = useState({ items: [], filter: "all" });

  const handlerAddButt = () => {
    let inputTxt = document.getElementById("textInp").value;
    const newItem = {
      title: inputTxt,
      completed: false,
      id: Math.ceil(Math.random() * 1000),
    };
    newItem.title !== ""
      ? setState({ items: state.items.concat(newItem), filter: "all" })
      : null;
    inputTxt = document.getElementById("textInp").value = "";
  };

  const handlerDeleteButt = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items.splice(itemIdx, 1);
    setState({ items: state.items });
  };

  const list = state.items.map((item) => {
    return (
      <div key={item.id}>
        <input
          type="checkbox"
          // checked={item.completed === true ? "checked" : null}
        ></input>
        <p>{item.title}</p>
        <button onClick={() => handlerDeleteButt(item.id)}>Delete</button>
      </div>
    );
  });
  return (
    <div>
      <input typeof="text" id="textInp"></input>
      <button onClick={() => handlerAddButt()}>Add</button>
      <ul>{list}</ul>
      <div>{state.items.length}</div>
      <button>All</button>
      <button>Completed</button>
      <button>In progress</button>
      <button>Clear</button>
    </div>
  );
}
