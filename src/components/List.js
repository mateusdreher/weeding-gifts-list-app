import React, { useEffect, useState } from 'react';
import { Button, Modal, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listGifts, listGiftsByStatus, selectGift, getIpInfo } from '../gifts.service'
import ModalSuccess from '../components/ModalSucces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#273649",
    borderRadius: "10px",
    marginBottom: "1rem",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  imgContainer: {
    width: "100px",
    height: "80px",
    borderRadius: "10px",
    overflow: "hidden",
    marginRight: "1rem",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#eda787",
  },
  price: {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#eda787",
  },
  linkBtn: {
    backgroundColor: "#eda787",
    color: "#fff",
    borderRadius: "10px",
    padding: "0.3rem 1rem",
    marginRight: "0.5rem",
    textTransform: "none",
    fontSize: "0.8rem",
  },
  boughtBtn: {
    backgroundColor: "#273649",
    color: "#eda787",
    borderRadius: "10px",
    padding: "0.3rem 1rem",
    border: "1px solid #eda787",
    textTransform: "none",
    fontSize: "0.8rem",
  },
  buttonGroup: {
    display: "flex",
    fontStyle: "bold"
  },
  title: {
    color: "#eda787",
    fontFamily: "DynaPuff",
    fontSize: "2.5rem"
  },
  subtitle: {
    color: "#eda787",
    fontFamily: "DynaPuff",
    fontSize: "0.9rem",
    marginLeft: "0.5rem",
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: "5rem",
  },
  gridContainer: {
    width: "80%",
    paddingLeft: "10%",
    display: "grid",
    gridGap: "2rem",
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  descriptionDiv: {
    color: "#fff",
    fontSize: "1.4rem",
    marginBottom: "2rem",
    width: "50%",
    paddingLeft: "25%",
    textAlign: "justify",
    lineHeight: "1.5rem",
  },
  flowerDiv: {
    width: "520px",
    height: "194px",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  // flowerContainer: {
  //   width: "520px",
  //   height: "194px",
  // },
  flowerImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  }
}));


const List = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [presentsList, setPresentsList] = useState([]);
  const [selectedGift, setSelectedGift] = useState({id: '', name: '', link: ''});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [hasGiftsAvailable, setHasGiftsAvailable] = useState(true);
  const [ipInfo, setIpInfo] = useState({});
  const [byLink, setByLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);

  useEffect(() => {
    setLoadingMain(true);
    getIpInfo().then(response => {
      setIpInfo(response);
    });
    listGiftsInitial();
  }, []);

  const listGiftsInitial = () => {
    listGiftsByStatus('AVAILABLE')
      .then(response => {
        setLoadingMain(false);
        if (response?.length) {
          setPresentsList(response);
          setHasGiftsAvailable(true)
        } else {
          setPresentsList([]);
          setHasGiftsAvailable(false)
        }
      })
      .catch((err) => {
        setLoadingMain(false);
        setPresentsList([]);
      })
  }
    
  const handleSelectPresent = () => {
    setLoading(true);
    selectGift(selectedGift.id, inputValue, byLink, ipInfo).then(response => {
      setOpenModal(false);
      if (!byLink) {
        setOpenSuccessModal(true);
        return;
      }

      window.open(selectedGift.link, '_blank');
      listGiftsInitial();
    })
  };
  
  const handleOpenModal = (id, name, link, byLink = false) => {
    setSelectedGift({id, name, link});
    setByLink(byLink);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  return (
    <div style={{ padding: "2rem 1rem" }}>
      
      <div style={{display: "grid", gridTemplateColumns: "repeat(2)", alignItems: "center", justifyContent: "center"}}>
      <div className={classes.flowerDiv}>
          <img style={{opacity: "0.5"}} className={classes.flowerImg} src='assets/flower.png' alt=""></img>
        </div>
        <div className={classes.justifyCenter} style={{zIndex: "99", marginTop: "-10rem", marginLeft: "1rem"}}>
          <p className={classes.title}>Presenteie Me </p>
          <p className={classes.subtitle}>Mateus e Patricia</p>
        </div>
        
      </div>
      
      
      <div className={classes.descriptionDiv} >
      <p style={{color: "#fff"}}>Querido convidado aqui consta nossa lista de presentes que só é possível de existir graças a sua presença, sinta-se a vontade de escolher algum desses itens abaixo e compra-lo pelo site ou pela loja de sua preferência. Em pouco tempo estaremos nos mudando para nossa casa nova e seu presente será de muita valia.</p>
        
      </div>

      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {
          loadingMain && <CircularProgress size={60} style={{ color: '#eda787' }} />
          
        }
      </div>
      {
        !loadingMain && 
        <div className={classes.gridContainer}>
        {presentsList.map((present) => (
          <div key={present.id} className={classes.root}>
            <div className={classes.imgContainer}>
              <img className={classes.img} src={present.image} alt="" />
            </div>
            <div>
              <div className={classes.name}>{present.name}</div>
              <div className={classes.price}>R$ {present.price}</div>
              <div className={classes.buttonGroup}>
                <Button
                  className={classes.linkBtn}
                  variant="contained"
                  onClick={() => {handleOpenModal(present.id, present.name, present.link, true)}}
                >
                  Comprar no site
                </Button>
                <Button className={classes.boughtBtn} variant="contained" onClick={() => handleOpenModal(present.id, present.name, present.link)}>
                  Comprar presencialmente
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      }

      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        BackdropProps={{ style: { backdropFilter: "blur(5px)" } }}
      >
        <div
          className={classes.root}
          style={{
            backgroundColor: "#273649",
            width: "500px",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
            onClick={handleCloseModal}
          >
            x
          </div>
          <div>
            <h4 style={{color: "#fff"}}>Você escolheu comprar o presente <span style={{margin: "0.6rem 0 -0.5rem 0", color: "#eda787", fontStyle: "italic", fontWeight: "bold"}}>{selectedGift.name}</span>, se estiver correto: </h4>
          </div>
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <label
              htmlFor="name-input"
              style={{
                fontSize: "1rem",
                color: "#eda787",
                marginBottom: "0.2rem",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              Digite seu nome:
            </label>
          </div>
          
          <div
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              justifyContent: "flex-start"
            }}
          >
            <input
              id="name-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "none",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                marginTop: "0.5rem",
              }}
            />
            <Button
              className={classes.linkBtn}
              variant="contained"
              onClick={() => handleSelectPresent()}
              style={{ marginLeft: "1rem", minWidth: "70px" }}
            >
              {
                loading 
                  ? <CircularProgress size={24} style={{ color: '#FFFFFF' }} /> 
                  : byLink ? "Ir para o site" : "Comprar presencialmente"
              }
              
            </Button>
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#eda787",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
          </div>
        </div>
      </Modal>

      <ModalSuccess selectedGift={selectedGift.name} open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}></ModalSuccess>
    </div>

  );
  

};

export default List;
