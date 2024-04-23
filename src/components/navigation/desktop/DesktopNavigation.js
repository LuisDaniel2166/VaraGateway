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
import logo from "../../../images/BOS-vara-logo.png"
import {GearWalletButton} from "../../common/buttons/gearWalletButton"

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--white-light-1);
  z-index: 1000;
  padding: 4px 0;

  .user-section {
    margin-left: auto;
    > button {
      font-size: 16px;
    }
  }

  .container {
    display: flex;
    align-items: center;

    .navigation-section {
      margin-left: 5px;
      display: flex;

      > div {
        > a {
          margin-right: 10px;
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

const StyledLogo = styled.img`
height: 50px;
margin-right: 10px;
`

export function DesktopNavigation(props) {
  const varaAccount = useAccount()
  const varaApi = useApi()
  const tryLogin = () => {
    console.log(varaAccount)
    console.log(varaAccount.accounts)
    varaAccount.login(varaAccount.accounts[0])
    console.log("variable local",varaAccount)
  }
  const logs = () =>{
    console.log("account",varaAccount)
    console.log("api",varaApi)
  }
  const testReadState = () =>{
    const programIDFT = "0x4c2e3903604069a39a82540bbdcae9fe02d19541cf1212ad89a5db58d2b90b25"
    const meta = "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400"
    const metadata = ProgramMetadata.from(meta);
    varaApi.api.programState
      .read({ programId: programIDFT,payload:"" }, metadata)
      .then((result) => {
        console.log(result.toJSON())
        alert(result.toJSON())
      })
      .catch((err) => console.log("error",err));
  }
  const testLogout = async () => {
    varaAccount.logout()
  }
  const testSignTransaction = async () =>{
    const programIDFT = "0x4c2e3903604069a39a82540bbdcae9fe02d19541cf1212ad89a5db58d2b90b25"
    const meta = "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400"
    const metadata = ProgramMetadata.from(meta);
    const message = {
      destination: programIDFT, // programId
      payload: { mint: 1000 },
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
                alert("transaccion ejecutada ")
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
          <StyledLogo src={logo}/>
        </Link>
        <div className="navigation-section">
          <NavigationButton route="/">Home</NavigationButton>
          <NavigationButton route="/edit">Editor</NavigationButton>
          <GearWalletButton></GearWalletButton>
          {/* <button onClick={()=>testLogout()}>Logout</button> */}
          {/* <NavigationButton href={props.documentationHref}>
            Docs
            <ArrowUpRight />
          </NavigationButton>
          <Button onClick={()=>tryLogin()}>Login</Button>
           */}
          <Button variant="success" onClick={()=>testReadState()}>ReadState</Button>
          <Button variant="success" onClick={()=>testSignTransaction()}>SignTransaction</Button>
        </div>
        <div className="user-section">
          <DevActionsDropdown {...props} />
          {!props.signedIn && (
            <SignInButton onSignIn={() => props.requestSignIn()} />
          )}
          {props.signedIn && (
            <>
              <UserDropdown {...props} />
            </>
          )}
        </div>
      </div>
    </StyledNavigation>
  );
}
