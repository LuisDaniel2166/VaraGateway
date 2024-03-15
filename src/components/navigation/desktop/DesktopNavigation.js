import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logotype } from "../Logotype";
import { NavigationButton } from "../NavigationButton";
import { ArrowUpRight } from "../../icons/ArrowUpRight";
import { SignInButton } from "../SignInButton";
import { UserDropdown } from "./UserDropdown";
import { DevActionsDropdown } from "./DevActionsDropdown";
import { NotificationWidget } from "../NotificationWidget";
import { StarButton } from "../StarButton";
import { useAccount, useApi } from '@gear-js/react-hooks'
import { ProgramMetadata } from "@gear-js/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import { Button } from "react-bootstrap";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--slate-dark-1);
  z-index: 1000;
  padding: 12px 0;

  .user-section {
    margin-left: auto;
    > button {
      font-size: 14px;
    }
  }

  .container {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }
  }
`;

export function DesktopNavigation(props) {
  const varaAccount = useAccount()
  const varaApi = useApi()
  const tryLogin = () => {
    console.log("variable local",varaAccount)
    console.log(varaAccount.accounts)
    varaAccount.login(varaAccount.accounts[0])
  }
  const logs = () =>{
    console.log("account",varaAccount)
    console.log("api",varaApi)
  }
  const testReadState = () =>{
    const programIDFT = "0xd9ba3ce8a90390588b18ebf5deecbfb55ea9d8a76950527572b08d232d0b1388"
    const meta = "0002000100000000000101000000010200000000000000000107000000f10824000000050200040818746d675f696f24546d67416374696f6e000118104e616d650000000c416765000100104665656400020010506c617900030014536c6565700004001c546d67496e666f00050000080818746d675f696f20546d675265706c79000118104e616d650400000118537472696e670000000c41676504000c010c7536340001000c4665640002002c456e7465727461696e656400030014536c6570740004001c546d67496e666f0c01146f776e657210011c4163746f7249640001106e616d65000118537472696e67000134646174655f6f665f62697274680c010c753634000500000c00000506001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d0000140000032000000018001800000503001c0818746d675f696f2854616d61676f7463686900002801106e616d65000118537472696e67000134646174655f6f665f62697274680c010c7536340001146f776e657210011c4163746f72496400010c6665640c010c7536340001246665645f626c6f636b0c010c75363400012c656e7465727461696e65640c010c753634000144656e7465727461696e65645f626c6f636b0c010c7536340001187265737465640c010c7536340001307265737465645f626c6f636b0c010c75363400013c616c6c6f7765645f6163636f756e7420013c4f7074696f6e3c4163746f7249643e00002004184f7074696f6e04045401100108104e6f6e6500000010536f6d650400100000010000"
    const metadata = ProgramMetadata.from(meta);
    varaApi.api.programState
      .read({ programId: programIDFT,payload:"" }, metadata)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log("error",err));
  }
  const testSignTransaction = async () =>{
    const programIDFT = "0xd9ba3ce8a90390588b18ebf5deecbfb55ea9d8a76950527572b08d232d0b1388"
    const meta = "0002000100000000000101000000010200000000000000000107000000f10824000000050200040818746d675f696f24546d67416374696f6e000118104e616d650000000c416765000100104665656400020010506c617900030014536c6565700004001c546d67496e666f00050000080818746d675f696f20546d675265706c79000118104e616d650400000118537472696e670000000c41676504000c010c7536340001000c4665640002002c456e7465727461696e656400030014536c6570740004001c546d67496e666f0c01146f776e657210011c4163746f7249640001106e616d65000118537472696e67000134646174655f6f665f62697274680c010c753634000500000c00000506001010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001401205b75383b2033325d0000140000032000000018001800000503001c0818746d675f696f2854616d61676f7463686900002801106e616d65000118537472696e67000134646174655f6f665f62697274680c010c7536340001146f776e657210011c4163746f72496400010c6665640c010c7536340001246665645f626c6f636b0c010c75363400012c656e7465727461696e65640c010c753634000144656e7465727461696e65645f626c6f636b0c010c7536340001187265737465640c010c7536340001307265737465645f626c6f636b0c010c75363400013c616c6c6f7765645f6163636f756e7420013c4f7074696f6e3c4163746f7249643e00002004184f7074696f6e04045401100108104e6f6e6500000010536f6d650400100000010000"
    const metadata = ProgramMetadata.from(meta);
    const message = {
      destination: programIDFT, // programId
      payload: { name: "Daniel" },
      gasLimit: 899819245,
      value: 0,
    };
    const transferExtrinsic = await varaApi.api.message.send(message,metadata)
    const injector = await web3FromSource(varaAccount.account.meta.source)
    transferExtrinsic
        .signAndSend(
          varaAccount.account?.address ?? console.log("no hay cuenta"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              console.log("transaccion en bloque")
              //alert.success(status.asInBlock.toString());
            } else {
              if (status.type === "Finalized") {
                console.log("finalizada")
                //alert.success(status.type);
              }
            }
          }
        )
        .catch((err) => {
          console.log(":( transaction failed", error);
        });
  }

  return (
    <StyledNavigation>
      <div className="container">
        <Link
          to="/"
          className="logo-link"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logotype />
        </Link>
        <div className="navigation-section">
          <NavigationButton route="/">Home</NavigationButton>
          <NavigationButton route="/edit">Editor</NavigationButton>
          <NavigationButton href={props.documentationHref}>
            Docs
            <ArrowUpRight />
          </NavigationButton>
          <Button onClick={()=>tryLogin()}>Test</Button>
          <Button onClick={()=>testReadState()}>ReadState</Button>
          <Button onClick={()=>testSignTransaction()}>SignTransaction</Button>
        </div>
        <div className="user-section">
          <StarButton {...props} />
          <DevActionsDropdown {...props} />
          {!props.signedIn && (
            <SignInButton onSignIn={() => props.requestSignIn()} />
          )}
          {props.signedIn && (
            <>
              <NotificationWidget
                notificationButtonSrc={props.widgets.notificationButton}
              />
              <UserDropdown {...props} />
            </>
          )}
        </div>
      </div>
    </StyledNavigation>
  );
}
