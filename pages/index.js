// import { useState, useRef } from "react";

// // 1. Render list of users using UserCard component
// // 2. Add handler to the "Add user" button that creates
// //   new user and add it the list of the users and clear the inputs
// // 3. Add handler to the "Filter users" button that filters out users
// //  older than 25 years
// // Don't use:
// // - if-else
// // - loops (for, while, until)

// const data = [
//   {
//     name: "John",
//     age: 20,
//   },
//   {
//     name: "Bob",
//     age: 25,
//   },
//   {
//     name: "Mike",
//     age: 30,
//   },
// ];

// // Use this component for rendering the users
// const UserCard = ({ name, age }) => (
//   <div>
//     <ul>
//       <li>{name}</li>
//       <li>{age}</li>
//     </ul>
//   </div>
// );

// export default function App() {
//   // Inner state - array of the users
//   const [users, setUsers] = useState(data);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");

//   // On change handler for the inputs
//   const onChange = (setFunction, e) => setFunction(e.target.value);

//   const handlerAdding = () => {
//     const newUser = { name, age };
//     if ((name !== "", age !== "")) {
//       setUsers(users.concat(newUser));
//     }
//   };

//   const hanlderFilter = () => {
//     const filteredUsers = users.filter((item) => item.age < 25);
//     setUsers(filteredUsers);
//   };

//   return (
//     <div className="App">
//       {/* Render list of users here using UserCard */}
//       <div>
//         <input
//           type="text"
//           placeholder="name"
//           onChange={onChange.bind(null, setName)}
//           value={name}
//         />
//         <input
//           type="text"
//           placeholder="age"
//           onChange={onChange.bind(null, setAge)}
//           value={age}
//         />
//         {/* Add handler to the Add user button */}
//         <button onClick={() => handlerAdding()}>Add user</button>
//         {/* Add handler to the Filter users button */}
//         <button onClick={() => hanlderFilter()}>Filter users</button>
//       </div>
//       {users.map((item, index) => {
//         return <UserCard name={item.name} age={item.age} key={index} />;
//       })}
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";

// export default function ToDo() {
//   const [state, setState] = useState({ items: [], filter: "all" });
//   const txtInput = useRef(null);
//   const changeInput = useRef(null);

//   const counter = state.items.filter((item) => !item.completed).length;

//   const handlerAddButt = () => {
//     let inputTxt = txtInput.current.value;
//     const newItem = {
//       title: inputTxt,
//       completed: false,
//       change: false,
//       id: Math.ceil(Math.random() * 1000),
//     };
//     if (newItem.title !== "") {
//       setState({ items: state.items.concat(newItem), filter: "all" });
//     }
//     inputTxt = txtInput.current.value = "";
//   };

//   const handletToggleCompleted = (id) => {
//     const itemIdx = state.items.findIndex((item) => item.id === id);
//     state.items[itemIdx].completed = !state.items[itemIdx].completed;
//     setState({ ...state, items: state.items });
//   };

//   const handlerDeleteButt = (id) => {
//     const itemIdx = state.items.findIndex((item) => item.id === id);
//     state.items.splice(itemIdx, 1);
//     setState({ ...state, items: state.items });
//   };

//   const handlerChange = (id) => {
//     const itemIdx = state.items.findIndex((item) => item.id === id);
//     state.items[itemIdx].change = !state.items[itemIdx].change;
//     setState({ ...state, items: state.items });
//   };

//   const handleChangeTitle = (id) => {
//     let inputTxt = changeInput.current.value;
//     const itemIdx = state.items.findIndex((item) => item.id === id);
//     state.items[itemIdx].change = !state.items[itemIdx].change;
//     state.items[itemIdx].title = inputTxt;
//     if (inputTxt === "") {
//       state.items.splice(itemIdx, 1);
//     }
//     setState({ ...state, items: state.items });
//   };

//   const handlerAllButt = () => {
//     setState({ ...state, filter: "all" });
//   };
//   const handlerCompletedButt = () => {
//     setState({ ...state, filter: "Completed" });
//   };
//   const handlerActiveButt = () => {
//     setState({ ...state, filter: "Active" });
//   };
//   const handlerClearButt = () => {
//     const filtered = state.items.filter((item) => !item.completed);
//     setState({ ...state, items: filtered });
//   };

//   const allTrue = Object.values(state.items).every((item) => item.completed);

//   const handleAllToggled = () => {
//     const changedAllComplet = state.items.map((item) => {
//       if (!item.completed) {
//         item.completed = true;
//         return item;
//       }
//       if (item.completed) {
//         if (allTrue) {
//           item.completed = false;
//           return item;
//         }
//         return item;
//       }
//     });
//     setState({ ...state, items: changedAllComplet });
//   };

//   const filterResult = state.items.filter((item) => {
//     if (state.filter === "all") {
//       return item;
//     }
//     if (state.filter === "Completed") {
//       return item.completed === true;
//     }
//     if (state.filter === "Active") {
//       return item.completed === false;
//     }
//   });

//   const list = filterResult.map((item) => {
//     return (
//       <div
//         key={item.id}
//         className="border-t border-gray border-opacity-20 items-center h-[58.79px] "
//       >
//         <div className=" flex flex-row p-[11.6px] pb-[12px] pl-[8px] mt-[1px] group/item justify-between">
//           <div
//             className={`${
//               item.change ? "invisible" : "visible"
//             } cursor-default h-[30px] w-[30px] border-gray-light
//             } relative mt-[2px] border border-opacity-100 rounded-full flex items-center justify-center`}
//             onClick={() => handletToggleCompleted(item.id)}
//           >
//             {item.completed ? <p className="text-green text-xl">✓</p> : null}
//           </div>
//           <div
//             className={`cursor-default absolute ml-[52px] mt-[1px] font-text opacity-70 duration-500 font-sans text-2xl ${
//               (item.completed && !item.change) ? "opacity-20 line-through" : null
//             }  `}
//             onDoubleClick={() => handlerChange(item.id)}
//           >
//             {!item.change ? (
//               <p>{item.title}</p>
//             ) : (
//               <input
//                 className="p-[13px] pb-3 pr-110 md:pr-200 absolute -top-[14px] -left-[15px] focus:border shadow-editInp focus:outline-none"
//                 type="edit"
//                 ref={changeInput}
//                 defaultValue={item.title}
//                 autoFocus
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleChangeTitle(item.id);
//                   }
//                 }}
//                 onBlur={() => handleChangeTitle(item.id)}
//               ></input>
//             )}
//           </div>
//           <div className="group/edit invisible relative group-hover/item:visible">
//             <span
//               className={`${
//                 item.change ? "invisible" : null
//               } cursor-default font-sans text-red opacity-40 text-3xl pr-2 hover:opacity-80 hover:duration-500 duration-500`}
//               onClick={() => handlerDeleteButt(item.id)}
//             >
//               ×
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   });

//   const filters = (
//     <div className="shadow-sl">
//       <div>{state.items.length !== 0 ? <ul>{list}</ul> : null}</div>
//       <div className="flex justify-between border-t border-gray-light border-opacity-100 font-sans pb-[9px] pt-[10px] pl-[15px]">
//         <div className="opacity-60 cursor-default text-sm">
//           {counter} {counter !== 1 ? "items left" : "item left"}
//         </div>
//         <div className=" flex gap-3 ml-[30px]">
//           <div
//             className={`cursor-pointer flex items-center  ${
//               state.filter === "all"
//                 ? "outline"
//                 : "hover:outline hover:outline-red/10"
//             }  outline-1 outline-red/20 text-sm font-sans rounded-sm`}
//             onClick={() => handlerAllButt()}
//           >
//             <p className="opacity-60 px-[7px] py-[1px]">All</p>
//           </div>
//           <div
//             className={`cursor-pointer flex flex-row items-center justify-center ${
//               state.filter === "Active"
//                 ? "outline"
//                 : "hover:outline hover:outline-red/10"
//             }  outline-1 outline-red/20   text-sm font-sans rounded-sm`}
//             onClick={() => handlerActiveButt()}
//           >
//             <p className="opacity-60 px-[7px] py-[1px]">Active</p>
//           </div>
//           <div
//             className={`cursor-pointer flex flex-row items-center justify-center ${
//               state.filter === "Completed"
//                 ? "outline"
//                 : "hover:outline hover:outline-red/10"
//             }  outline-1 outline-red/20 text-sm font-sans rounded-sm`}
//             onClick={() => handlerCompletedButt()}
//           >
//             <p className="opacity-60 px-[7px]">Completed</p>
//           </div>
//         </div>
//         <div
//           onClick={() => handlerClearButt()}
//           className={`text-sm hover:underline items-center justify-center mr-4 ${
//             counter < state.items.length ? "opacity-100" : "opacity-0"
//           }
//           `}
//         >
//           <p className="opacity-60">Clear completed</p>
//         </div>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     const loadedState = JSON.parse(localStorage.getItem("ToDo"));
//     if (loadedState) {
//       setState(loadedState);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("ToDo", JSON.stringify(state));
//   }, [state]);

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center mt-[1px]">
//         <h1 className="text-h1 text-83 -mb-4 -mt-2 w-550 text-center font-sans">
//           todos
//         </h1>
//         <div className="bg-white border border-gray border-opacity-20 mt-[3px] shadow-xl  border-none">
//           <div className="flex flex-row justify-between items-center relative z-0">
//             <div
//               className={`font-semibold absolute left-[20px] top-[17px] text-[22px] rotate-90 cursor-default z-10 ${
//                 state.items.length === 0
//                   ? "opacity-0"
//                   : allTrue
//                   ? "opacity-60"
//                   : "opacity-10"
//               } `}
//               onClick={() => handleAllToggled()}
//             >
//               ❯
//             </div>
//             <input
//               className={`${
//                 state.items.length === 0 ? "" : null
//               } placeholder:text-2xl placeholder:italic font-sans text-2xl shadow-inp bg-input
//               py-16 pr-16 pl-60 focus:outline-0 opacity-70 placeholder:opacity-40 w-390 md:h-[65.6px]  md:w-550`}
//               typeof="text"
//               id="textInp"
//               ref={txtInput}
//               placeholder="What needs to be done?"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handlerAddButt();
//                 }
//               }}
//             ></input>
//           </div>
//           {state.items.length > 0 ? filters : null}
//         </div>

//       </div>
//     </>
//   );
// }

export default function App() {
  const listOfComission = [
    [102, 15509.06, 204.34],
    [33, 4595.38, 60.52],
    [59, 8497.9, 111.95],
    [58, 10382.85, 136.75],
    [78, 15185.5, 200.0],
    [45, 7804.28, 102.82],
    [12, 2486.25, 32.75],
    [29, 3798.15, 50.06],
    [47, 5397.31, 71.07],
    [37, 4488.69, 59.14],
    [52, 5992.89, 78.92],
    [54, 9444.03, 124.4],
    [46, 7024.47, 92.56],
    [27, 3607.33, 47.49],
    [48, 6766.85, 89.14],
    [57, 7492.2, 98.7],
    [37, 4733.18, 62.32],
    [38, 4768.68, 62.82],
    [60, 8626.9, 113.6],
    [56, 11012.23, 145.07],
    [28, 3155.94, 41.56],
    [56, 8752.93, 115.25],
    [64, 9279.77, 122.21],
    [56, 8592.54, 113.18],
    [51, 6496.28, 85.54],
    [62, 9061.0, 119.31],
    [54, 9582.01, 126.2],
    [23, 2562.92, 33.77],
    [42, 6044.35, 79.65],
    [62, 9780.05, 128.86],
    [49, 7547.83, 99.42],
    [46, 7355.97, 96.93],
    [49, 6463.13, 85.11],
    [50, 9261.5, 121.98],
    [20, 3682.28, 48.52],
    [61, 8886.01, 116.99],
    [69, 10107.44, 133.16],
    [62, 9073.41, 119.49],
    [73, 10884.51, 143.39],
    [52, 9951.93, 131.07],
    [61, 11690.23, 153.97],
    [30, 3441.58, 45.32],
    [50, 7692.38, 101.33],
    [52, 7707.4, 101.53],
    [60, 10102.12, 133.06],
    [55, 8996.19, 118.49],
    [64, 11984.17, 157.82],
    [65, 10671.42, 140.57],
    [27, 2975.54, 39.19],
    [60, 8042.21, 105.97],
    [67, 7788.46, 102.58],
    [67, 10999.1, 144.91],
    [54, 7686.04, 101.25],
    [66, 9629.27, 126.84],
    [54, 8160.13, 107.48],
    [28, 5427.61, 71.49],
    [45, 5951.01, 78.39],
    [46, 6763.04, 89.06],
    [51, 6077.83, 80.07],
    [56, 6889.11, 90.79],
    [64, 9385.49, 123.61],
    [65, 11510.61, 151.59],
    [24, 2295.46, 30.24],
    [62, 7883.11, 103.83],
    [59, 8648.67, 113.93],
    [45, 5992.4, 78.94],
    [52, 9165.57, 120.69],
    [55, 7102.75, 93.55],
    [37, 7590.55, 99.99],
    [33, 4418.83, 58.19],
    [60, 7880.77, 103.78],
    [34, 4280.81, 56.41],
    [49, 7171.65, 94.47],
    [56, 8665.86, 114.12],
    [75, 11986.41, 157.88],
    [58, 7270.25, 95.75],
    [28, 2977.36, 39.22],
    [54, 8021.12, 105.68],
    [46, 7011.73, 92.37],
    [45, 6486.55, 85.45],
    [67, 9545.57, 125.73],
    [66, 10311.69, 135.81],
    [61, 11239.44, 148.06],
    [29, 3334.15, 43.95],
    [50, 6135.61, 80.82],
    [42, 5022.27, 66.1],
    [51, 5069.78, 66.76],
    [52, 7621.24, 100.41],
    [56, 8083.27, 106.42],
    [57, 7800.95, 102.77],
    [30, 3471.54, 45.72],
    [58, 7101.42, 93.57],
    [50, 6900.62, 90.91],
    [60, 9075.98, 119.54],
    [64, 9608.55, 126.58],
    [93, 16550.78, 217.97],
    [73, 14292.64, 188.25],
    [31, 5736.23, 75.57],
    [64, 11824.54, 155.76],
    [60, 14007.1, 184.5],
    [100, 22158.46, 291.84],
    [87, 19873.89, 261.81],
    [137, 30062.12, 395.98],
    [62, 15221.01, 200.49],
    [33, 4499.49, 59.3],
    [39, 4129.45, 54.39],
    [35, 4802.0, 63.27],
    [56, 8187.64, 107.82],
    [52, 8999.14, 118.53],
    [27, 4244.29, 55.92],
    [50, 6852.41, 90.25],
    [54, 7143.08, 94.07],
    [42, 6767.87, 89.15],
    [60, 9020.66, 118.81],
    [71, 10659.81, 140.4],
    [44, 7940.68, 104.61],
    [30, 4364.26, 57.48],
    [74, 11038.28, 145.42],
    [63, 10836.36, 142.69],
    [58, 9169.25, 120.75],
    [64, 11152.53, 146.87],
    [84, 14366.36, 189.24],
    [68, 12938.51, 170.41],
    [33, 4226.21, 55.69],
    [62, 11113.14, 146.37],
    [57, 8173.94, 107.65],
    [79, 10644.45, 140.2],
    [66, 9340.79, 123.05],
    [71, 10328.67, 136.05],
    [56, 8256.82, 108.76],
    [28, 4392.27, 57.83],
    [67, 9113.57, 120.03],
    [70, 9921.53, 130.72],
    [69, 9614.0, 126.59],
    [64, 9327.49, 122.81],
    [82, 15217.31, 200.42],
    [68, 12806.61, 168.66],
    [21, 2967.72, 39.08],
    [68, 9181.47, 120.93],
    [59, 8507.11, 112.09],
    [47, 7789.72, 102.58],
    [68, 9572.49, 126.11],
    [69, 12416.85, 163.55],
    [56, 13342.87, 175.77],
    [28, 4351.25, 57.35],
    [53, 8100.82, 106.73],
    [66, 11765.71, 154.89],
    [64, 10594.92, 139.53],
    [66, 12131.59, 159.79],
    [79, 17230.56, 226.98],
    [78, 18697.3, 246.33],
    [28, 4522.08, 59.53],
    [58, 8094.55, 106.61],
    [53, 7339.43, 96.65],
    [52, 8316.6, 109.55],
    [59, 7948.32, 104.68],
    [83, 14252.13, 187.78],
    [62, 11797.3, 155.38],
    [29, 3518.75, 46.35],
    [64, 9009.19, 118.71],
    [59, 9872.66, 130.04],
    [54, 7778.46, 102.44],
    [54, 7673.01, 101.09],
    [61, 14026.24, 184.76],
    [57, 10866.52, 143.18],
    [23, 3967.84, 52.26],
    [48, 6974.7, 91.85],
    [26, 3735.4, 49.2],
    [43, 7125.54, 93.87],
    [62, 9490.36, 125.0],
    [60, 11625.61, 153.12],
    [71, 13590.14, 178.98],
    [19, 2763.42, 36.4],
    [59, 7301.12, 96.19],
    [53, 8136.39, 107.19],
    [69, 9087.67, 119.72],
    [53, 7096.28, 93.49],
    [74, 12963.82, 170.79],
    [70, 12258.84, 161.42],
    [28, 4176.72, 55.02],
    [65, 9796.79, 129.04],
    [57, 9679.9, 127.5],
    [48, 8130.1, 107.08],
    [56, 10519.51, 138.59],
    [65, 11394.04, 150.06],
    [60, 12035.77, 158.53],
    [26, 3473.77, 45.73],
    [59, 7804.71, 102.79],
    [69, 13551.74, 178.48],
    [55, 10190.63, 134.24],
    [38, 5820.31, 76.63],
    [68, 14207.39, 187.17],
    [61, 11634.81, 153.26],
    [26, 3312.73, 43.62],
    [52, 9631.8, 126.83],
    [48, 8274.47, 109.02],
    [57, 7370.03, 97.04],
    [47, 8296.97, 109.26],
    [74, 12526.49, 164.94],
    [62, 13625.26, 179.46],
    [24, 4421.46, 58.24],
    [62, 9505.8, 125.2],
    [48, 7177.18, 94.52],
    [55, 7748.44, 102.06],
    [72, 13662.34, 179.96],
    [73, 14536.33, 191.47],
    [45, 7041.36, 92.74],
    [29, 4713.82, 62.08],
    [39, 5293.27, 69.73],
    [48, 8767.53, 115.48],
    [37, 5563.98, 73.28],
    [57, 8865.66, 116.77],
    [56, 12027.73, 158.44],
    [60, 9526.05, 125.44],
    [20, 3450.27, 45.43],
    [65, 11295.85, 148.8],
    [40, 5415.63, 71.35],
    [61, 9517.33, 125.37],
    [55, 9781.18, 128.8],
    [50, 5828.55, 76.76],
    [64, 14584.22, 192.13],
    [23, 3475.03, 45.77],
    [56, 8855.75, 116.66],
    [52, 7615.48, 100.32],
    [51, 6415.9, 84.51],
    [45, 9144.92, 120.46],
    [68, 12510.22, 164.76],
    [61, 13398.94, 176.46],
    [23, 4203.43, 55.37],
    [54, 9170.89, 120.82],
    [55, 9584.71, 126.25],
    [60, 10094.81, 132.96],
    [52, 9232.86, 121.64],
    [68, 13141.38, 173.1],
    [56, 10209.85, 134.48],
    [24, 5149.39, 67.82],
    [43, 7306.44, 96.22],
    [44, 6748.74, 88.89],
    [65, 9245.83, 121.82],
  ];
  const newList = [];
  listOfComission.map((item) => {
    const newItem = item[1] + item[2];
    newList.push(newItem.toFixed(2));
    return newList;
  });
  console.log(newList);
  return (
    <div>
      <h1>Сума------------</h1>
      {listOfComission.map((item) => {
        const modifiedItem = item[1].toString().replace(/\./g, ",");
        return <p>{modifiedItem}</p>;
      })}
      <h2>Комісія банку----------</h2>
      {listOfComission.map((item) => {
        const modifiedItem = item[2].toString().replace(/\./g, ",");
        return <p>{modifiedItem}</p>;
      })}
      <h2>Сума з комісією банку------------</h2>
      {newList.map(item => {
        const modifiedItem = item.toString().replace(/\./g, ",");
        return <p>{modifiedItem}</p>;
      })}
    </div>
  );
}
