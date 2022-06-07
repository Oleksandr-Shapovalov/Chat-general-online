import React, { useContext, useState } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Loader from "./Loader";

export default function Chat() {
  const { auth, firestore, firebase } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  const sendMessage = async () => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 70, marginTop: 20 }}
        justifyContent="center"
      >
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: 10,
                border:
                  user.uid === msg.uid ? "2px solid green" : "2px dashed red",
                marginLeft: user.uid === msg.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={msg.photoURL} />
                <div>{msg.displayName}</div>
              </Grid>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{
            width: "80%",
          }}
        >
          <TextField
            maxRows={2}
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            onClick={sendMessage}
            style={{ marginTop: 5 }}
            variant="outlined"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
