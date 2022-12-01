import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const Pin = ({ length = 6, maxlength = 1 }) => {
  const [inputBoxlength] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);
  const HandleChange = (e, index) => {
    if (e.target.value.length > 0 && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // Handling any key pressed by the user

  const HandleKeyup = (e, index) => {
    if (e.keyCode === 8) {
      BackspaceHandler(e, index);
    } else if (e.keyCode === 32 || e.keyCode === 49) {
      HandleEnterKey(e, index);
    } else {
      HandleChange(e, index);
    }
  };

  // Handle BackspaceHandler function here

  const BackspaceHandler = (e, index) => {
    if (index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // Handleing Enter Key and Space bar of the user

  const HandleEnterKey = (e, index) => {
    e.target.value = "";
    inputRef.current[index].focus();
  };

  // HandlePasteofUser function called here

  const HandlePasteofUser = (e) => {
    e.preventDefault();
    const Data = e.clipboardData
      .getData("text")
      .split("")
      .filter((item, index) => index < length);

    Data.forEach((Item, index) => {
      inputRef.current[index].value = Item;
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });
  };

  return (
    <div onPaste={HandlePasteofUser}>
      {inputBoxlength.map((_, index) => {
        return (
          <input
            ref={(inputElement) => {
              inputRef.current[index] = inputElement;
            }}
            key={index}
            maxLength={maxlength}
            onKeyUp={(e) => {
              HandleKeyup(e, index);
            }}
          />
        );
      })}
    </div>
  );
};

export default Pin;

// Here we use PropTypes that we have imported

Pin.prototype = {
  length: PropTypes.number.isRequired,
  maxlength: PropTypes.number,
};
