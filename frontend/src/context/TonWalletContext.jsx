import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import {getCurrentTonPrice} from "../lib/api";
import axios from "axios";

const initialTonWalletContextValues = {
    isTonWalletConnected: false,
    friendlyAddress: null,
    rAddress: null,
    tonBalance: 0,
    tonPrice: null,
};

const TonWalletContext = createContext(initialTonWalletContextValues);

export const useCustomTonWallet = () => {
    const context = useContext(TonWalletContext);
    if (!context) {
        throw new Error("useCustomTonWallet must be used within TonWalletProvider");
    }
    return context;
};

export const TonWalletProvider = ({ children }) => {
    const [isTonWalletConnected, setIsTonWalletConnected] = useState(false);
    const [friendlyAddress, setFriendlyAddress] = useState(null);
    const [rAddress, setRAddress] = useState(null);
    const [tonBalance, setTonBalance] = useState(0);
    const [tonPrice, setTonPrice] = useState(null);
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const [tonConnectUI] = useTonConnectUI();
    // const tonweb = new TonWeb(new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC"));
    const tonweb = new TonWeb(new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC"));

    useEffect(() => {
        // Update connection state and addresses
        setIsTonWalletConnected(tonConnectUI.connected);
        if (tonConnectUI.connected) {
            setFriendlyAddress(userFriendlyAddress);
            setRAddress(rawAddress);
        } else {
            setFriendlyAddress(null);
            setRAddress(null);
            setTonBalance(0); // Clear balance when disconnected
        }
    }, [tonConnectUI.connected, userFriendlyAddress, rawAddress]);

    useEffect(() => {
        // Fetch balance when connected
        const fetchBalance = async (walletAddress) => {
            try {
                debugger;
                const result = await tonweb.getBalance(walletAddress);
                const balanceTon = TonWeb.utils.fromNano(result);
                setTonBalance(balanceTon);
            } catch (err) {
                console.error("Error fetching balance:", err);
            }
        };

        const fetchCurrentTonPrice = async () => {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
                    headers: {
                      Accepts: "application/json",
                      "x-cg-pro-api-key": "CG-jjQ57hsMhghiDtKTrhDxbTfx",
                    },
                    params: {
                      x_cg_pro_api_key: "CG-jjQ57hsMhghiDtKTrhDxbTfx",
                      ids: "the-open-network",
                      vs_currencies: "usd",
                    },
                });
                const i = 0;
                // const response = await getCurrentTonPrice();
                // if(response.ok) {
        
                // }
            } catch(err) {
                console.log("fetch current ton price: ", err);
            }
        }

        if (tonConnectUI.connected && friendlyAddress) {
            fetchBalance(friendlyAddress);
            fetchCurrentTonPrice();                
        }
    }, [tonConnectUI.connected, friendlyAddress]);

    useCallback(async () => {
       
    }, [tonConnectUI.connected]);

    return (
        <TonWalletContext.Provider
            value={{
                isTonWalletConnected,
                friendlyAddress,
                rAddress,
                tonBalance,
                tonPrice
            }}
        >
            {children}
        </TonWalletContext.Provider>
    );
};
