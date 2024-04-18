import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Fork } from "../../icons/Fork";
import { Code } from "../../icons/Code";
import { useAccount } from "near-social-vm";
import { Diff } from "../../icons/Diff";

const StyledDropdown = styled.div`
  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white-light-1);
    border-radius: 50px;
    border-style: solid;
    border-width: 3px;
    border-color: var(--slate-vara-1);
    width: 40px;
    height: 40px;
    margin-right: 5px;

    &:hover{
      background-color: var(--slate-vara-1);
      border-color: var(--slate-vara-1);
    }

    &:after {
      display: none;
    }

    .menu {
      width: 18px;
      height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      div {
        background-color: var(--slate-vara-1);
        height: 2px;
        width: 100%;
        border-radius: 30px;
      }
    }

    :hover {
      .menu {
        div {
          background-color: white;
        }
      }
    }
  }

  ul {
    background-color: var(--slate-vara-1);
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      color: white;
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 12px;

      :hover,
      :focus {
        text-decoration: none;
        background-color: var(--slate-dark-1);
        color: white;

        svg {
          path {
            stroke: white;
          }
        }
      }

      svg {
        margin-right: 7px;
        path {
          stroke: white;
        }
      }
    }
  }
`;

export function DevActionsDropdown(props) {
  const account = useAccount();

  if (props.widgetSrc?.edit || props.widgetSrc?.view) {
    return (
      <StyledDropdown className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="menu">
            <div />
            <div />
            <div />
          </div>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2222">
          {props.widgetSrc?.edit && (
            <li>
              <Link to={`/edit/${props.widgetSrc?.edit}`}>
                <Fork />
                {props.widgetSrc.edit.startsWith(`${account.accountId}/widget/`)
                  ? "Edit widget"
                  : "Fork widget"}
              </Link>
            </li>
          )}
          {props.widgetSrc?.view && (
            <li>
              <Link
                to={`/${props.widgets.viewSource}?src=${props.widgetSrc?.view}`}
              >
                <Code />
                View source
              </Link>
            </li>
          )}
          {props.widgets.viewHistory && props.widgetSrc?.view && (
            <li>
              <Link
                to={`/${props.widgets.viewHistory}?widgetPath=${props.widgetSrc?.view}`}
              >
                <Diff />
                View history
              </Link>
            </li>
          )}
        </ul>
      </StyledDropdown>
    );
  } else {
    return null;
  }
}
