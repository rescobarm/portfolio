import React, { Component } from "react";
import styled from 'styled-components';
import "./css/Modals.css";

interface Props {
  isModalOpen?:boolean;
  toggleModal?:()=> void;
  modalTittle?:string;
}
interface State {
  isModalOpen:false;
}

export default class Modals extends Component<Props, State> {
  //state = {};
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        { this.props.isModalOpen && 
          <Overlay>
            <ModalContainer className="css_showOverflow show_border text-dark">
              <ModalHeader>
                <h3 className="text-dark">{this.props.modalTittle}</h3>
              </ModalHeader>
              <ModalClose onClick={this.props.toggleModal} >
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-x-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
              </ModalClose>
              <ModalContent>
                { this.props.children }
              </ModalContent>
            </ModalContainer>
          </Overlay>
        }
      </>
    );
  }
}

const ModalContainer = styled.div `
  margin: 3px;
  border: 10px solid darkblue;
  padding: 20px;
  width: 95%;
  height: 95%;
  background: #FFFFFF;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:1000;
`;



const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 42px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  p {
    font-size: 10px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`;



const ModalHeader = styled.div `
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: #1766DC;
  }
`;

const ModalClose = styled.div `
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766DC;
  &:hover {
    background: #f2f2f2;
  }
  svg {
    width:100%;
    height:100%;
  }
`;

/*
     <div className="modal-header">
            <p className="modal-tittle">Some text in the Modal..</p>
          </div>
          <div className="modal-content">
            <span className="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </span>

            { this.props.children }
          </div>

*/
