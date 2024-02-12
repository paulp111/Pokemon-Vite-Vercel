import React from "react";
import "./css/card.css";

type CardProps = {
  name: string;
  image: string;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ name, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} className="card-image" />
      <div className="card-name">{name}</div>
    </div>
  );
};

export default Card;
