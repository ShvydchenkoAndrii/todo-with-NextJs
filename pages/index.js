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

  const handleAllToggled = () => {
    const changedAllComplet = state.items.map((item) => {
      if (!item.completed) {
        item.completed = true;
        return item;
      }
      if (item.completed) {
        if (allTrue) {
          item.completed = false;
          return item;
        }
        return item;
      }
    });
    setState({ ...state, items: changedAllComplet });
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

  const allTrue = Object.values(state.items).every(
    (item) => item.completed === true
  );

  const list = filterResult.map((item) => {
    return (
      <div
        key={item.id}
        className="border-t border-gray border-opacity-20  items-center "
      >
        <div className=" flex flex-row p-4 group/item justify-between">
          <div
            className={
              item.completed
                ? "cursor-pointer h-8 w-8 border-green border border-opacity-50 rounded-full flex items-center justify-center"
                : "cursor-pointer h-8 w-8 border-gray border border-opacity-50 rounded-full flex items-center justify-center"
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
          <div className="group/edit invisible group-hover/item:visible">
            <span
              className="cursor-pointer font-sans text-red opacity-50 text-xl pr-7 font-extrabold hover:opacity-100 hover:duration-500 duration-500"
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
        <div className="opacity-60 cursor-default">
          {state.items.length} items
        </div>
        <div className=" flex flex-row gap-5">
          <div
            className={
              state.filter === "all"
                ? "cursor-pointer flex flex-row items-center justify-center outline outline-1 outline-red/20 px-2  text-sm font-sans rounded-md outline-opacity-20"
                : "cursor-pointer hover:outline outline-1 outline-red/20 flex flex-row items-center justify-center px-2 text-sm font-sans rounded-md border-opacity-20"
            }
            onClick={() => handlerAllButt()}
          >
            <p className="opacity-60">All</p>
          </div>
          <div
            className={
              state.filter === "Completed"
                ? "cursor-pointer flex flex-row items-center justify-center outline outline-1 outline-red/20 px-2 text-sm font-sans rounded-md outline-opacity-20"
                : "cursor-pointer hover:outline outline-1 outline-red/20 flex flex-row items-center justify-center  px-2 text-sm font-sans rounded-md border-opacity-20"
            }
            onClick={() => handlerCompletedButt()}
          >
            <p className="opacity-60">Completed</p>
          </div>
          <div
            className={
              state.filter === "In progress"
                ? "cursor-pointer flex flex-row items-center justify-center outline outline-1 outline-red/20 px-2 mx-1 text-sm font-sans rounded-md outline-opacity-20"
                : "cursor-pointer hover:outline outline-1 outline-red/20 flex flex-row items-center justify-center  px-2 -mx-1.5 text-sm font-sans rounded-md border-opacity-20"
            }
            onClick={() => handlerInProgressButt()}
          >
            <p className="opacity-60">In progress</p>
          </div>
          <div
            onClick={() => handlerClearButt()}
            className="text-sm hover:underline flex flex-row items-center justify-center"
          >
            <p className="opacity-60">Clear</p>
          </div>
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
          <div className="flex flex-row justify-center items-center">
            <span
              className={
                state.items.length === 0
                  ? "static  ml-5 truncate text-4xl opacity-0"
                  : allTrue
                  ? "static ml-5 truncate text-4xl opacity-50"
                  : "static ml-5 truncate text-4xl opacity-25"
              }
              onClick={() => handleAllToggled()}
            >
              ▾
            </span>
            <input
              className="placeholder:text-2xl placeholder:italic font-sans text-2xl py-16 pr-16 pl-5 focus:outline-0 font-normal placeholder:opacity-30"
              typeof="text"
              size={42}
              id="textInp"
              ref={txtInput}
              placeholder="What needs to be done ?"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlerAddButt();
                }
              }}
            ></input>
          </div>
          {state.items.length > 0 ? filters : null}
        </div>
        {state.items.length > 0 ? (
          <>
            <div className="bg-white shadow-inner border border-gray border-opacity-25 relative w-144 h-1 -top-10 "></div>
            <div className="bg-white shadow-inner border border-gray border-opacity-25 relative w-128 h-5 -top-20 z-0"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
