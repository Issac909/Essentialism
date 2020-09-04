import React, { useState } from "react";
import { useDispatch, /*useSelector*/ } from "react-redux";

import { putUserValues } from "../store/actions/userValueActions";
import { putUserInvolvement } from "../store/actions/userValueActions";
import { logout } from '../store/actions/loginActions';

import Navigation from './Navigation';

import styled from 'styled-components';

// ********************** STYLED COMPONENTS *******************************************
let Body = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`;

let Values = styled.div`
color: rgba(255, 255, 255, 0.75);
border: 2px solid rgba(255, 255, 255, 0.2);
padding: 0 2%;
margin: 1%;
line-height: 25px;
font-weight: 400;
font-size: 1.3rem;
text-align: center;
width: 40%;
border-left: none;
border-right: none;
margin-top: 35px;
`;

let SavedValues = styled.div`
color: rgba(255, 255, 255, 0.75);
border: 2px solid rgba(255, 255, 255, 0.2);
padding: 0 2%;
margin: 1%;
line-height: 25px;
font-weight: 400;
font-size: 1.3rem;
text-align: center;
width: 40%;
`;

let FormContainer = styled.div`
width: 80%;
`;

let SavedBodyForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
width: 80%;
`;

let BodyForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
width: 80%;
`;

let Input = styled.input`
font-weight: 300;
width: 50%;
border-radius: 7px;
padding: 7px 0;
margin: .5% 0;
font-size: 1.3rem;
text-align: center;
width: 50%;
&:hover, :focus{
  box-shadow: 0 0 3px 2px rgb(0, 136, 255);
    outline: none;
}
`;

let Button = styled.button`
width: 123px;
height: 45px;
font-size: 1.1rem;
font-weight: 300;
background-color: rgba(0, 0, 0, 0.4);
border-color: rgba(255, 255, 255, 0.4)
rgba(121, 58, 87, 0.94);
color: rgba(255, 255, 255, 0.75);
margin: 35px;
&:hover{
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    text-shadow: 5px 5px 50px white, 0 0 25px blueviolet, 0 0 5px white;
}
`;
// ********************** STYLED COMPONENTS END ***************************************

const UserProfile = () => {
  const [userInput, setUserInput] = useState("");
  const [involvment, setInvolvment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
//   const isProfileSet = useSelector(state => state.userValues.isProfileSet);

  const top3 = localStorage.getItem("top3");
  const values = JSON.parse(top3);

  const handleChanges = e => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleInvolvment = e => {
    e.preventDefault();
    setInvolvment(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(putUserValues(Object.assign({ prompt: userInput })));
    dispatch(putUserInvolvement(Object.assign({ prompt: involvment })));
    setIsEditing(true);
  };

  const handleEdit = e => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleLogout = e => {
      e.preventDefault()
      dispatch(logout())
  }

  return (
    <Body>
      <Navigation logout = {handleLogout}/>
      <Values>
        {values.map(value => {
          return (
            <div key={value.id}>
              <p>{value.name}</p>
            </div>
          );
        })}
      </Values>
      <FormContainer className='form-input-container'>
        {isEditing ? (
          <SavedBodyForm>
            <SavedValues>{userInput}</SavedValues>
            <SavedValues>{involvment}</SavedValues>
            <Button onClick={handleEdit}>Edit</Button>
          </SavedBodyForm>
        ) : (
          <BodyForm onSubmit={handleSubmit}>
            <Input
              name="reason"
              type="text"
              onChange={handleChanges}
              placeholder="Explain your reason for choosing these values."
            />
            <Input
              name="involvment"
              type="text"
              onChange={handleInvolvment}
              placeholder="What are some things you've involved yourself in that tie in with your values."
            />
            <Button type="submit">Save</Button>
          </BodyForm>
        )}
      </FormContainer>
    </Body>
  );
};

export default UserProfile;
