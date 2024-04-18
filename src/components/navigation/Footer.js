import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
width: 100%;
display: grid;
background-color: var(--green-vara-1);
padding: 20px 0 20px 0;
margin: 0px;
text-align: center;
font-weight: 700;
`


export function Footer(){
    return(
        <StyledFooter>
            <p className="m-0">© 2024 Open Web Academy | BOS + VARA Network</p>
        </StyledFooter>
    )
}