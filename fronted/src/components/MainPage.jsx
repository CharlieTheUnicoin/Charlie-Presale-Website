import React, { useEffect, useState } from "react";
import { format, re } from "mathjs";
import styled from "styled-components";
import CountdownTimer from "./CountDown";
import { toast } from "react-toastify";
import { PER_USDT_TO_BNB } from "../contracts/contracts";
import useContract from "../hooks/useContract";
import ClipLoader from "react-spinners/ClipLoader";
import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CopyToClipboardButton from "./CoppyBtn";
import { useAppKitAccount } from "@reown/appkit/react";
import linkedinLogo from '../assets/linkedin.png'; // Adjust the path as necessary
import {
  TOKEN_CONTRACT_ADDRESS,
  PRESALE_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  TOKEN_ABI,
  PRESALE_ABI,
  
  
} from "../contracts/contracts";
import { ethers } from "ethers";


// import { FaTelegramPlane } from "react-icons/fa";
// import { FaDiscord } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import Iconslink from "../assets/Linktree-Emblem-removebg-preview.png";
// import Roadmap from "../assets/RMupdate.jpg";
// import AutoSlider from "./AutoSlider.js";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const HeroSection = styled.section`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1em;
    width: 95%;
    margin: auto;
    margin-top: 3em;
  }
.claim-btn {
  background-color: #38a169; /* Green */
  color: #ffffff; /* White text */
  padding: 10px 20px; /* Padding for the button */
  border-radius: 8px; /* Rounded corners */
  font-weight: bold; /* Bold text */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth hover effects */
}

.claim-btn:hover {
  background-color: #2f855a; /* Darker green on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.claim-btn:disabled {
  background-color: #a0aec0; /* Disabled state color */
  cursor: not-allowed; /* Disabled cursor */
}

  .left {
    width: 60%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(171, 130, 171, 0.2),
      rgba(88, 133, 191, 0.2),
      rgba(102, 125, 111, 0.2)
    );
    border: 1px solid rgba(68, 68, 68, 1);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: flex-start;

    @media (max-width: 768px) {
      width: 100%;
    }
    .main-heading {
      flex-wrap: wrap;
    }

    .live {
      background: linear-gradient(
        90deg,
        #ce89ca 0%,
        #5885bf 33.33%,
        #7258df 66.67%,
        #75eea3 100%
      );
      clip-path: polygon(
        0% 1em,
        1em 0%,
        100% 0%,
        100% calc(100% - 1em),
        calc(100% - 1em) 100%,
        0 100%
      );
      color: #fff;
      font-size: 0.875rem;
      letter-spacing: 0.02857em;
      min-width: 64px;
      padding: 8px 10px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;

      i {
        margin-right: 0.2rem;
      }

      .icon {
        border-radius: 50%;
        padding: 0.2rem;
        margin-right: 0.2rem;
      }
    }

    .live:hover {
      transform: scale(1.05);
    }
    .presale-details {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      padding: 0rem 1rem 1rem 1rem;

      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }

      .token {
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        padding: 0.1rem 0.5rem;
        border-radius: 2rem;
        font-weight: 500;
        font-size: 0.875rem;
        min-width: 64px;
        text-align: center;
      }
    }

    h1 {
      text-transform: none;
      font-size: 60px;
      font-weight: 800;
      color: #fff;
    }

    p {
      font-size: 24px;
      font-weight: 500;
    }
  }

  .right {
    width: 35%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    border: 2px solid black;
    background: linear-gradient(
      to right,
      rgba(171, 130, 171, 0.2),
      rgba(88, 133, 191, 0.2),
      rgba(102, 125, 111, 0.2)
    );
    border: 0;

    flex-direction: column;
    color: #fff;

    @media (max-width: 768px) {
      width: 100%;
      margin-top: 2em;
    }

    h2 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .timer {
      color: #fff;
      font-size: 20px;
      font-weight: 900;
    }

    .details {
      margin: 56px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-weight: 700;
      font-size: 20px;
    }

    .count {
      font-weight: 700;
      font-size: 20px;
      padding-bottom: 16px;
    }

    .contribute {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 600;
        font-size: 16px;
      }

      select {
        border: 2px solid #444444;
        padding: 8px;
        color: white;
        background: none;
        font-size: 16px;
        width: 30%;
        border-radius: 8px;
      }
    }

    .amount {
      margin: 15px 0;
      input {
        border: 2px solid #444444;
        padding: 12px;
        font-size: 16px;
        width: 100%;
        background: none;
        border-radius: 8px;
        color: white;
      }
    }

    .total {
      padding: 12px 0;
      font-weight: 700;
      font-size: 20px;
    }

    .buy_btn {
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

      font-family: Montserrat;
      font-size: 20px;
      font-weight: 600;
      line-height: 19.5px;
      letter-spacing: -0.02em;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
    }
    .buy_btn.disabled {
      background: #999999;
      color: white;
    }
  }
`;

export const Footer = styled.footer`
  // background: #000;
  padding-bottom: 2em;
  // position: absolute;
  width: 100%;


  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1em;
    color: black;
  }

  li {
    list-style: none;
    color: black;
    font-size: 1em;
    font-weight: 400;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3em;
    align-items: center;
    width: 80%;
    margin: auto;
  }

  .first {
    .social-icon {
      display: flex;
      gap: 1em;
      margin: 1em 0;
    }

    p {
      color: black;
      font-size: 1em;
      font-weight: 600;
    }
  }

  .sec {
    color: white;

    h3 {
      color: white;
      padding-bottom: 1.3em;
    }
  }
  }
`;

const MainPage = () => {
  const [paymenType, setPaymentType] = useState("ETH");
  const [amount, setAmount] = useState();
  const [receiveable, setReceiveable] = useState();

  const [balance, setBalance] = useState(0);
  const [maxBalance, setMaxBalance] = useState(null);
  const [price, setPrice] = useState(0);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const { buy, myTokenBalance, maxBalances, getPrice,claimTokens } = useContract();
  const { address, isConnected, caipAddress, status } = useAppKitAccount();
  console.log(isConnected);

  useEffect(() => {
    const _getPrice = async () => {
      const _price = await getPrice();
      console.log(_price);
      setPrice(_price);
    };
    if (isConnected) _getPrice();
  }, [isConnected]);

  const handlePaymentChange = (e) => {
    console.log(price);
    if (!price) {
      return;
    }
    const precision = 15; // Precision for calculations

    const formatValue = (value) => {
      if (Math.abs(value) < 1e-6) {
        // For very small values, use fixed-point notation with high precision
        return value.toFixed(precision);
      }
      return parseFloat(value.toFixed(precision)); // Trim trailing zeros for normal values
    };

    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "amount") {
      setAmount(inputValue); // Store raw input as string
      const numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue)) {
        if (paymenType === "ETH") {
          const value = numericValue * price * PER_USDT_TO_BNB;
          setReceiveable(formatValue(value).toString());
        } else if (paymenType === "USDT") {
          const value = numericValue * price;
          setReceiveable(formatValue(value).toString());
        } else if (paymenType === "USDC") {
          const value = numericValue * price;
          setReceiveable(formatValue(value).toString());
        }
      }
    } else if (inputName === "receiveable") {
      setReceiveable(inputValue); // Store raw input as string
      const numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue)) {
        if (paymenType === "ETH") {
          const value = numericValue / price / PER_USDT_TO_BNB;
          setAmount(formatValue(value).toString());
        } else if (paymenType === "USDT") {
          const value = numericValue / price;
          setAmount(formatValue(value).toString());
        } else if (paymenType === "USDC") {
          const value = numericValue / price;
          setAmount(formatValue(value).toString());
        }
      }
    }
  };
  useEffect(() => {
    const _balance = async () => {
      const _myBalance = await myTokenBalance();
      console.log(_myBalance);
      setBalance(_myBalance);
      const _maxBalance = await maxBalances();
      console.log(_maxBalance);
      setMaxBalance(_maxBalance);
    };
    if (address) _balance();
  }, [address]);

  const { getPresaleAllocation } = useContract();
  const [unclaimedTokens, setUnclaimedTokens] = useState(null);

  useEffect(() => {
    const fetchUnclaimedTokens = async () => {
      try {
        const allocation = await getPresaleAllocation();
        setUnclaimedTokens(allocation);
      } catch (error) {
        console.error("Error fetching unclaimed tokens:", error.message || error);
        setError(error.message || "Failed to fetch unclaimed tokens.");
      }
    };

    fetchUnclaimedTokens();
  }, [getPresaleAllocation]);






  const handleClaimTokens = async () => {
    try {
      await claimTokens();
      toast.success("Claim Sucessful");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Error Claiming");
      setLoading(false);
    }
  }
  const downloadWhitepaper = () => {
    // Replace 'path-to-whitepaper.pdf' with your actual file path or URL
    const link = document.createElement('a');
    link.href = '/CharlieWhitepaper.pdf'; // Adjust path as needed
    link.download = 'whitepaper.pdf'; // Name of the downloaded file
    link.click();
  };

  const redirectToMainSite = () => {
    // Replace '/CharlieWhitepaper.pdf' with your actual URL
    window.location.href = 'https://www.charlietheunicoin.com/';
  };










  

  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto slide
    autoplaySpeed: 3000, // 3 seconds for each slide
  };

  const logosWithText = [
    { logo: "logo1.png", text: "AI CHAT BOT" },
    { logo: "logo1.png", text: "AI CHAT BOT" },
    { logo: "logo1.png", text: "AI CHAT BOT" },
    { logo: "logo1.png", text: "AI CHAT BOT" },
  ];


  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 2, // Number of slides visible
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Speed for autoplay
    pauseOnHover: true, // Pause on hover
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const data = {
    labels: ['40%', '10%', '20%', '30%'], // Labels for each segment
    datasets: [
      {
        data: [40, 10, 20, 30], // Values for each segment
        backgroundColor: ['#4CAF50', '#FF7043', '#9C27B0', '#00BCD4'], // Segment colors
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'], // Border color
        borderWidth: 2, // Border width for segments
      },
    ],
  };





  const [totalTokensSold, setTotalTokensSold] = useState(null); // State for total tokens sold

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        // Connect to the Ethereum network using a public RPC provider
        const provider = new ethers.JsonRpcProvider(
          "https://base-mainnet.g.alchemy.com/v2/y4AQ9T9QALtdnQP8eSB-XoFk2LfMQ2pp"
        );

        // Create a contract instance
        const contract = new ethers.Contract(
          PRESALE_CONTRACT_ADDRESS,
          PRESALE_ABI,
          provider
        );

        // Fetch `totalUsers` from the contract
        const users = await contract.totalUsers();
        setTotalUsers(users.toString()); // Convert BigNumber to string

        // Fetch `totalTokensSold` from the contract
        const tokensSold = await contract.totalTokensSold();
        const formattedTokensSold = parseFloat(
          ethers.formatUnits(tokensSold, 18)
        ).toFixed(2); // Format to two decimals
        setTotalTokensSold(formattedTokensSold);
      } catch (error) {
        console.error("Error fetching contract data:", error.message);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchContractData();
  }, []);
  











  const [totalUsdRaised, setTotalUsdRaised] = useState(null); // State for total USD raised

  const tokenPriceInUsd = 0.00022; // Example price per token in USD (adjust this)

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        // Connect to the Ethereum network using a public RPC provider
        const provider = new ethers.JsonRpcProvider(
          "https://base-mainnet.g.alchemy.com/v2/y4AQ9T9QALtdnQP8eSB-XoFk2LfMQ2pp"
        );

        // Create a contract instance
        const contract = new ethers.Contract(
          PRESALE_CONTRACT_ADDRESS,
          PRESALE_ABI,
          provider
        );

        // Fetch `totalUsers` from the contract
        const users = await contract.totalUsers();
        setTotalUsers(users.toString()); // Convert BigNumber to string

        // Fetch `totalTokensSold` from the contract
        const tokensSold = await contract.totalTokensSold();
        const formattedTokensSold = parseFloat(
          ethers.formatUnits(tokensSold, 18)
        ).toFixed(2); // Format to two decimals
        setTotalTokensSold(formattedTokensSold);

        // Calculate total USD raised
        const usdRaised = (formattedTokensSold * tokenPriceInUsd).toFixed(2); // Multiply tokens sold by price
        setTotalUsdRaised(usdRaised);
      } catch (error) {
        console.error("Error fetching contract data:", error.message);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchContractData();
  }, []);













 const slides = [
    {
      image: "https://via.placeholder.com/300x200?text=Slide+1",
      title: "Slide 1 Title",
      description: "This is the description for slide 1.",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Slide+2",
      title: "Slide 2 Title",
      description: "This is the description for slide 2.",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Slide+3",
      title: "Slide 3 Title",
      description: "This is the description for slide 3.",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Slide+4",
      title: "Slide 4 Title",
      description: "This is the description for slide 4.",
    },
  ];







  const faqs = [
    {
      question: "Why did we create 'CHRLE'?",
      answer: "As passionate crypto enthusiasts and dedicated meme coin fans, we were weary of the repetitive nature of meme coin iterations. Feeling a sense of duty to create something truly unique, we embarked on the journey to craft CHRLE. We've always envisioned ourselves as part of meme coin history, dreaming of the day when a small project like ours would make waves in the crypto world, garnering attention even from those outside the crypto community. Faced with the challenge of discovering such a hidden gem in the crypto space, we decided to take matters into our own hands. As the saying goes, if you want something done right, do it yourself. With a team of well trusted individuals, we set out to bring CHRLE to life. Committed to transparency and security, we are proud to be KYC verified, SAFU verified, and have undergone a comprehensive audit. Our contract is renounced, and team tokens are securely locked for 365 days. With a USA-based team, we are determined to make CHRLE a household name!s here",
    },
    {
      question: "Is the contract renounced?",
      answer: "IT WILL BE. YES",
    },
    {
      question: "Are team tokens locked?",
      answer: "YES, FOR 365 DAYS.",
    },
    {
      question: "Are the liquidity pools locked?",
      answer: "YES FOR 10 Years!",
    },
    {
      question: "Is the team KYC verified?",
      answer: "YES",
    },
    {
      question: "Is the project SAFU?",
      answer: "YES FOR 10 Years!",
    },
    {
      question: "Is the contract audited?",
      answer: "YES",
    },
    {
      question: "Is the team located in the United States?",
      answer: "YES",
    },
    {
      question: "Is the chatbot available to everyone?",
      answer: "Yes and no. It will be available in our telegram group for free, and available on our website to verified holders.",
    },
    {
      question: "Is the AI image generator available to everyone?",
      answer: "Yes and no. It will be available in our telegram group for free, and available on our website to verified holders.",
    },


    {
      question: "Is the AI video generator available to everyone?",
      answer: "No, verified holders only!",
    },
    {
      question: "Is the mini game available to everyone?",
      answer: "Yes and no. It will be available in our telegram group for free, and available on our website to verified holders.",
    },
    {
      question: "Is the AI image generator available to everyone?",
      answer: "Yes.",
    },
    {
      question: "Is the meme generator available to everyone?",
      answer: "YES",
    },
    {
      question: "Is the soundboard available to everyone?",
      answer: "YES",
    },
    {
      question: "Can we stake our CHRLE Tokens?",
      answer: "YES",
    },
    {
      question: "Is there a penalty for un-staking early?",
      answer: "Yes, you will be taxed 25% for un-staking before your selected staking time has been reached! We have an obligation to shun the nonbelievers!",
    },




    {
      question: "Is there a buy and sell tax?",
      answer: "NO! We have a 0% Tax!",
    }, {
      question: "Is CharlieSwap available to everyone?",
      answer: "YES",
    }, {
      question: "Are we committed to the longevity of the project?",
      answer: "1000% Yes! We’re here to make history! We are completely determined and committed to make this project a household name in not only the meme coin space but the cryptocurrency community as a whole! We want to build our project so it doesn’t just last one bull cycle, we want our project to last a lifetime in the world of crypto! ",
    }, {
      question: "What are governance and launchpad tokens?",
      answer: "‘governance’ tokens are your gateway to voting rights. launchpad tokens are your gateway to presale's.",
    }, {
      question: "How do I earn ‘governance’ and ‘launchpad’ Tokens?",
      answer: "You earn governance tokens by staking CHRLE. You earn launchpad tokens by staking.",
    },
  ];
// State to track active question
const [activeIndex, setActiveIndex] = useState(null);

// Toggle answer visibility
const toggleFAQ = (index) => {
  setActiveIndex(activeIndex === index ? null : index); // Close if already open
};




const members = [
  {
    name: "Lukasz Szymborski",
    role: "CEO",
    photo: "ceo.jpg",
    linkedin: "https://pl.linkedin.com/in/%C5%82ukasz-szymborski-8bab38205?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile",
    flag: require('../assets/flag.png')// Flag image for USA

   
  },
  {
    name: "Ryan",
    role: "CFO",
    photo: "CFO.jpg",
    linkedin: "https://www.linkedin.com/",
    flag: require('../assets/usa.png')// Flag image for USA
  },
  {
    name: "Kaleehi",
    role: "Secretary",
    photo: "Kaleehi.jpg",
    linkedin: "https://www.linkedin.com/",
    flag: require('../assets/usa.png')
  },
];









const goals = [
  {
    question: "Primary Goal",
    answer: "Our primary goal is to create a unique ecosystem that will stand the test of time and safely take our community on an adventure to the moon! All without stealing your organs!",
  },
  {
    question: "Blockchain Goal",
    answer: "We're commencing our journey on Base chain for strategic reasons, yet our roadmap includes bridging to many additional chains shortly after our initial launch. Our overarching aim is to extend our reach across multiple blockchains!",
  },
  {
    question: "CEX Goal",
    answer: "Focused on elite CEX listings! While our strategy emphasizes broad blockchain and DEX integration, we're primed for top-tier CEX placements. Expect nothing less than major tier 1 and tier 2 exchange listings from us!",
  },
  {
    question: "Fundraising Goal",
    answer: "Our fundraising target is $10,000,000. This amount empowers us to meticulously execute our vision, ensuring optimal outcomes for both our project and community. Detailed fundraising distribution and tokenomics are outlined below.",
  },
  {
    question: "Future Goal",
    answer: "We aspire to become the epitome of success within the cryptocurrency realm, positioning ourselves as the foremost meme coin ever introduced. To transcend the boundaries and become the first meme coin to achieve a groundbreaking $100B market cap, setting an unprecedented benchmark. ",
  },
  {
    question: "END GOAL",
    answer: "Our team has a lot of incredible ideas that we haven’t mentioned yet, but our end goal is to evolve into a layer 2 protocol.",
  },
];


const PHASES = [
  {
    question: "Phase 1",
    answer: "• 10 billion tokens sold * $0.00020/token = $2,000,000 ",
  },
  {
    question: "Phase 2",
    answer: "•10 billion tokens sold * $0.00024/token = $2,400,000 (20% price increase.)",
  },
  {
    question: "Phase 3",
    answer: "10 billion tokens sold * $0.00028/token = $2,880,000 (16% price increase.)",
  },
  {
    question: "Phase 4",
    answer: "10 billion tokens sold * $0.000345/token = $3,450,000 (23% price increase.)",
  },
  {
    question: "Phase 5",
    answer: "10 billion tokens sold * $0.000414/token = $4,140,000 (20% price increase.)",
  },
  {
    question: "Phase 6",
    answer: "10 billion tokens sold * $0.000496/token = $4,960,000 (10% price increase.) . Total of 6 phases raised : $19 830 000",
  },


];


const [totalUsers, setTotalUsers] = useState(null); // State to hold the total users
const [error, setError] = useState(null); // State for any errors

useEffect(() => {
  const fetchTotalUsers = async () => {
    try {
      // Connect to the Ethereum network using a public RPC provider
      const provider = new ethers.JsonRpcProvider(
        "https://base-mainnet.g.alchemy.com/v2/y4AQ9T9QALtdnQP8eSB-XoFk2LfMQ2pp"
      );

      // Create a contract instance
      const contract = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        PRESALE_ABI,
        provider
      );

      // Call the `totalUsers` function
      const users = await contract.totalUsers();
      setTotalUsers(users.toString()); // Convert BigNumber to string
    } catch (error) {
      console.error("Error fetching total users:", error.message);
      setError("Failed to fetch total users. Please try again later.");
    }
  };

  fetchTotalUsers();
}, []);









  const handleBuy = async () => {
    setLoading(true);
    if (paymenType == "ETH") {
      if (amount > maxBalance.eth) {
        toast.error("Not enough eth balance");
        setLoading(false);
        return;
      }
    } else if (paymenType == "USDT") {
      if (amount > maxBalance.usdt) {
        toast.error("Not enough USDT balance");
        setLoading(false);
        return;
      }
    } else if (paymenType == "USDC") {
      if (amount > maxBalance.busd) {
        toast.error("Not enough BUSD balance");
        setLoading(false);
        return;
      }
    }
    try {
      await buy(paymenType, amount);
      toast.success("Buy Sucessful");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Error is Buying");
      setLoading(false);
    }
  };
  const presalesite = () => {
    // Replace '/CharlieWhitepaper.pdf' with your actual URL
    window.location.href = 'https://www.charlietheunicoin.sale/';
  };
  const nftsite = () => {
    // Replace '/CharlieWhitepaper.pdf' with your actual URL
    window.location.href = 'https://www.charlietheunicoinnft.com';
  };
  
  const handlePaymentTypechange = (type) => {
    setPaymentType(type);
    setAmount(0);
    setReceiveable(0);
  };

  return (
    <>
    <div className=" font-[Montserrat] ">
      {/* Header */}
      {/* <div className="px-6 md:px-36 py-6 md:py-10 gap-2 md:flex bg-custom-gradient">
        <div className="bg-[#1C1C1C] border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)] w-full flex flex-col md:flex-row items-center gap-4 md:gap-20 py-3 px-5">
          <img src="logo1.png" className="w-14 " />
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
        <div className="flex justify-center md:justify-start">
          <button className="bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 text-white py-2 px-5 md:py-3 md:px-9 rounded-bl-lg rounded-tr-md rounded-tl-md mt-4 md:mt-0">
            Connect
          </button>
        </div>
      </div> */}
      {/* Main Image Section */}
      <div className="flex justify-center gap-2 md:gap-4 py-6 bg-custom-gradient">
        <img src="nft2.png" alt="" className="w-36 md:w-60" />
        <img src="nft.png" alt="" className="absolute w-28 md:w-48" />
        <img src="nft1.png" alt="" className="w-36 md:w-60" />
      </div>
      <div className="pt-6 pb-6 text-center bg-custom-gradient ">
        <h1 className="text-[#7258DF] text-xl md:text-2xl font-extrabold">
        TOKEN PRESALE IS OFFICIALLY LIVE! YOU CAN PURCHASE YOUR CHARLIE TOKENS BELOW!
        </h1> <br />
        <p className="text-white text-sm md:text-base">
        What is Charlie The Unicoin? Is it a meme? A DAO? A DEX? An AI project? DeFi? An NFT collection? An animated series?          <br className="hidden md:inline" />Well, yes—it's all of that and so much more! Charlie The Unicoin is an innovative blend of meme magic, artificial intelligence, DeFi, gaming, NFTs, animated mayhem, and too many more to list here!
        <br className="hidden md:inline" />
        </p>
      </div>
      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 p-5  bg-gradient-to-r from-[rgba(171,130,171,0.2)] via-[rgba(88,133,191,0.2)] to-[rgba(102,125,111,0.2)] border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)]  mx-4 md:mx-40 mt-8 mb-1 rounded-lg shadow-md">
          <div className="p-2">
            <img
              src="cs.png"
              alt="CyberScope logo"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="p-2">
            <img
              src="audit.jpeg"
              alt="Audit Certificate"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="p-2">
            <img
              src="kyc.png"
              alt="KYC Certificate"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

      <div className=" text-[#7258DF] text-xl md:text-2xl font-extrabold pt-6 pb-6 text-center bg-custom-gradient flex flex-col md:flex-row gap-4 p-5  bg-gradient-to-r from-[rgba(171,130,171,0.2)] via-[rgba(88,133,191,0.2)] to-[rgba(102,125,111,0.2)] border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)]  mx-4 md:mx-40 mt-8 mb-1 rounded-lg shadow-md" style={{ textAlign:"center",justifyContent:"center", textDecoration: "none" }}>
        <h1 className="text-[#7258DF] text-xl md:text-2xl font-extrabold" style={{ textAlign:"center",justifyContent:"center", textDecoration: "none" }}>
     <b />  All Tokens will be claimable after the presale has completed.
     </h1>
 
      </div>
      <div className=" text-[#7258DF] text-xl md:text-2xl font-extrabold pt-6 pb-6 text-center bg-custom-gradient flex flex-col md:flex-row gap-4 p-5  bg-gradient-to-r from-[rgba(171,130,171,0.2)] via-[rgba(88,133,191,0.2)] to-[rgba(102,125,111,0.2)] border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)]  mx-4 md:mx-40 mt-8 mb-1 rounded-lg shadow-md" style={{ textAlign:"center",justifyContent:"center", textDecoration: "none" }}>
        <h1 className="text-[#7258DF] text-xl md:text-2xl font-extrabold" style={{ textAlign:"center",justifyContent:"center", textDecoration: "none" }}>
     <b />
    <div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {totalUsers !== null ? <p>Total Unique Users: {totalUsers}</p> : <p>...</p>}
          {totalTokensSold !== null ? (
            <p>Total Tokens Sold: {totalTokensSold}</p>
          ) : (
            <p>...</p>
          )}
          {totalUsdRaised !== null ? (
            <p>Total USD Raised: ${totalUsdRaised}/$19 830 000</p>
          ) : (
            <p>...</p>
          )}
        </>
      )}
    </div>
     </h1>
 
      </div>


      
      <HeroSection id="home">
        
        <div className="left sm:ml-[1rem] bg-[#1C1C1C] border-1 [clip-path:polygon(0%_1.5em,_1.5em_0%,_100%_0%,_100%_calc(100%_-_1.5em),_calc(100%_-_1.5em)_100%,_0_100%)] ">
          <div className="p-[1rem] ">
            <div
              className="flex justify-between py-2 px-4 flex-align-center  main-heading bg-[#444444]/30   border-2 border-[#444444]   [clip-path:polygon(0%_1.5em,_1.5em_0%,_100%_0%,_100%_calc(100%_-_1.5em),_calc(100%_-_1.5em)_100%,_0_100%)]
        "
            >
              <div className="flex flex-align-center">
                <img src={"./logo.png"} height={60} width={60} alt="" />
                <h2 className="text-white font-semibold">$CHRLE</h2>
              </div>
              <div className="flex flex-align-center">
                <div style={{}} className="live font-semibold ">
                  Live
                </div>
                <div className="live font-semibold">KYC</div>
                <div className="live font-semibold">
                  <a
                    href="https://www.cyberscope.io/audits/chrle"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    AUDIT
                  </a>
                </div>
           
              </div>
            </div>
          </div>
       
          {/* <div className="flex flex-align-center gap-1">
            <div className="live">SAFU</div>
          <div className="live">
            <i className="fa-solid fa-lock"></i> AUDIT
          </div>
          </div> */}
          <div className="presale-details" style={{ color: "white" }}>
          <div className="live font-semibold">
             

             <button onClick={downloadWhitepaper}  style={{ color: "#fff", textDecoration: "none" }}>WHITEPAPER</button>
           </div>
           <div className="live font-semibold" style={{  marginTop:"10px"}}>
             

             <button onClick={redirectToMainSite}  style={{ color: "#fff", textDecoration: "none",  }}>MAIN SITE</button>
           </div>
             
            <div
              style={{ marginBottom: "10px", flexWrap: "wrap" ,marginTop:"10px"}}
              className="flex justify-between py-3 px-4 flex-align-center  main-heading border-2 border-[#444444] bg-[#444444]/30 [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]  "
            >
              {/* <p></p> */}
              <a
                href="https://basescan.org/address/0x22a91ac4bcc618bdc2ce62020fc165b75a10033b"
                className=" text-white hover:text-[#989898] hover:underline uppercase"
              >
             PRESALE CONTRACT 
             ADRESS
              </a>
              <div className="flex flex-align-center gap-2">
                <p className="token !text-[7px] sm:!text-[16px] ">
                0x22a91ac4bcc618bdc2ce62020fc165b75a10033b
                </p>
                <CopyToClipboardButton
                  textToCopy={"0x22a91ac4bcc618bdc2ce62020fc165b75a10033b"}
                />
              </div>
            </div>
            <p>Presale Details</p>
            <div className="flex justify-between">
              <p>Current Price:</p>
              <p> $0.0002</p>
            </div>
            <div className="flex justify-between">
              <p>Next Price:</p>
              <p> $0.00024</p>
            </div>
          
            <div className="flex justify-between">
              <p>Token Name: </p>
              <p> CHARLIE</p>
            </div>
            <div className="flex justify-between">
              <p>Token Decimals: </p>
              <p> 18</p>
            </div>
            <div className="flex justify-between">
              <p>Token Symbol: </p>
              <p> $CHRLE</p>
            </div>
            <div className="flex justify-between">
              <p>Supply: </p>
              <p>100 Billion</p>
            </div>
            <div className="flex justify-between">
              <p>Network: </p>
              <p> Base Network (ETH)</p>
            </div>
            {/* <p>Market Cap: $18,155,000</p> */}
            {/* <p style={{ marginBottom: "5px" }}>Listing Price: 0.00015 </p> */}
            {/* <p>Token Hardcap: 540,000 USDT</p>
          <p style={{ marginBottom: "5px" }}>
            Total Allocated Tokens: 135,000,000
          </p> */}
            {/* <p>Vesting: 60% claim after presale</p>
          <p style={{ marginBottom: "5px" }}>40% claim by 5% each week</p>
          <p>Tokens will be sent to your wallet after the Presale ends.</p> */}
          </div>
        </div>

        <div className="right !px-4 sm:!px-[2rem] pt-2 [clip-path:polygon(0%_1.5em,_1.5em_0%,_100%_0%,_100%_calc(100%_-_1.5em),_calc(100%_-_1.5em)_100%,_0_100%)]">
          <h2 className="text-white text-center"> PRESALE BEGINS IN</h2>
          <h2 className="text-white text-center">NETWORK: BASE CHAIN ETH</h2>
          {/* <p className="timer">0&nbsp;:&nbsp;0&nbsp;:&nbsp;95</p> */}
          <CountdownTimer />

          <div className="details !mb-3 !mt-6 ">
            <p>Min : 1 USDT</p>
          </div>

          {/* <div className="count">Claimable: 20 CHRLE</div>
        <div className="count">
          Claimed: {Number(balance).toFixed(4)} CHRLE
        </div> */}

          {/* <div className="contribute">
            <span className="text-white">
              Contribute (1USD = 10,000 $CHRLE)
            </span>
            <select
              name="cont"
              id="cont"
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="ETH" className="text-black">
                ETH
              </option>
              <option value="USDC" className="text-black">
                USDC
              </option>
              <option value="USDT" className="text-black">
                USDT
              </option>
            </select>
          </div> */}

          {/* <div className="amount">
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder={`Enter  Amount`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div> */}
          <div className="  text-white">
            <p className="text-white text-center mb-2 font-semibold">
              1USD = 5000 $CHRLE
            </p>
          </div>
          <div className=" rounded-lg w-full  mx-auto">
            {/* Payment Options */}
            <div className="flex justify-between space-x-2 sm:space-x-4  mb-4">
              <button
                onClick={(e) => handlePaymentTypechange("ETH")}
                className={`flex items-center sm:space-x-2 font-semibold ${
                  paymenType === "ETH"
                    ? "bg-custom-gradient-button text-white "
                    : "bg-gray-500 text-white"
                } px-[.50rem] py-2 sm:px-4 sm:py-2 shadow-md [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]`}
              >
                <img
                  src="./ETH.svg"
                  alt="ETH"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-[14px] sm:text-base">ETH</span>
              </button>
              <button
                onClick={(e) => handlePaymentTypechange("USDT")}
                className={`flex items-center sm:space-x-2 font-semibold ${
                  paymenType === "USDT"
                    ? "bg-custom-gradient-button text-white "
                    : "bg-gray-500 text-white"
                } px-[.50rem] py-2 sm:px-4 sm:py-2 [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)] shadow-md`}
              >
                <img
                  src="./usdt.svg"
                  alt="USDT"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-[14px] sm:text-base">USDT</span>
              </button>
              <button
                onClick={(e) => handlePaymentTypechange("USDC")}
                className={`flex items-center  sm:space-x-2 font-semibold ${
                  paymenType === "USDC"
                    ? "bg-custom-gradient-button text-white "
                    : "bg-gray-500 text-white"
                } px-[.50rem] py-2 sm:px-4 sm:py-2 [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)] shadow-md`}
              >
                <img
                  src="./usdc.svg"
                  alt="USDT"
                  className=" w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-[14px] sm:text-base">USDC</span>
              </button>
              <button
                onClick={(e) => setPaymentType("CARD")}
                className={`flex items-center sm:space-x-2 font-semibold ${
                  paymenType === "CARD"
                    ? "bg-custom-gradient-button text-white "
                    : "bg-gray-500 text-white"
                } px-[.50rem] py-2 sm:px-4 sm:py-2 [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)] shadow-md`}
              >
                <img
                  src="./card.svg"
                  alt="CARD"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-[14px] sm:text-base">CARD</span>
              </button>
            </div>

            {/* Input Fields */}
            <div>
              <div className="text-white mb-2 flex justify-between">
                <span>
                  Pay with
                  {paymenType === "ETH"
                    ? " ETH"
                    : paymenType === "USDT"
                    ? " USDT"
                    : paymenType === "USDC"
                    ? " USDC"
                    : " CARD"}
                </span>
                <span
                  className="text-green-400 cursor-pointer "
                  onClick={
                    paymenType === "ETH"
                      ? (e) => {
                          e.target.name = "amount";
                          e.target.value = 10000 / PER_USDT_TO_BNB;
                          handlePaymentChange(e);
                        }
                      : (e) => {
                          e.target.name = "amount";
                          e.target.value = 10000;
                          handlePaymentChange(e);
                        }
                  }
                >
                  Max
                </span>
              </div>
              <div className="flex items-center border-[2px] border-[#444444] p-2 rounded-lg mb-4">
                <input
                  name="amount"
                  type="number"
                  placeholder="0"
                  className="bg-transparent text-white placeholder-gray-300 flex-1 outline-none px-2"
                  value={amount}
                  onChange={handlePaymentChange}
                />
                <img
                  src={
                    paymenType === "ETH"
                      ? "./ETH.svg"
                      : paymenType === "USDT"
                      ? "./usdt.svg"
                      : paymenType === "USDC"
                      ? "./usdc.svg"
                      : "./usd.png"
                  }
                  alt="ETH"
                  className="w-6 h-6"
                />
              </div>

              <div className="text-white mb-2">
                <span>$CHRLE You receive</span>
              </div>
              <div className="flex items-center border-[2px] border-[#444444] p-2 rounded-lg ">
                <input
                  id="amount"
                  type="number"
                  name="receiveable"
                  placeholder="0"
                  value={receiveable}
                  onChange={handlePaymentChange}
                  className="bg-transparent text-white placeholder-gray-300 flex-1 outline-none px-2"
                />
                <img src="./logo.png" alt="$CHRLE" className="w-7 h-7" />
              </div>
            </div>

            {/* Buttons */}
            {/* <div className="flex justify-between space-x-4">
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg w-1/2">
                Connect Wallet
              </button>
              <button className="bg-yellow-400 text-blue-600 px-4 py-2 rounded-lg w-1/2">
                Switch To BNB
              </button>
            </div> */}
          </div>

          <div className="flex justify-between items-center ">
            <span className="total">Total Amount: </span>
       
            <span className="font-bold">{receiveable}</span>
            
          </div>      <div className="flex justify-between items-center ">
            <span className="total">Total Purchase: </span>
       
            <span className="font-bold">{unclaimedTokens}</span>
            
          </div> 
  


          <button
            className={`buy_btn mb-4 text-center [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]
            }`}
            onClick={loading ? () => {} : handleBuy}
          >
            {loading ? (
              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Buy"
            )}
          </button>
 
          <button
className={`buy_btn mb-4 text-center [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]
  }`}
onClick={loading ? () => {} : handleClaimTokens}
disabled={loading}
>
{ "Claim Tokens"}
</button>

 
        </div>
      </HeroSection>
      {/* About Section */}
   







      <div
          className="px-6 md:pl-36 mt-16 flex flex-col items-center lg:flex-row space-y-6 md:space-y-0 md:space-x-8"
          id="about"
        >
          <div className="sm:w-[50%] ">
          <div className="p-4 bg-gray-900 text-white clip ">
                <h2 className="bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent text-xl md:text-2xl font-extrabold" style={{textAlign:"center"}}>
                NFT Collection
                                  </h2>
                <p className=" text-[.875rem] sm:text-base" style={{textAlign:"center"}}>
                Dive into Charlie's whimsical world with a limited collection of 10,000 NFTs. Rarity levels add a fun dynamic that makes certain NFTs highly coveted by collectors. NFTs will have uses in future games, giving you a head start.

                  <br /><br />
                  <h2 className="bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent text-xl md:text-2xl font-extrabold">
                  NFT Marketplace

                                  </h2>

                                  Trade official Charlie NFTs on our very own NFT Marketplace! NFTs can be traded on all major NFT platforms like OpenSea and Magic Eden.

                  <br /><br />
                  <h2 className="bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent text-xl md:text-2xl font-extrabold">
                  AI Video generator


                                  </h2>

                                  Create your own Charlie video clips with our state of the art AI video generator, specially designed in the style and prompt of Charlie!

                                  
                  <br /> <br /> 
                </p>
              </div>
          </div>
          
          <div className="flex justify-center gap-2 md:gap-4 py-6 ">
          <img src="nft2.png" alt="" className="w-36 md:w-60" />
          <img src="nft.png" alt="" className="absolute w-28 md:w-48" />
          <img src="nft1.png" alt="" className="w-36 md:w-60" />
        </div>
        </div>















        <div className="charlie-section" style={{justifyContent:"center",textAlign:"center"}}>
      {/* Image */}
 

      {/* Text content */}
      <div className="sm:w-[50%] ">

            <h2 className="p-4 bg-gray-900 text-white clip " >
            Charlie AI
            </h2><br/>
            <p className="text-white text-sm md:text-base">
            Engage directly with Charlie himself through our cutting-edge Artificial Intelligence chatbot. Crafted to embody the essence of Charlie, our chatbot delivers a delightful blend of practical assistance and uproarious humor. AI image generator: Unleash the full power of your imagination with our revolutionary image generator, capable of bringing to life anything your mind can conceive.
            </p><br/>    <div className="flex justify-center gap-2 md:gap-4 py-6 ">
          <img src="Pic1.png" alt="" className="w-36 md:w-60" />
 
        </div>
            <h2 className="p-4 bg-gray-900 text-white clip">
            Stake Your Charlie Tokens once the Presale ends!

            </h2><br/>
            <p className="text-white text-sm md:text-base">
              <br></br>
              Unlock the full potential of your Charlie tokens through staking! A simple, effective, and rewarding process! By staking your Charlie tokens, you actively contribute to the growth of the Charlie ecosystem. Stake your ‘CHRLE’ tokens to earn solid APYs in ‘CHRLE’ along with an additional governance token.
            </p>
            <br/>
            <h2 className="p-4 bg-gray-900 text-white clip">
            Charlie P2E

            </h2><br/>
            <p className="text-white text-sm md:text-base">
              <br></br>
              Charlie P2E: Charlie’s P2E Game allows you to earn additional tokens and leverage your official Charlie NFTs to maximize your token yield.
            </p>
            <br/>

            <h2 className="p-4 bg-gray-900 text-white clip">
            Charlie's Animated Series:

            </h2><br/>
            <p className="text-white text-sm md:text-base">
              <br></br>
              Meet Charlie, the face and inspiration of our project and his crew of degenerate unicorn misfits on a mind-bending journey through a universe where unicorns aren't your average fantasy. Led by Charlie, a lovable yet degenerate unicorn set in the year 2101, on a planet known as Consensus-Unicoin-69420DD. Here, intelligence mixes with degeneracy, fueled by enchanted kush and meme chaos.
            </p>
            <br/>

            <h2 className="p-4 bg-gray-900 text-white clip">
            Utility and Partnerships


            </h2><br/>
            <p className="text-white text-sm md:text-base">
              <br></br>
              Exploring partnerships and collaborations with other projects, NFT projects, and influencers. We’re here to bring the entire cryptocurrency community together and we would love to create special NFT collaborations.
            </p>
            <br/>
          </div>

      
     
    </div>







      <div id="roadmap">
        <div className="bg-gradient-to-r from-[rgba(171,130,171,0.2)] via-[rgba(88,133,191,0.2)] to-[rgba(102,125,111,0.2)] text-white border-0 sm:clippath border-[#444444] mt-16 md:mx-20 rounded-lg shadow-md sm:p-8 ">
          {/* Top Centered Image */}
          <div className="flex relative justify-center mb-20">
            <img src="logo.png" alt="Main Image" className="w-40" />
            <h1 className="absolute mt-40 text-white">Tokenomics</h1>
            <p className="absolute mt-44 text-[30px] bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent">
            Token: 100 BILLION 
            </p>
          </div>
          <img
            src="redleft.png"
            alt=""
            className=" hidden sm:block sm:absolute  w-60 -ml-20 mt-96"
          />
          <img
            src="bluerigh.png"
            alt=""
            className="absolute w-64 right-5 mt-[550px] hidden md:block"
          />

          {/* Boxes Container */}
          <div className="flex flex-wrap gap-6 m-6 sm:px-8">
            <div className="md:w-[calc(50%-12px)] w-full flex flex-col gap-6">
              {/* Box 1 */}
              <div className="p-4 bg-gray-900 text-white clip">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Presale : 60%                 </h2>
          
              </div>
              {/* Box 2 */}
              <div className="p-4 bg-gray-900 text-white clip">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Liquidity : 15%
                </h2>
 
              </div>
              {/* Box 3 */}
              <div className="p-4 bg-gray-900 text-white clip">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Reserve: 5%
                </h2>
              
              </div>
              {/* Box 4 */}
           
            </div>

            <div className="md:w-[calc(50%-12px)] w-full flex flex-col gap-6">
              {/* Box 5 */}
              <div className="p-4  bg-gray-900 text-white clip">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Team : 5%  
                </h2>
           
              </div>
              {/* Box 6 */}
              <div className="p-4 bg-gray-900 text-white clip">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Reward (staking,airdrop,giveway) : 15%
                </h2>
          
              </div>
              {/* Box 7 */}
            
              {/* Box 8 */}
             
            </div>
            <div className="relative ">
              <img
                src="redleft.png"
                alt=""
                className="absolute  w-60 -ml-20 mt-96"
              />
            </div>
          </div>

        </div>
      </div>






    
      <div id="roadmap">
        <div className="bg-gradient-to-r from-[rgba(171,130,171,0.2)] via-[rgba(88,133,191,0.2)] to-[rgba(102,125,111,0.2)] text-white border-0 sm:clippath border-[#444444] mt-16 md:mx-20 rounded-lg shadow-md sm:p-8 ">
          {/* Top Centered Image */}
          <div className="flex relative justify-center mb-20">
            <img src="logo.png" alt="Main Image" className="w-40" />
            <h1 className="absolute mt-40 text-white">Charlie The Unicoin</h1>
            <p className="absolute mt-44 text-[30px] bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-transparent">
              Road Map
            </p>
          </div>
          <img
            src="redleft.png"
            alt=""
            className=" hidden sm:block sm:absolute  w-60 -ml-20 mt-96"
          />
          <img
            src="bluerigh.png"
            alt=""
            className="absolute w-64 right-5 mt-[550px] hidden md:block"
          />

          {/* Boxes Container */}
          <div className="flex flex-wrap gap-6 m-6 sm:px-8">
            <div className=" w-full flex flex-col gap-6">
              {/* Box 1 */}
              <div className="p-4 bg-gray-900 text-white clip ">
                <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                Phase 1
                                  </h2>
                <p className=" text-[.875rem] sm:text-base">
               
             
                  <br /> - Create Whitepaper.
                  <br /> - Start development.

                  <br /> - Create landing website.

                  <br /> - Build NFT Minting Website

                  <br /> - Build Token Presale Website.

                  <br /> - Create social media accounts.

                  <br /><br />
                  <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                  Create Token-nomics.

                                  </h2>

                  <br /> - Create token smart contract.

                  <br /> - Undergo a KYC and AUDIT.


                  <br /> - Build the Charlie AI Chatbot.

                  <br /> - Design & craft the official 10K NFT collection.<br /><br />
                  <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
                  Build Minigame


                                  </h2>

                                  <br /> -  Build our NFT marketplace.

                                  <br /> - Design & craft the official 10K NFT collection.
                                  <br /> - Build a P2E application for telegram and App Store.

                                  
                  <br /> <br /> 
                </p>
              </div>
              {/* Box 2 */}
              <div className="p-4  bg-gray-900 text-white clip">
      <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
      Phase 2
        </h2>
      <p className=" text-[.875rem] sm:text-base">
     
   
        <br /> - Build our official Website.

        <br /> - Launch our NFT Collection.

        <br /> - Start Token Presale.

        <br /> - Launch P2E Game on Telegram.

        <br /> - Actively search for partnerships and collaborations.

        <br /> - Start Marketing.

        <br /> -Build Community Engagement.

        <br /> - Write and animate Charlie’s Animation Series.

        <br /> -Charlie Band Music Album on YT.

        <br /> - Develop Cross chain Bridge.

     
      
      </p>
    </div>
              {/* Box 3 */}
              <div className="p-4 bg-gray-900 text-white clip">
      <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
      Phase 3
      </h2>
      <p className=" text-[.875rem] sm:text-base">
     
   
     <br /> -Develop DEX.

     <br /> - Develop staking and farms.

     <br /> - End season one on P2E Game.

     <br /> - Develop NFT games for PC and Mobile devices.

     <br /> - Develop our own blockchain.

     <br /> - Develop launchpad.
     <br /> - start building blockchain.
     <br /> - start building launchpad.

     <br /> - create online store.

     <br /> - Improvements and upgrades to our Artificial intelligence.
  
     <br /> <br /> 
   </p>
    </div>


              {/* Box 4 */}
              <div className="p-4 bg-gray-900 text-white clip">
      <h2 className="text-[1.125rem] sm:text-xl font-bold mb-2 bg-gradient-to-r from-custom-1 via-custom-2 to-custom-4 bg-clip-text text-white">
      Phase 4
      </h2>
      <p className=" text-[.875rem] sm:text-base">
     
   
     <br /> -Develop Charlie’s Dating Application.
     <br /> -Start Season two on the P2E Game.

     <br /> - Develop Charlie Wallet.


   </p>
    </div> 
              

            </div>




            <div className="relative ">
              <img
                src="redleft.png"
                alt=""
                className="absolute  w-60 -ml-20 mt-96"
              />
            </div>
          </div>

        </div>
      </div>
      <div>
<br/>


<div className="faq-section ">
      <h2 className="faq-title ">PRESALE PHASES</h2>
      <div className="faq-list border-0 [clip-path:polygon(0%_0.9em,_0.9em_0%,_100%_0%,_100%_calc(100%_-_0.9em),_calc(100%_-_0.9em)_100%,_0_100%)]">
        {PHASES.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-toggle">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
      <h1 style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent:"center" ,color:"white" ,fontSize:"40px"}}>TEAM</h1>
      {/* Members Section */}
      <div className="members-container" >
    
    {members.map((member, index) => (
      <div key={index} className="member-card"  style={{ 
        backgroundImage: `url(${member.background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        padding: '20px', // Add padding if needed
        borderRadius: '10px', // Optional styling
        color: 'white' // Change text color for visibility
      }}>
        <img src={member.photo} alt={member.name} className="member-photo" />
        <h3 className="member-name" style={{ display: 'flex', alignItems: 'center' }}>
        {member.name} 
        {member.flag && ( // Conditionally render the flag
          <img src={member.flag} alt={`${member.name}'s country flag`} style={{ width: '24px', height: '24px', marginLeft: '10px' }} />
        )}
      </h3>
        <p className="member-role">{member.role}</p>
        <p className="member-bio">{member.bio}</p>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-button">
        <img src={linkedinLogo} alt="LinkedIn Profile" style={{ width: '34px', height: '34px' }} />
        
      </a>
      
      </div>
    ))}
  </div>
    </div>
    </div>
    <div className="footer  mr-0 ml-0 sm:mr-[5rem] sm:ml-[5rem] mb-4 [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]">
      <div className="footer-icons">
        <a
          href="https://t.me/+oNLtgu5xw51kMzRh"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./telegram.png" alt="" className="icon" />
        </a>
        <a
          href="https://www.youtube.com/@CharlieUnicoin"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./youtube.png" alt="" className="icon" />
        </a>
        <a
          href="https://x.com/Charlie_Unicoin"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./twitter.png" alt="" className="icon" />
        </a>
        <a
            href="https://discord.com/invite/charlietheunicoin"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./discord1.png" alt="" className="icon" />
          </a>
      </div>
      <a href="#home">
        <button className="footer-button [clip-path:polygon(0%_1em,_1em_0%,_100%_0%,_100%_calc(100%_-_1em),_calc(100%_-_1em)_100%,_0_100%)]">
          Buy CHARLIE
        </button>
      </a>
    </div>
  </>
);
};

export default MainPage;
