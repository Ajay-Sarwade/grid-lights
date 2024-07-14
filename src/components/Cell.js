import React from "react";

const Cell = (props) => {
  const { index, filled, onClick } = props;

  return (
    <div className={filled ? "cell activated" : "cell"} onClick={onClick}>
      {index}
    </div>
  );
};

export default Cell;
