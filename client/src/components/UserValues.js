import React, { useState /*, useEffect*/ } from "react";
import history from "../history";
import { useDispatch } from "react-redux";

import { putValues } from "../store/actions/valuesActions";
import { logout } from "../store/actions/loginActions";
import { postCustomValue } from "../store/actions/userValueActions";

import Navigation from "./Navigation";

import styled from "styled-components";

// ********************** STYLED COMPONENTS ***************************************
let Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 80%;
`;

let ValuesContaier = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: 75%;
`;

let Values = styled.div`
  background-color: black;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin: 1%;
  line-height: 25px;
`;

let SubTitle = styled.h3`
  text-align: center;
  font-size: 2rem;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.75);
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 3px 2px rgb(0, 0, 0, 0.5);
  width: 100%;
  border-left: none;
  border-right: none;
`;

let InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let TopValues = styled.div`
  background-color: white;
  color: black;
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin: 1%;
  line-height: 25px;
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
`;
// ********************** STYLED COMPONENTS END ***********************************

const UserValues = () => {
  const [topChoice, setTopChoice] = useState([]);
  const [eachChoice, setEachChoice] = useState([]);
  const [other, setOther] = useState("");
  const [hide, setHide] = useState(false);

  const values = localStorage.getItem("userValues");
  const id = localStorage.getItem("id");

  const parsedValues = JSON.parse(values);
  const dispatch = useDispatch();

  const handleTopChoiceClick = (clickedId, clickedName) => e => {
    e.stopPropagation();
    const assigned = Object.assign({ id: clickedId, name: clickedName });
    if (topChoice.length <= 3 - 1) {
      setTopChoice([...topChoice, assigned]);
      setEachChoice([...eachChoice, clickedName]);
      e.target.style.background = "green";
    }

    return topChoice;
  };

  const handleTopChoiceClear = e => {
    e.preventDefault();
    setTopChoice([]);
    localStorage.removeItem("top3");
    const top3assigned = Object.assign({ top3_values: topChoice });
    dispatch(putValues(top3assigned));
  };

  const handleConfirm = e => {
    e.preventDefault();

    localStorage.setItem("top3", JSON.stringify(topChoice));

    if (topChoice.length === 3) {
      let top3assigned = undefined;
      topChoice.map(choice => {
        top3assigned = Object.assign({ top3_values: choice.name });
        return setEachChoice([...eachChoice, top3assigned]);
      });
      dispatch(putValues(Object.assign({ top3_values: eachChoice })));
    } else {
      return window.alert("Must choose 3 values to continue.");
    }

    history.push(`/user/${id}/profile`);
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleChanges = e => {
    e.preventDefault();
    setOther(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const assigned = Object.assign({ id: 100, name: other });
    dispatch(postCustomValue(Object.assign({ name: other, user_id: id })));
    if (topChoice.length <= 3 - 1) {
      setTopChoice([...topChoice, assigned]);
    }
    setHide(!hide);
    return topChoice;
  };

  return (
    <Body>
      <Navigation logout={handleLogout} />
      <SubTitle>Choose your top 3</SubTitle>
      <ValuesContaier className="card-info">
        {/* MAPPING OVER VALUES ORIGINALLY CHOSEN FROM VALUE LIST */}
        {parsedValues.map(value => (
          <Values
            key={value.id}
            onClick={handleTopChoiceClick(value.id, value.name)}
          >
            <ValueName>{value.name}</ValueName>
          </Values>
        ))}
      </ValuesContaier>
      {!hide ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="other"
            onChange={handleChanges}
            placeholder="If you chose other, give custom value here"
          />
        </form>
      ) : (
        <></>
      )}

      <InnerContainer>
        <ValuesContaier>
          {/* MAPPING OVER USERS TOP 3 */}
          {topChoice.map(value => (
            <TopValues key={value.id}>
              <p>{value.name}</p>
            </TopValues>
          ))}
        </ValuesContaier>

        <div>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleTopChoiceClear}>Clear</Button>
        </div>
      </InnerContainer>
    </Body>
  );
};

export default UserValues;
