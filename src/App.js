import "./App.css";
import { Button, Container, Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import React, { useState, useEffect } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import { ethers } from "ethers";
import { getBalance, deposit, withdrawal } from "./utils/connect-wallet";

const useStyles = makeStyles(() =>
  createStyles({
    userBox: {
      width: "100%",
      textAlign: "center",
      marginTop: "30px",
      "&>button": {
        margin: "5px",
      },
    },
    buyBox: {
      width: "100%",
      textAlign: "center",
      marginTop: "30px",
    },
    buyButton: {
      margin: "30px",
    },
  })
);

const App = () => {
  const classes = useStyles();
  const [depositBalance, setDepositBalance] = useState(0);
  const wallet = useWallet();
  const provider =
    wallet.status === "connected"
      ? new ethers.providers.Web3Provider(wallet.ethereum)
      : null;

  const getBal = async () => {
    const balance = await getBalance(wallet.account, provider);
    setDepositBalance(balance);
  };
  useEffect(() => {
    if (wallet.status === "connected") {
      getBal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.status]);

  const depositFn = async () => {
    await deposit(100, provider);
    getBal();
  };

  const withdrawalFn = async () => {
    await withdrawal(100, provider);
    getBal();
  };

  return (
    <Container>
      <Box className={classes.userBox}>
        {wallet.status === "connected" ? (
          <Box>
            wallet: {wallet.account}
            <br />
            <Button variant="contained" onClick={() => wallet.reset()}>
              logout
            </Button>
          </Box>
        ) : (
          <>
            <Button variant="contained" onClick={() => wallet.connect()}>
              login
            </Button>
          </>
        )}
      </Box>
      {wallet.status === "connected" && (
        <Box className={classes.buyBox}>
          <Typography>Deposit balance: {depositBalance}</Typography>
          <Button
            variant="contained"
            color="primary"
            size={"large"}
            className={classes.buyButton}
            onClick={depositFn}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={"large"}
            className={classes.buyButton}
            onClick={withdrawalFn}
          >
            Withdrawal
          </Button>
        </Box>
      )}
    </Container>
  );
};

const AppWrapper = () => (
  <UseWalletProvider
    connectors={{
      injected: {
        rpcUrl: "https://ropsten.infura.io/v3/3a78ce77beba4f70bd3f26d907becd2b",
        chainId: [3],
      },
    }}
  >
    <App />
  </UseWalletProvider>
);
export default AppWrapper;
