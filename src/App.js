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
    },
    buyBox: {
      width: "100%",
      textAlign: "center",
      marginTop: "30px",
    },
    buyButton: {
      marginTop: "30px",
    },
  })
);

const App = () => {
  const classes = useStyles();
  const [numberTicket, setNumberTicket] = useState(0);
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
          <Button variant="contained" onClick={() => wallet.connect()}>
            login
          </Button>
        )}
      </Box>
      {wallet.status === "connected" && (
        <Box className={classes.buyBox}>
          <Typography>
            Number of my ticket in this round: {numberTicket}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size={"large"}
            className={classes.buyButton}
          >
            BUY
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
      walletconnect: {
        chainId: [80001],
        rpcUrl: "https://matic-mumbai.chainstacklabs.com",
      },
    }}
  >
    <App />
  </UseWalletProvider>
);
export default AppWrapper;
