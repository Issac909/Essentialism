import React /*, { useState }*/ from 'react';
import { connect, useDispatch } from 'react-redux';
// import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom'
import history from '../history';

import { register } from '../store/actions/loginActions';

import styled from 'styled-components';
import Logo from '../images/logofull@2x.png';
import RegImg from '../images/essentialism.png'

// ********************** STYLED COMPONENTS ********************************

let Body = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: beige;
height: 100vh;
`;

let Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 50%;
padding: 5% 0;
border-radius: 25px;
background-color: white;

@media (max-width: 1920px){
    padding: 5% 0;
}

@media (max-width: 1400px){
    padding: 5% 0;
    width: 60%;
}

@media (max-width: 1278px){
    padding: 5% 0;
    width: 75%;
}

@media (max-width: 500px){
       padding: 10% 0;
       width: 90%;
}
`;

let LeftContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 50%;

@media (max-width: 500px){
    display: none;
}
`;

let RegImage = styled.img`
width: 80%;
box-shadow: 1px 2px rgba(0, 0, 0, 0.3);
`;

let RightContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;

@media (max-width: 500px){
    width: 100%;   
}
`;

let NewLogo = styled.img`
width: 60%;
`;

let SubText1 = styled.h2`
width: 90%;
`;

// let SubText2 = styled.h2`
// display: none;
// @media (max-width: 1400){
//     display: block;
// }
// `;

let StyleForm = styled(Form)`
display: flex;
flex-direction: column;
align-items: center;
width: 80%;
background-color: rgba(246, 146, 146, 0.87);
border-radius: 5px;
`;

let Label = styled.label`
padding: 8px;
font-size: 1.3rem;

@media (max-width: 500px){
    font-size: 1.1rem;   
}
`;

let NewField = styled(Field)`
width: 90%;
border-radius: 7px;
padding: 7px 0;
font-size: 1.5rem;
text-align: center;
&:hover, :focus{
    box-shadow: 0 0 3px 2px rgb(0, 136, 255);
    outline: none;
}

@media (max-width: 500px){
    font-size: 1.3rem;
    padding: 3px 0;
}
`;

let Button =  styled.button`
padding: 8px;
margin-top: 15px;
background-color: rgba(255, 255, 255, 0.93);
font-weight: 600;
width: 109px;
border-radius: 7px;
font-size: .9rem;
color: rgba(0, 0, 0, 0.54);
border-color: rgba(0, 0, 0, 0.34);
&:hover, :focus {
    background-color: rgba(50, 98, 255, 0.93);
    color: white;
    border-color: rgba(50, 98, 255, 0.93);
    box-shadow: 1px 2px rgba(0, 0, 0, 0.7);
    outline: none;
    cursor: pointer;
}

&:focus {
    padding: 8.8px;
}
`;

let SignLink = styled(Link)`
padding: 8px;
background-color: rgba(50, 98, 255, 0.93);
margin-bottom: 20px;
border-radius: 7px;
text-decoration: none;
color: white;
font-weight: 600;
&:hover {
    background-color: rgba(255, 255, 255, 0.93);
    color: blue;
    box-shadow: 1px 2px rgba(0, 0, 0, 0.7);
    cursor: pointer;
}
&:focus{
    padding: 8.8px;
}
`;

// ********************** STYLED COMPONENTS END ********************************

let Registration = ({ values, isSubmitting, isValidating, errors, touched, postUser }) => {
    // let [newRegistration, setNewRegistration] = useState([]);
    const dispatch = useDispatch();

    const handleClick = async() => {
        try {
            await dispatch(
              register({ username: values.username, password: values.password })
            );
            history.push("/");
          } catch(err) {
             window.alert(err);
          }
    }

    // const setUser = e => {
    //     e.preventDefault()
    //     props.register(newRegistration);
    // }

    // useEffect (() => {
    //     status&&setNewRegistration (newRegistration => [...newRegistration, status])
    // }, [status]);

    return (
        <Body>
            <Container className='reg-page-container'>
                <LeftContainer className='left-container'>
                <RegImage src={RegImg}/>
                <h2 style={{whiteSpace: 'pre-line', textAlign: 'start', width: '80%'}}>{`Less \nBut \nBetter\n`}<text style={{fontSize: '1rem'}}>-Dieter Rams</text></h2>
                <h2 style={{whiteSpace: 'pre-line'}}>{`Join Now\n&\n Live in the essential!`}</h2>
                </LeftContainer>
                <RightContainer className='right-container'>
                    <NewLogo src={Logo}/>
                    <SubText1>Please create your account</SubText1>
                    {/* <SubText2>{`Please create your\n account`}</SubText2> */}
                    <StyleForm>
                        {/* <label htmlFor='name'>Name: </label>
                        <Field id='name' type='text' name='name' placeholder='Enter Name' value={values.name}/> */}
                        
                        <Label htmlFor='username'>Create Username</Label>
                        <NewField className='inputReg' id='username' type='text' name='username' placeholder='Username' value={values.username}/>
                        {touched.username && errors.username && ( <p>{errors.username}</p>)}

                        <Label htmlFor='password'>Create Password</Label>
                        <NewField className='inputReg' id='password' type='password' name='password' placeholder='Password' value={values.password}/>
                        {touched.password && errors.password && ( <p>{errors.password}</p>)}
                        
                        <Button type='submit' onClick = {handleClick} disabled = {isSubmitting}>Sign Up</Button>
                        <p>Already have an account?</p>
                        <SignLink to = '/' disabled = {isSubmitting}>Sign in Here</SignLink>

                        {/* <label htmlFor='email'>E-mail: </label>
                        <Field id='email' type='email' name='email' placeholder='Enter Email'/> */}
                    </StyleForm>
                </RightContainer>
        </Container>
        </Body>
    )
}

export default withFormik({  
    mapPropsToValues({ username, password }) {
        return {
            username: username || '',
            password: password || '',
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username Field Required!'),
        password: Yup.string().required('Password Field Required!'),
    }),

    handleSubmit:(values, { resetForm }) => {
        resetForm();
    }
})(connect(null, { register })(Registration));
