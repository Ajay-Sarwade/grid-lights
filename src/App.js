// Note : removed react strictmode from index.js as it was makig=ng the app run 2 times , thats why creating a issue of removing elements 2 times

import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [deactivating, setDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deActivateCells = () => {
    setDeactivating(true);
    let timer = setInterval(() => {
      setOrder((prevOrder) => {
        // Note if we do newOrder=prevOrder it will be shallow copy and not deep copy and refernce is lost so we should wither make it through neworder=prevorder.slice() or ... spread it like below [...prevorder]
        const newOrder = [...prevOrder];
        newOrder.pop();
        if (newOrder.length === 0) {
          setDeactivating(false);
          clearInterval(timer);
        }
        return newOrder;
      });
    }, 1000);
  };

  const handleClick = (index) => {
    if (!deactivating) {
      let arr = config.flat(1);
      let size = arr.filter((item) => item != 0).length;

      if (arr[index] == 1 && !order.includes(index)) {
        setOrder((prevOrder) => {
          const newOrder = [...prevOrder, index];
          if (size == newOrder.length) {
            deActivateCells();
          }
          return newOrder;
        });
      }
    }
  };

  return (
    <div className="App">
      <h1>Grid Lights</h1>
      <div className="wrapper">
        <div
          className="gridContainer"
          style={{ gridTemplateColumns: `repeat( ${config.length} , 1fr)` }}
        >
          {config.flat(1).map((value, index) => {
            if (value) {
              return (
                <Cell
                  key={index}
                  filled={order.includes(index)}
                  onClick={() => {
                    handleClick(index);
                  }}
                />
              );
            } else return <div key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
