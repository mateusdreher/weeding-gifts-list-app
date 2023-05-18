import React from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#273649",
    width: "500px",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ModalSuccess = ({selectedGift, open, onClose}) => {
	const classes = useStyles();

	return (
    <Modal
    open={open}
    onClose={onClose}
    style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    }}
    BackdropProps={{ style: { backdropFilter: "blur(5px)" } }}
  >
    <div className={classes.root}>
    <div
      style={{
      position: "absolute",
      top: "1rem",
      right: "1rem",
      cursor: "pointer",
      color: "#eda787",
      fontSize: "1.2rem",
      fontWeight: "bold",
      }}
      onClick={onClose}
    >
      x
    </div>
    <p
      style={{
      fontSize: "1.2rem",
      color: "#fff",
      textAlign: "center",
      }}
    >
      <span style={{fontSize: "1.7rem"}}>Parabéns!</span><br/><br/>  
      
      Você escolheu comprar o presente <br/> <div style={{margin: "0.6rem 0 -0.5rem 0",fontSize: "1.5rem", color: "#eda787", fontStyle: "italic", fontWeight: "bold"}}>{selectedGift}</div><br/> pessoalmente.<br/><br/> O
      casal será avisado. Eles agradecem imensamente o seu carinho.
    </p>
    </div>
  </Modal>
	);
}

export default ModalSuccess;