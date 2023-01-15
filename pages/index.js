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
      <div
        key={item.id}
        className="flex flex-row gap-10 shadow-inner p-4  justify-between  mt-2"
      >
        <input
          className=""
          checked={item.completed !== false ? "checked" : null}
          type="checkbox"
          onChange={() => handletToggleCompleted(item.id)}
        ></input>
        <p
          className={
            item.completed
              ? "line-through absolute ml-16 opacity-50 duration-500"
              : "absolute ml-16 duration-500"
          }
        >
          {item.title}
        </p>
        <button onClick={() => handlerDeleteButt(item.id)}>Delete</button>
      </div>
    );
  });

  const filters = (
    <>
      <div>{state.items.length !== 0 ? <ul>{list}</ul> : null}</div>
      <div className="flex flex-row gap-10 shadow-inner pl-16 p-4 justify-between">
        <div>{state.items.length} items</div>
        <div className=" flex flex-row gap-5">
          <button
            className={
              state.filter === "all"
                ? "border p-2 text-sm font-serif"
                : "hover:border p-2 text-sm font-serif"
            }
            onClick={() => handlerAllButt()}
          >
            All
          </button>
          <button
            className={
              state.filter === "Completed"
                ? "border p-2 text-sm"
                : "hover:border p-2 text-sm"
            }
            onClick={() => handlerCompletedButt()}
          >
            Completed
          </button>
          <button
            className={
              state.filter === "In progress"
                ? "border p-2 text-sm"
                : "hover:border p-2 text-sm"
            }
            onClick={() => handlerInProgressButt()}
          >
            In progress
          </button>
          <button onClick={() => handlerClearButt()} className="text-sm">
            Clear
          </button>
        </div>
      </div>
    </>
  );

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
    <>
      <div className="flex flex-col  items-center gap-10 py-5">
        <div>
          <h1 className="text-h1 text-8xl">ToDoList</h1>
        </div>
        <div className="bg-white shadow-xl z-20">
          <input
            className="placeholder:italic placeholder:text-slate-400 placeholder:text-2xl p-4 pl-16 focus:outline-0 "
            typeof="text"
            size={65}
            id="textInp"
            ref={txtInput}
            placeholder="What needs to be done ?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlerAddButt();
              }
            }}
          ></input>
          {state.items.length > 0 ? filters : null}
        </div>
        <div className="bg-black shadow-inner relative w-144 h-8 -top-16 z-10"></div>
        <div className="bg-yellow shadow-inner relative w-128 h-8 -top-32 z-0"></div>
      </div>
    </>
  );
}
