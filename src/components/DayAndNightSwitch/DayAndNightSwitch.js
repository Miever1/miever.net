import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
  .switch__background,
  .switch__background:before,
  .switch__background:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .switch {
    width: 300px;
    height: 140px;
    display: block;
    position: relative;
    margin: 50px auto;
  }
  .switch__background {
    border-radius: 70px;
    box-shadow: 0 35px 70px -16px rgba(32, 15, 55, 0.3);
    transition: box-shadow 0.8s;
    overflow: hidden;
  }
  .switch__background:before {
    content: '';
    background: linear-gradient(#200f37, #272065);
    border-radius: 70px;
    transition: opacity 0.8s;
    overflow: hidden;
    z-index: -2;
  }
  .switch__background:after {
    content: '';
    opacity: 0;
    background: linear-gradient(to right, #21d2f2, #b0fff8);
    border-radius: 70px;
    transition: opacity 0.8s;
    z-index: -2;
  }
  .switch__toggle {
    content: '';
    height: 124px;
    width: 124px;
    position: relative;
    display: block;
    top: 8px;
    left: 8px;
    background: #fff;
    border-radius: 100%;
    box-shadow: inset 8px -8px 0 #f8e3ef, 0 0 93.33333333333333px rgba(255, 255, 255, 0.65);
    transition: left 0.8s, box-shadow 0.8s;
    overflow: hidden;
    cursor: pointer;
  }
  .switch__toggle:before,
  .switch__toggle:after {
    content: '';
    height: 90%;
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: -1;
    opacity: 0;
    transition: transition 0.8s, opacity 0.8s;
    background: rgba(255, 255, 255, 0.65);
    filter: blur(8px);
  }
  .switch__toggle:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .switch__toggle:after {
    transform: translate(-50%, -50%);
  }
  .switch__moon {
    width: 28px;
    height: 28px;
    display: block;
    position: absolute;
    left: 40%;
    top: 35%;

    background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
    box-shadow: 28px -28px 0 -8px rgba(248, 227, 239, 0.5);
    border-radius: 100%;

    transition: transform 0.8s, opacity 0.8s;
  }
  .switch__moon:before {
    content: '';
    width: 23px;
    height: 23px;
    display: block;
    position: absolute;
    left: -70%;
    top: 195%;

    background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
    box-shadow: 23px -23px 0 -8px rgba(248, 227, 239, 0.5);
    border-radius: 100%;

    transform: rotate(-60deg);
  }
  .switch__moon:after {
    content: '';
    width: 35px;
    height: 35px;
    display: block;
    position: absolute;
    left: 190%;
    top: 55%;

    background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
    box-shadow: 35px -35px 0 -8px rgba(248, 227, 239, 0.5);
    border-radius: 100%;
  }
  .switch__stars {
    width: 8px;
    height: 8px;
    display: block;
    position: absolute;
    left: 60%;
    top: 35%;
    background: #fff;
    box-shadow: 24px -24px 0 -3px #fff;
    filter: blur(0.5px);
    border-radius: 100%;
    transition: transform 0.8s, opacity 0.8s;
  }
  .switch__stars:before {
    content: '';
    width: 7px;
    height: 7px;
    display: block;
    position: absolute;
    left: 700%;
    top: 560%;
    background: #fff;
    box-shadow: 21px -21px 0 -3px #fff;
    filter: blur(0.5px);
    border-radius: 100%;
    transform: rotate(-75deg);
    transition: transform 0.8s, opacity 0.8s;
  }
  .switch__stars:after {
    content: '';
    height: 5px;
    width: 5px;
    position: absolute;
    left: 200%;
    top: 260%;
    opacity: 0;

    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    filter: blur(0.5px);
    border-radius: 100%;
    animation: falling-stars 6.4s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 3.2s;
  }
  .switch__clouds {
    height: 28px;
    width: 28px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: -84px;
    display: block;
    transition: 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 50% 50% 0 50%;
  }
  .switch__clouds:before,
  .switch__clouds:after {
    content: '';
    height: 23px;
    width: 23px;
    background: #fff;
    position: absolute;
    border-radius: 50% 50% 0 50%;
    left: -33%;
    bottom: 0;
    box-shadow: inset 4px -2px 0 #f6f8f8;
  }
  .switch__clouds:after {
    height: 21px;
    width: 21px;
    left: auto;
    right: -30%;
    border-radius: 100%;
  }
  .switch__input {
    display: none;
  }
  .switch__input:checked + .switch__background {
    box-shadow: 0 35px 70px -16px rgba(33, 210, 242, 0.3);
  }
  .switch__input:checked + .switch__background:before {
    opacity: 0;
  }
  .switch__input:checked + .switch__background:after {
    opacity: 1;
  }
  .switch__input:checked + .switch__background .switch__toggle {
    left: 168px;
    box-shadow: inset 0 0 0.1px #fff, 0 0 32px #fff;
    animation: overlay 0s forwards;
    animation-delay: 0.4s;
  }
  .switch__input:checked + .switch__background .switch__toggle:before,
  .switch__input:checked + .switch__background .switch__toggle:after {
    opacity: 1;
    transition-delay: 0.4s;
  }
  .switch__input:checked + .switch__background .switch__toggle:before {
    transform: translate(-50%, -50%) rotate(45deg);
    animation: spin-before 12.8s linear infinite;
  }
  .switch__input:checked + .switch__background .switch__toggle:after {
    transform: translate(-50%, -50%);
    animation: spin-after 12.8s linear infinite;
  }
  .switch__input:checked + .switch__background .switch__moon {
    opacity: 0;
    transform: translate(-50%, 100%) rotate(30deg);
  }
  .switch__input:checked + .switch__background .switch__stars {
    opacity: 0;
    transform: translateX(-47px);
  }
  .switch__input:checked + .switch__background .switch__stars:before {
    opacity: 0;
    transform: translateX(-35px);
  }
  .switch__input:checked + .switch__background .switch__stars:after {
    animation: none;
  }
  .switch__input:checked + .switch__background .switch__clouds {
    transform: translateX(150px);
    transition-delay: 0.2s;
    animation: cloud-move 8s linear infinite;
    animation-delay: 1.6s;
  }
  .switch__input:checked + .switch__background .switch__clouds:before,
  .switch__input:checked + .switch__background .switch__clouds:after {
    animation: cloud-move 8s linear infinite;
    animation-delay: 1.6s;
  }
  @-moz-keyframes overlay {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
  @-webkit-keyframes overlay {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
  @-o-keyframes overlay {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
  @keyframes overlay {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
  @-moz-keyframes spin-before {
    0% {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(405deg);
    }
  }
  @-webkit-keyframes spin-before {
    0% {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(405deg);
    }
  }
  @-o-keyframes spin-before {
    0% {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(405deg);
    }
  }
  @keyframes spin-before {
    0% {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(405deg);
    }
  }
  @-moz-keyframes spin-after {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-webkit-keyframes spin-after {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-o-keyframes spin-after {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes spin-after {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @-moz-keyframes falling-stars {
    0% {
      width: 50%;
      opacity: 1;

      transform: translate(70px, -70px) rotate(-45deg);
    }
    5% {
      width: 400%;
      opacity: 1;
    }
    15% {
      box-shadow: -100px -30px 0 -3px #fff;
    }
    25%,
    100% {
      box-shadow: -100px -30px 0 -6px #fff;
      width: 400%;
      opacity: 0;

      transform: translate(-70px, 70px) rotate(-45deg);
    }
  }
  @-webkit-keyframes falling-stars {
    0% {
      width: 50%;
      opacity: 1;

      transform: translate(70px, -70px) rotate(-45deg);
    }
    5% {
      width: 400%;
      opacity: 1;
    }
    15% {
      box-shadow: -100px -30px 0 -3px #fff;
    }
    25%,
    100% {
      box-shadow: -100px -30px 0 -6px #fff;
      width: 400%;
      opacity: 0;

      transform: translate(-70px, 70px) rotate(-45deg);
    }
  }
  @-o-keyframes falling-stars {
    0% {
      width: 50%;
      opacity: 1;

      transform: translate(70px, -70px) rotate(-45deg);
    }
    5% {
      width: 400%;
      opacity: 1;
    }
    15% {
      box-shadow: -100px -30px 0 -3px #fff;
    }
    25%,
    100% {
      box-shadow: -100px -30px 0 -6px #fff;
      width: 400%;
      opacity: 0;
      transform: translate(-70px, 70px) rotate(-45deg);
    }
  }
  @keyframes falling-stars {
    0% {
      width: 50%;
      opacity: 1;

      transform: translate(70px, -70px) rotate(-45deg);
    }
    5% {
      width: 400%;
      opacity: 1;
    }
    15% {
      box-shadow: -100px -30px 0 -3px #fff;
    }
    25%,
    100% {
      box-shadow: -100px -30px 0 -6px #fff;
      width: 400%;
      opacity: 0;

      transform: translate(-70px, 70px) rotate(-45deg);
    }
  }
  @-moz-keyframes cloud-move {
    0% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -100px -47px 5px -2px rgba(33, 210, 242, 0);
    }
    50% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -30px -47px 6px -2px #90e8f8;
    }
    90%,
    100% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -3px -47px 15px 2px rgba(33, 210, 242, 0);
    }
  }
  @-webkit-keyframes cloud-move {
    0% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -100px -47px 5px -2px rgba(33, 210, 242, 0);
    }
    50% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -30px -47px 6px -2px #90e8f8;
    }
    90%,
    100% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -3px -47px 15px 2px rgba(33, 210, 242, 0);
    }
  }
  @-o-keyframes cloud-move {
    0% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -100px -47px 5px -2px rgba(33, 210, 242, 0);
    }
    50% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -30px -47px 6px -2px #90e8f8;
    }
    90%,
    100% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -3px -47px 15px 2px rgba(33, 210, 242, 0);
    }
  }
  @keyframes cloud-move {
    0% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -100px -47px 5px -2px rgba(33, 210, 242, 0);
    }
    50% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -30px -47px 6px -2px #90e8f8;
    }
    90%,
    100% {
      box-shadow: inset 4px -2px 0 #f6f8f8, -3px -47px 15px 2px rgba(33, 210, 242, 0);
    }
  }
`;

const DayAndNightSwitch = () => {
  return (
    <StyledLabel>
      <label className="switch">
        <input className="switch__input" type="checkbox" />
        <span className="switch__background">
          <span className="switch__toggle">
            <span className="switch__moon"></span>
          </span>
          <span className="switch__stars"></span>
          <span className="switch__clouds"></span>
        </span>
      </label>
    </StyledLabel>
  );
};

export default DayAndNightSwitch;
