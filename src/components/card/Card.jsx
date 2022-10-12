import React, { useEffect, useState } from "react";
import StatsModal from "../StatsModal/StatsModal";
import "./Card.css";

const Card = ({ name, id, url_info, text_for_search }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [dataForFrontStats, setdataForFrontStats] = useState({
    pokiTypes1: "",
    pokiTypes2: "",
    height: "",
    weight: "",
  });

  let strArr = url_info.split("/");
  strArr[6] = id;
  url_info = strArr.join("/");
  var newUrl = url_info;

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(newUrl);
      let data = await res.json();
      setdataForFrontStats({
        ...dataForFrontStats,
        pokiTypes1: data.types[0].type.name,
        pokiTypes2: data.types.length > 1 ? data.types[1].type.name : "",
        height: data.height,
        weight: data.weight,
      });
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  let card_bg_color_img = "";

  let pokemonImg = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className="container cards_in_app mb-4">
      <div className="row">
        <div className="col-lg-12 text-center card_img">
          <div className="pokemon_title">
            <p>{name}</p>
            <p>#{id}</p>
          </div>
          <img src={pokemonImg} alt="poki" width="120px" height="120px" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 pokemon_desc pt-3 pb-3">
          <ul className="list">
            <li>
              <ul className="sublist">
                <li>type</li>
                <li>
                  {dataForFrontStats.pokiTypes2 === ""
                    ? `${dataForFrontStats.pokiTypes1}`
                    : `${dataForFrontStats.pokiTypes1} / ${dataForFrontStats.pokiTypes2}`}
                </li>
              </ul>
            </li>
            <li>
              <ul className="sublist">
                <li>weight</li>
                <li>{dataForFrontStats.weight}</li>
              </ul>
            </li>
            <li>
              <ul className="sublist">
                <li>height</li>
                <li>{dataForFrontStats.height}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-3 info_btn text-center">
          <button className="btn" onClick={() => setModalShow(true)}>
            Open Modal
          </button>
          <StatsModal
            card_bg_color_img={card_bg_color_img}
            pokemonImg={pokemonImg}
            show={modalShow}
            url_info={newUrl}
            text_for_search={text_for_search}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
