import React, { useState } from "react";
import { useDispatch } from "react-redux";
import history from "../history";

import { postUserValues } from "../store/actions/userValueActions";

import styled from "styled-components";

// ********************** STYLED COMPONENTS ************************************
let Body = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

let SubTitle = styled.h4`
  font-size: 2rem;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.75);
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 3px 2px rgb(0, 0, 0, 0.5);
`;

let ValuesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: 75%;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.4);
  }
`;

const Values = styled.div`
  color: rgba(255, 255, 255, 0.75);
  background-color: black;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin: 1%;
`;

let Button = styled.button`
  width: 123px;
  height: 45px;
  font-size: 1.1rem;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.4) rgba(121, 58, 87, 0.94);
  color: rgba(255, 255, 255, 0.75);
  margin: 35px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    text-shadow: 5px 5px 50px white, 0 0 25px blueviolet, 0 0 5px white;
  }
`;

const ValueName = styled.div`
  padding: 2em;
  max-width: 100%;
`

// ********************** STYLED COMPONENTS END ********************************

const Value = () => {
  const [userValues, setUserValues] = useState([]);
  const [userSelected, setUserSelected] = useState([]);

  const dispatch = useDispatch();

  const values = JSON.parse(localStorage.getItem("values"));

  const handleClick = (clickedId, clickedName) => e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.background = 'green';
    const userId = localStorage.getItem('id');
    const assigned = Object.assign({ user_id: userId, name: clickedName });
    const userAssigned = Object.assign({ id: clickedId, name: clickedName });
    setUserValues([...userValues, assigned]);
    setUserSelected([...userSelected, userAssigned]);
    
  };

  const handleConfirm = e => {
    e.preventDefault();
    userValues.map(value => {
      return dispatch(postUserValues(value));
    });
    localStorage.setItem("userValues", JSON.stringify([...userSelected, {name: 'Other'}]));
    history.push("/user-values");
  };

  // const handleColorChange = e => {
  //   e.stopPropagation()
    
  // }

  

  return (
    <>
      <Body className="values-pg-container">
        <SubTitle>Select your values</SubTitle>
        <ValuesContainer className="card-info">
          {values.map(value => {
            return (
              <Values 
              key={value.id} 
              onClick = {handleClick(value.id, value.name)}
              >
                <ValueName>{value.name}?</ValueName>
              </Values>
            );
          })}
        </ValuesContainer>
        <div>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </Body>
    </>
  );
};

export default Value;
