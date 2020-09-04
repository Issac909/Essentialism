import React from 'react';
import {Link} from 'react-router-dom';
import history from '../history';

import styled from 'styled-components';
import Logo from '../images/logo-small-1.png';
import Logo2 from '../images/logo-small-2.png';

// ********************* STYLED COMPONENTS *************************************

let Body = styled.section`
width: 100%;
padding-top: 20px;
`;

let Container = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
max-width: 35%;
margin: 0 auto;
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

&:hover{
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    color: rgba(255, 255, 255, 1)
}
`;

let NavLink = styled(Link)`
margin: 0;
padding: 0;
`;

let TopLogo = styled.div`
background-image: url(${Logo});
background-size: contain;
height: 123px;
width: 123px;
opacity: .8;

&:hover{
    background-image: url(${Logo2});
}
`;

const handleClick = e => {
    e.preventDefault();
    history.push('/select-values')
}


export default function Navigation(props) {
    return (
        //Issac's code
        // <div>
        //     <Link to='/register'>
        //         <button> Register </button>
        //     </Link>
        //     <Link to='/'>
        //         <button> Login</button>
        //     </Link>
        //     <button onClick = {props.logout}>Logout</button>
        //     <Link to = '/select-values'>
        //         <button>Selection</button>
        //     </Link>
        // </div>



        //fernando's code, can be deleted 
        <Body className='body-container'>
            <Container className='nav-container'>
                <NavLink>
                    <Button onClick = {handleClick}>Selection</Button>
                </NavLink>
                <a href='https://essentialism4.netlify.com/home.html'><TopLogo className='navlogo'/></a>
                <Button onClick = {props.logout}>Logout</Button>
            </Container>
        </Body>
    )
}