import React from "react";
import './styles.css';

export default function Modal(props) {

  const { visible } = props;

  if (visible) {
    return (
      <div className="modal">
        <div className="content">
          <div className="loader" />
        </div>
      </div>
    );
  } else return null;
}