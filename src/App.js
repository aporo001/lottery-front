import "./App.css";
import { Button, Container, Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import React, { useState } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
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
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={"large"}
            className={classes.buyButton}
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
        rpcUrl: "https://matic-mumbai.chainstacklabs.com",
        chainId: [80001],
      },
    }}
  >
    <App />
  </UseWalletProvider>
);
export default AppWrapper;
