import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

const NavbarContainer = styled.div`
  display: flex;
  max-width: 1536px;
  margin: auto;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    p {
      color: black;
      font-size: 30px;
      font-weight: bold;
      font-family: "Alro", sans-serif;
    }
    img {
      height: 68px;
      width: 78px;
    }
  }

  flex-wrap: wrap;
  gap: 3;

  @media (max-width: 1570px) {
    padding: 0 1em;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;

  a {
    color: black;
    font-weight: bold;
    padding: 1rem;
    text-decoration: none;
    font-size: 16px;
    line-height: 24px;
    @media (max-width: 800px) {
      padding: 6px;
    }
  }
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  background: linear-gradient(
    90deg,
    #ce89ca 0%,
    #5885bf 33.33%,
    #7258df 66.67%,
    #75eea3 100%
  );
  color: white;
  font-weight: bold;
  padding: 20px 20px;
  border: none;
  border: 1.02px solid rgba(255, 255, 255, 1);
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  clip-path: polygon(
    0% 0%,
    1em 0%,
    100% 0%,
    100% calc(100% - 1em),
    calc(100% - 1em) 100%,
    0 100%
  );
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.5px;
  letter-spacing: -0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:hover {
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  const { open } = useAppKit();
  const { address, isConnected, caipAddress, status } = useAppKitAccount();
  console.log("status", status);
  console.log("caipAddress", caipAddress);
  console.log("isConnected", isConnected);
  const notify = () => toast.success("NO CONTENT FOUND");
  const downloadWhitepaper = () => {
    // Replace 'path-to-whitepaper.pdf' with your actual file path or URL
    const link = document.createElement('a');
    link.href = '/path-to-whitepaper.pdf'; // Adjust path as needed
    link.download = 'whitepaper.pdf'; // Name of the downloaded file
    link.click();
  };
  return (
    <>
    {/* <NavbarContainer>
      <div className="logo">
        <img
          src={require("./../assets/images/logo.png")}
          height={110}
          width={120}
          alt=""
        />
        <p>CHARLIE</p>
      </div>
      <NavLink>
        <Link>HOME</Link>
        <a href="#aboutus">ABOUT</a>
        <a href="https://www.charlietheunicoin.com/">FEATURES</a>
        <a href="#roadmap">ROADMAP</a>
      </NavLink>
      <NavButton>
        <Button
          onClick={
            isConnected ? () => open("Account") : () => open("Connect")
          }
        >
          {isConnected
            ? address.substring(0, 4) +
              "***" +
              address.substring(address.length - 4, address.length)
            : "CONNECT WALLET"}
        </Button>
      </NavButton>
    </NavbarContainer> */}
    <div className="px-6 md:px-36 py-6 md:py-10 gap-2 md:flex bg-custom-gradient">
      <div className="bg-[#1C1C1C] border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)] w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20 py-3 px-5">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-20">
          <img src="logo1.png" className="w-14 " alt="" />
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 text-center md:text-left">
          
        
         
 
            <a
              href="#"
              className="text-white text-3xl  font-extrabold cursor-pointer hover:bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white font-extrabold text-3xl  cursor-pointer"
            >
              About
            </a>
            <a
              href="#roadmap"
              className="text-white font-extrabold text-3xl  cursor-pointer"
            >
              Roadmap
            </a>
          </div>
        </div>
        <Button
          onClick={
            isConnected ? () => open("Account") : () => open("Connect")
          }
         
        >
          {isConnected
            ? address.substring(0, 4) +
              "***" +
              address.substring(address.length - 4, address.length)
            : "CONNECT WALLET"}
        </Button>
      </div>
      <div className=""></div>
    </div>
  </>
);
};

export default Navbar;
