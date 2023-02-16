import { useEffect, useRef, useState } from "react";

export default function ToDo() {
  const [state, setState] = useState({ items: [], filter: "all" });
  const txtInput = useRef(null);
  const changeInput = useRef(null);

  const counter = state.items.filter((item) => !item.completed).length;

  const handlerAddButt = () => {
    let inputTxt = txtInput.current.value;
    const newItem = {
      title: inputTxt,
      completed: false,
      change: false,
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

  const handlerChange = (id) => {
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items[itemIdx].change = !state.items[itemIdx].change;
    setState({ ...state, items: state.items });
  };

  const handleChangeTitle = (id) => {
    let inputTxt = changeInput.current.value;
    const itemIdx = state.items.findIndex((item) => item.id === id);
    state.items[itemIdx].change = !state.items[itemIdx].change;
    state.items[itemIdx].title = inputTxt;
    if (inputTxt === "") {
      state.items.splice(itemIdx, 1);
    }
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
    const filtered = state.items.filter((item) => !item.completed);
    setState({ ...state, items: filtered });
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

  const allTrue = Object.values(state.items).every((item) => item.completed);

  const list = filterResult.map((item) => {
    return (
      <div
        key={item.id}
        className="border-t border-gray border-opacity-20 items-center h-[58.79px] "
      >
        <div className=" flex flex-row p-[11.6px] pb-[12px] pl-[8px] mt-[1px] group/item justify-between">
          <div
            className={`${
              item.change ? "invisible" : "visible"
            } cursor-default h-[30px] w-[30px] border-gray-light
            } relative mt-[2px] border border-opacity-100 rounded-full flex items-center justify-center`}
            onClick={() => handletToggleCompleted(item.id)}
          >
            {item.completed ? <p className="text-green text-xl">✓</p> : null}
          </div>
          <div
            className={`cursor-default absolute ml-[52px] mt-[1px] font-text opacity-70 duration-500 font-sans text-2xl ${
              (item.completed && !item.change) ? "opacity-20 line-through" : null
            }  `}
            onDoubleClick={() => handlerChange(item.id)}
          >
            {!item.change ? (
              <p>{item.title}</p>
            ) : (
              <input
                className="p-[13px] pb-3 pr-110 md:pr-200 absolute -top-[14px] -left-[15px] focus:border shadow-editInp focus:outline-none"
                type="edit"
                ref={changeInput}
                defaultValue={item.title}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleChangeTitle(item.id);
                  }
                }}
                onBlur={() => handleChangeTitle(item.id)}
              ></input>
            )}
          </div>
          <div className="group/edit invisible relative group-hover/item:visible">
            <span
              className={`${
                item.change ? "invisible" : null
              } cursor-default font-sans text-red opacity-40 text-3xl pr-2 hover:opacity-80 hover:duration-500 duration-500`}
              onClick={() => handlerDeleteButt(item.id)}
            >
              ×
            </span>
          </div>
        </div>
      </div>
    );
  });

  const filters = (
    <div className="shadow-sl">
      <div>{state.items.length !== 0 ? <ul>{list}</ul> : null}</div>
      <div className="flex justify-between border-t border-gray-light border-opacity-100 font-sans pb-[9px] pt-[10px] pl-[15px]">
        <div className="opacity-60 cursor-default text-sm">
          {counter} {counter !== 1 ? "items left" : "item left"}
        </div>
        <div className=" flex gap-3 ml-[30px]">
          <div
            className={`cursor-pointer flex items-center  ${
              state.filter === "all"
                ? "outline"
                : "hover:outline hover:outline-red/10"
            }  outline-1 outline-red/20 text-sm font-sans rounded-sm`}
            onClick={() => handlerAllButt()}
          >
            <p className="opacity-60 px-[7px] py-[1px]">All</p>
          </div>
          <div
            className={`cursor-pointer flex flex-row items-center justify-center ${
              state.filter === "In progress"
                ? "outline"
                : "hover:outline hover:outline-red/10"
            }  outline-1 outline-red/20   text-sm font-sans rounded-sm`}
            onClick={() => handlerInProgressButt()}
          >
            <p className="opacity-60 px-[7px] py-[1px]">Active</p>
          </div>
          <div
            className={`cursor-pointer flex flex-row items-center justify-center ${
              state.filter === "Completed"
                ? "outline"
                : "hover:outline hover:outline-red/10"
            }  outline-1 outline-red/20 text-sm font-sans rounded-sm`}
            onClick={() => handlerCompletedButt()}
          >
            <p className="opacity-60 px-[7px]">Completed</p>
          </div>
        </div>
        <div
          onClick={() => handlerClearButt()}
          className={`text-sm hover:underline items-center justify-center mr-4 ${
            counter < state.items.length ? "opacity-100" : "opacity-0"
          }
          `}
        >
          <p className="opacity-60">Clear completed</p>
        </div>
      </div>
    </div>
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
      <div className="flex flex-col justify-center items-center mt-[1px]">
        <h1 className="text-h1 text-83 -mb-4 -mt-2 w-550 text-center font-sans">
          todos
        </h1>
        <div className="bg-white border border-gray border-opacity-20 mt-[3px] shadow-xl  border-none">
          <div className="flex flex-row justify-between items-center relative z-0">
            <div
              className={`font-semibold absolute left-[20px] top-[17px] text-[22px] rotate-90 cursor-default z-10 ${
                state.items.length === 0
                  ? "opacity-0"
                  : allTrue
                  ? "opacity-60"
                  : "opacity-10"
              } `}
              onClick={() => handleAllToggled()}
            >
              ❯
            </div>
            <input
              className={`${
                state.items.length === 0 ? "" : null
              } placeholder:text-2xl placeholder:italic font-sans text-2xl shadow-inp bg-input
              py-16 pr-16 pl-60 focus:outline-0 opacity-70 placeholder:opacity-40 w-390 md:h-[65.6px]  md:w-550`}
              typeof="text"
              id="textInp"
              ref={txtInput}
              placeholder="What needs to be done?"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlerAddButt();
                }
              }}
            ></input>
          </div>
          {state.items.length > 0 ? filters : null}
        </div>
      </div>
    </>
  );
}
