import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationButton = styled.div`
  a {
    color: black;
    font-size: 16px;
    padding: 10px;
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
    border-color: var(--slate-vara-1);
    font-weight: var(--font-weight-bold);
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &.active {
      color: white;
      text-decoration: none;
      background-color: var(--slate-vara-1);
    }
  }
  &.disabled {
    opacity: 0.5;
  }
`;

export function NavigationButton(props) {
  return (
    <StyledNavigationButton className={props.disabled ? "disabled" : ""}>
      {props.route ? (
        <NavLink
          onClick={(e) => {
            if (props.disabled) {
              e.preventDefault();
            }
          }}
          to={props.route}
          exact={true}
        >
          {props.children}
        </NavLink>
      ) : (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      )}
    </StyledNavigationButton>
  );
}
