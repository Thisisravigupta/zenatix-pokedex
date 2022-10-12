import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../card/Card";

function Main() {
  const [pokemon_data, setPokemon_data] = useState([]);
  const [offset, setOffset] = useState(0);
  const [text_for_search, setText_for_search] = useState("");
  const [pokiType, setpokiType] = useState([]);
  const [showByType, setShowByType] = useState([]);

  let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
  let url_for_type = `https://pokeapi.co/api/v2/type`;

  useEffect(() => {
    const apiCall = async () => {
      let resp = await fetch(url);
      let data = await resp.json();
      setPokemon_data(data.results);
    };
    apiCall();
  }, [offset, url]);

  useEffect(() => {
    const apiCallForType = async () => {
      let resp = await fetch(url_for_type);
      let data = await resp.json();
      setpokiType(data.results);
    };
    apiCallForType();
  }, [url_for_type]);

  const typeHandler = (e) => {
    async function apiCallForSortByType() {
      let resp = await fetch(
        `https://pokeapi.co/api/v2/type/${e.target.value}/`
      );
      let data = await resp.json();
      // console.log(data.pokemon);
      setShowByType(data.pokemon);
    }
    apiCallForSortByType();
  };

  const searchHandle = (e) => {
    setText_for_search(e.target.value);
  };
  // console.log(pokemon_data);

  return (
    <div className="Main pb-5">
      <Container className="pt-5 pl-5 pr-5 main_wrapper" fluid>
        <Row>
          <Col className="col-lg-6 text-center">
            <div className="search_bar">
              <input
                type="text"
                name=""
                id="search_text"
                className="form-control"
                placeholder="search by name"
                value={text_for_search}
                onChange={searchHandle}
                style={{borderRadius:"10px"}}
              />
            </div>
          </Col>
          <Col></Col>
          <Col className="col-lg-4 text-end">
            <div className="type">
              <select
                name=""
                id=""
                className="form-control"
                defaultValue=""
                onChange={typeHandler}
                style={{borderRadius:"10px"}}
              >
                <option value="" disabled>
                  Selected
                </option>
                {pokiType.map((val, index) => {
                  return (
                    <option value={`${index + 1}`} key={index}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </Col>
        </Row>

        <Container className="pl-5 pr-5" fluid>
          <Row className="card-row mt-5 pt-5">
            {showByType.length !== 0
              ? showByType
                  .filter((val, index) => {
                    if (text_for_search === "") {
                      return val.pokemon;
                    }
                    return val.pokemon.name
                      .toLowerCase()
                      .includes(text_for_search.toLowerCase());
                  })
                  .map((val, index) => {
                    let idArr = val.pokemon.url.split("/");
                    let newId = idArr[6];

                    return (
                      <Col key={index} className="col-lg-3 ">
                        <Card
                          name={val.pokemon.name}
                          id={newId}
                          url_info={val.pokemon.url}
                          text_for_search={text_for_search}
                        />
                      </Col>
                    );
                  })
              : pokemon_data
                  .filter((val, index) => {
                    if (text_for_search === "") {
                      return val;
                    }
                    return val.name
                      .toLowerCase()
                      .includes(text_for_search.toLowerCase());
                  })
                  .map((val, index) => {
                    let idArr = val.url.split("/");
                    let newId = idArr[6];

                    return (
                      <Col key={index} className="col-lg-3">
                        <Card
                          name={val.name}
                          id={newId}
                          url_info={val.url}
                          text_for_search={text_for_search}
                        />
                      </Col>
                    );
                  })}
          </Row>
        </Container>
        <Row className="mt-5 pagination_btn">
          <Col className="col-lg-6 text-start">
            <button
              className="btn prev btn-primary"
              onClick={() => {
                if (offset === 0) {
                  return;
                } else {
                  setOffset(offset - 20);
                }
              }}
            >
              Prev
            </button>
          </Col>

          <Col className="col-lg-6 text-end">
            <button
              className=" btn next btn-primary"
              onClick={() => {
                setOffset(offset + 20);
              }}
            >
              Next
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
