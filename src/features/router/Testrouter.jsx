import React, { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

Testrouter.propTypes = {};

function Testrouter(props) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      console.log(boundingRect.height);
    }
  }, []);

  return <div>Height: {height}</div>;
}

export default Testrouter;
