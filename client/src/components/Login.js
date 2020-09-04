import React /*, { useState } */ from 'react';
import { connect, useDispatch/*, useSelector*/ } from 'react-redux';
// import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom'


import { login } from '../store/actions/loginActions';
import styled from 'styled-components';
import Logo from '../images/logofull@2x.png';

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
flex-direction: column;
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

let NewLogo = styled.img`
width: 60%;
`;

let StyleForm = styled(Form)`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;
background-color: rgba(246, 146, 146, 0.87);
border-radius: 5px;

@media (max-width: 500px){
    width: 80%;   
}

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
padding: 8px 28px;
margin: 15px 0;
background-color: rgba(255, 255, 255, 0.93);
font-weight: 600;
width: 100%;
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
margin: 0 20px;
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

let NewAccount = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0;
width: 100%;

@media (max-width: 1059px){
    flex-direction: column;
    padding-bottom: 20px;
}
`;

// ********************** STYLED COMPONENTS END ********************************

//DOWN BELOW IS FERNANDOS MVP
let Login = ({ values, status, errors, touched, isSubmitting}) => {
    // let [userData, setUserData] = useState({username: '', password: ''})

    const dispatch = useDispatch();
    // const isProfileSet = useSelector(state => state.userValues.isProfileSet)

    const handleClick = () => {
        dispatch(login(values)) 
        // if(isProfileSet){
        //     history.push(`/user-profile`)
        // }
    }

    // useEffect (() => {
    //     status&&setUserData (userData => [...userData, status])
    // }, [status]);

    return (
        <Body>
            <Container lassName='log-page-container'>
                <NewLogo src={Logo}/>
                <h2>Please enter login information</h2>
                <StyleForm className='style-form'>
                    <Label htmlFor='username'>Enter Username</Label>
                    <NewField id='username' type='text' name='username' placeholder='Username' value={values.username}/>
                    {touched.username && errors.username && ( <p>{errors.username}</p>)}
                    
                    <Label htmlFor='password'>Enter Password</Label>
                    <NewField id='password' type='password' name='password' placeholder='Password' value={values.password}/>
                    {touched.password && errors.password && ( <p>{errors.password}</p>)}

                    <Link className='login-btn' to='select-values'><Button type='submit' onClick = {handleClick} disabled = {isSubmitting}>Login</Button></Link>
                    <NewAccount className='new-account'>
                        <p>Don't have an account?</p>
                        <SignLink to = '/register' disabled = {isSubmitting}>Click Here</SignLink>
                    </NewAccount>
            </StyleForm>
            </Container>
        </Body>
    )
}

export default withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || '',
            password: password || ''
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username Field Required!'),
        password: Yup.string().required('Password Field Required!'),
    }),

    handleSubmit(values, { resetForm }){
            resetForm();
    }
})(connect(null)(Login));

// export default FormikLogin;


  