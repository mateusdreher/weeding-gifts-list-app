import React, { useEffect, useState } from 'react';
import { Button, Modal, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listGifts, listGiftsByStatus, selectGift, getIpInfo } from '../gifts.service'
import ModalSuccess from '../components/ModalSucces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#273649",
    borderRadius: "10px",
    marginBottom: "1rem",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  imgContainer: {
    width: "100%",
    height: "200px",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#eda787",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  price: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#e37846",
    textAlign: "center",
  },
 qtd: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#eda787",
    textAlign: "center",
    marginBottom: "1rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    width: "100%",
    marginTop: "auto",
    marginBottom: "15px", // Adicionar margem abaixo dos botões
  },
  linkBtn: {
    backgroundColor: "#eda787",
    color: "#fff",
    borderRadius: "10px",
    padding: "0.3rem 1rem",
    textTransform: "none",
    fontSize: "0.8rem",
    width: "45%", // Definir largura fixa para os botões
    minHeight: "2.5rem", // Definir altura mínima para os botões
  },
  boughtBtn: {
    backgroundColor: "#273649",
    color: "#eda787",
    borderRadius: "10px",
    padding: "0.3rem 1rem",
    border: "1px solid #eda787",
    textTransform: "none",
    fontSize: "0.8rem",
    width: "45%", // Definir largura fixa para os botões
    minHeight: "2.5rem", // Definir altura mínima para os botões

  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: "5rem",
  },
  logoContainer: {
    display: "grid", 
    gridTemplateColumns: "repeat(2)", 
    alignItems: "center", 
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      paddingTop: "0",
      height: "200px"
    }
  },
  descriptionDiv: {
    color: "#fff",
    fontSize: "1.4rem",
    marginBottom: "2rem",
    width: "50%",
    paddingLeft: "25%",
    textAlign: "justify",
    lineHeight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "1%",
    },
  },
  title: {
    color: "#eda787",
    fontFamily: "DynaPuff",
    fontSize: "2.8rem",
    position: "absolute",
    top: "3rem",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "1rem",
      marginLeft: "-1rem",
    }
  },
  subtitle: {
    color: "#eda787",
    fontFamily: "DynaPuff",
    fontSize: "1.2rem",
    marginLeft: "0.5rem",
    position: "absolute",
    top: "8rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-1rem",
      top: "6rem",
    }
  },
  flowerDiv: {
    width: "520px",
    height: "194px",
    opacity: "0.5",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50%",
      marginTop: "-12rem",
      display: "none"
    },
  },
  flowerImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "2rem",
    width: "80%",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  }
}));

const List = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [presentsList, setPresentsList] = useState([]);
  const [selectedGift, setSelectedGift] = useState({ id: '', name: '', link: '', image: '' }); // Adicionado image ao estado
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
    setInputValue("");
    setLoading(false);
    listGiftsByStatus('AVAILABLE')
      .then(response => {
        setLoadingMain(false);
        if (response?.length) {
          setPresentsList(response);
          setHasGiftsAvailable(true);
        } else {
          setPresentsList([]);
          setHasGiftsAvailable(false);
        }
      })
      .catch((err) => {
        setLoadingMain(false);
        setPresentsList([]);
      });
  };

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
    });
  };

  const handleOpenModal = (id, name, link, image, byLink = false, expectedQuantity, boughtQuantity) => { // Adicionado image como parâmetro
    setSelectedGift({ id, name, link, image, expectedQuantity, boughtQuantity });
    setByLink(byLink);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOpenGift = () => {
    console.log(selectedGift)
    window.open(selectedGift.link)
  }

  return (
    <div style={{ padding: "2rem 1rem" }}>
       <div className={classes.logoContainer}>
        <div className={classes.flowerDiv}>
          <img style={{opacity: "0.5"}} className={classes.flowerImg} src='assets/flower.png' alt=""></img>
        </div>
        <div className={classes.justifyCenter} style={{zIndex: "99", marginTop: "-10rem",marginLeft: "1rem"}}>
          <p className={classes.title}>Presenteie Me </p>
          <p className={classes.subtitle}>Mateus e Patricia</p>
        </div>
      </div>

      <div className={classes.descriptionDiv}>
        <p>Querido convidado, aqui consta nossa lista de presentes que só é possível existir graças à sua presença. Sinta-se à vontade para escolher algum desses itens abaixo e comprá-lo pelo site ou pela loja de sua preferência. Em pouco tempo estaremos nos mudando para nossa casa nova e seu presente será de muita valia.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loadingMain && <CircularProgress size={60} style={{ color: '#eda787' }} />}
      </div>

      {!loadingMain && (
        <div className={classes.gridContainer}>
          {presentsList.map((present) => (
            <div key={present.id} className={classes.root}  onClick={() => handleOpenModal(present.id, present.name, present.link, present.image, present.expectedQuantity, present.boughtQuantity)}>
              <div className={classes.imgContainer}>
                <img className={classes.img} src={present.image} alt="" />
              </div>
              <div>
                <div className={classes.name}  onClick={() => handleOpenModal(present.id, present.name, present.link, present.image, present.expectedQuantity, present.boughtQuantity)}>{present.name}</div>
                <div className={classes.price}>{present.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>  
                <div className={classes.qtd}><b>{present.boughtQuantity}/{present.expectedQuantity}</b></div>
              </div>
              <div className={classes.buttonGroup}>
                <Button
                  className={classes.linkBtn}
                  variant="contained"
                  onClick={() => { handleOpenModal(present.id, present.name, present.link, present.image, true) }}
                >
                  Comprar no site
                </Button>
                <Button className={classes.boughtBtn} variant="contained" onClick={() => handleOpenModal(present.id, present.name, present.link, present.image, present.expectedQuantity, present.boughtQuantity)}>
                  Comprar por fora
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

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
          {selectedGift.image && ( // Verifica se há uma imagem selecionada
            <div className={classes.imgContainer} style={{marginTop: "1.5rem"}}>
              <img className={classes.img} src={selectedGift.image} alt="" />
            </div>
          )}
          <div>
            <h4 style={{ color: "#fff" }}>Você escolheu comprar o presente <span style={{ margin: "0.6rem 0 -0.5rem 0", color: "#eda787", fontStyle: "italic", fontWeight: "bold" }}>{selectedGift.name}</span> {!byLink ? 'por fora, ' : 'pelo site, '} se estiver correto: </h4>
          </div>
          <div
            style={{
              width: "90%",
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
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              Digite seu nome:
            </label>
          </div>

          <div
            style={{
              width: "90%",
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
                height: "15px",
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
              {loading
                ? <CircularProgress size={24} style={{ color: '#FFFFFF' }} />
                : byLink ? "Ir para o site" : "Comprar"
              }
            </Button>
          </div>
          <div style={{color: '#eda787', cursor: 'pointer'}} onClick={handleOpenGift}>
            <i>Acessar o produto sem comprar</i>
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
