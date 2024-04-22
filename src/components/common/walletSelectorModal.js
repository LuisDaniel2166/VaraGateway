import React, { useEffect, useState } from "react";
import { useAccount } from "@gear-js/react-hooks";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Identicon from '@polkadot/react-identicon';

export function WalletModal(props) {
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [walletInformation, setWalletInformation] = useState([])

  const varaAccount = useAccount();
  useEffect(()=>{
    if(varaAccount.isAccountReady){
        setWalletInformation([
            {name: 'Polkadot JS', accounts: varaAccount.accounts.filter((obj)=> obj.meta.source=='polkadot-js'), img: 'https://avatars.githubusercontent.com/u/33775474?s=280&v=4'},
            {name: 'Talisman', accounts: varaAccount.accounts.filter((obj)=> obj.meta.source=='talisman'), img: 'https://styles.redditmedia.com/t5_53lwgb/styles/communityIcon_qrqgjbj15ama1.png'},
            {name: 'SubWallet', accounts: varaAccount.accounts.filter((obj)=> obj.meta.source=='subwallet'), img: 'https://alephzero.org/storage/subwallet-aleph-zero-logo-1667768016nhRkI.jpeg'},
            {name: 'Enkrypt', accounts: varaAccount.accounts.filter((obj)=> obj.meta.source=='enkrypt'), img: 'https://avatars.githubusercontent.com/u/47159500?s=280&v=4'}
        ])
    }
  },[varaAccount])

  const handleSelectWallet = (wallet) => {
    console.log(walletInformation.filter((obj) => obj.name==wallet))
    setSelectedWallet(walletInformation.filter((obj) => obj.name==wallet)[0])
  }

  const handleBack = () => {
    setSelectedWallet([])
  }

  const handleLogin = (account) => {
    varaAccount.login(account);
    setWalletInformation([])
    setSelectedWallet([])
    props.onHide()
  }


  return (
    <>
    <style type="text/css">
    {`
    .btn-wallet {
      background-color: white;
      color: black;
      font-size: 16px;
      padding: 10px;
      border-style: solid;
      border-radius: 4px;
      border-width: 1px;
      border-color: var(--slate-vara-1);
      font-weight: var(--font-weight-bold);
    }
    .btn-wallet:hover {
        background-color: #313438;
        color: white;    
        border-style: solid;
        border-radius: 4px;
        border-width: 1px;
        border-color: var(--slate-vara-1);
      }

      .btn-back {
        background-color: #313438;
        color: white;        
        font-size: 16px;
        padding: 10px;
        border-style: solid;
        border-radius: 4px;
        border-width: 1px;
        border-color: var(--slate-vara-1);
        font-weight: var(--font-weight-bold);
      }
      .btn-back:hover {
          background-color: white;
          color: black;
          border-style: solid;
          border-radius: 4px;
          border-width: 1px;
          border-color: var(--slate-vara-1);
        }
    `}
    </style>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wallet Connection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedWallet.length==0?
        <>
            <h4 className="fw-semibold pb-4">Select your wallet</h4>
            <div className="d-flex flex-column gap-3">
                {walletInformation.length>0? walletInformation.map((data)=>{
                    return(
                    <Button variant="wallet" disabled={data.accounts.length==0} onClick={() => handleSelectWallet(data.name)} className="d-flex flex-row w-100 justify-content-between align-items-center">
                        <div className="d-flex flex-row align-items-center gap-2">
                            <img className="rounded-circle mr-4" src={data.img} width={30} height={30}/>
                            <p className="m-0 fw-bold">{data.name}</p>
                        </div>
                        <p className="fw-semibold m-0 align-items-center">Available accounts: <b>{data.accounts.length}</b></p>
                    </Button>)
                }):<p>loading</p>}
            </div>
        </>
        :
        <>
        <h4 className="fw-semibold pb-4">Select your account</h4>
        <div className="d-flex flex-column gap-3">
          {selectedWallet.accounts.length>0?selectedWallet.accounts.map((data)=>{
            return(
              <Button variant="wallet" onClick={() => handleLogin(data)} className="d-flex flex-row w-100 justify-content-center align-items-center">
                <div className="d-flex flex-row align-items-center gap-2">
                  <Identicon value={data.address} size={40} theme={"polkadot"}/>
                  <p className="m-0 fw-bold fs-5">{data.meta.name}</p>
                </div>
              </Button>
            )
          }):<p>loading</p>}
        </div>
        <Button variant="back" onClick={handleBack} className="mt-4">Back</Button>        
        </>}
      </Modal.Body>
    </Modal>
    </>
  );
}
