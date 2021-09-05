import "./App.css";
import { Button, Container, Box, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import cw from "./utils/connect-wallet";
import React, { useState } from "react";
const useStyles = makeStyles((theme) =>
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
  const [currentAddress, setCurrentAddress] = useState("");
  const [numberTicket, setNumberTicket] = useState(0);

  const login = async () => {
    const addr = await cw.login();
    setCurrentAddress(addr);
  };

  return (
    <Container>
      <Box className={classes.userBox}>
        {currentAddress ? (
          `wallet: ${currentAddress}`
        ) : (
          <Button variant="contained" onClick={login}>
            login
          </Button>
        )}
      </Box>
      {currentAddress && (
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

export default App;
