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
      <div className="border-t border-gray border-opacity-20  items-center ">
        <div key={item.id} className="flex flex-row p-4  justify-between">
          <div
            className={
              item.completed
                ? "h-8 w-8 border-green border border-opacity-50 rounded-full flex items-center justify-center"
                : "h-8 w-8 border-gray border border-opacity-50 rounded-full flex items-center justify-center"
            }
            onClick={() => handletToggleCompleted(item.id)}
          >
            {item.completed ? <p className="text-green text-xl">✓</p> : null}
          </div>
          <p
            className={
              item.completed
                ? "line-through absolute ml-16 opacity-20 duration-500 font-sans text-2xl"
                : "absolute ml-16 duration-500 font-sans text-2xl"
            }
          >
            {item.title}
          </p>
          <div className="hover:opacity-100 opacity-0">
            <span
              className="font-sans text-red opacity-50 text-xl pr-7 font-extrabold hover:opacity-100 hover:duration-500 duration-500"
              onClick={() => handlerDeleteButt(item.id)}
            >
              ✗
            </span>
          </div>
        </div>
      </div>
    );
  });

  const filters = (
    <>
      <div>{state.items.length !== 0 ? <ul>{list}</ul> : null}</div>
      <div className="flex flex-row gap-10 shadow-sm border-t border-gray border-opacity-20 font-sans pl-16 p-4 justify-between">
        <div>{state.items.length} items</div>
        <div className=" flex flex-row gap-5">
          <button
            className={
              state.filter === "all"
                ? "border p-2 text-sm font-sans"
                : "hover:border p-2 text-sm font-sans"
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
      <div className="flex flex-col items-center gap-10 py-5 font-sans">
        <div>
          <h1 className="text-h1 text-8xl">ToDoList</h1>
        </div>
        <div className="bg-white shadow-lg border border-gray border-opacity-20">
          <input
            className="placeholder:text-2xl placeholder:italic py-6 pl-16 focus:outline-0 font-normal placeholder:opacity-30"
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
        <div className="bg-white shadow-inner border border-gray border-opacity-25 relative w-144 h-1 -top-10 "></div>
        <div className="bg-white shadow-inner border border-gray border-opacity-25 relative w-128 h-5 -top-20 z-0"></div>
      </div>
    </>
  );
}
