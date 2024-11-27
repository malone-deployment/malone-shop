import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, useListItem } from "./store-localStorage/Store";

export function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const localData = localStorage.getItem("key");
  const finalData = JSON.parse(localData || "{}");

  const addItem = useListItem((state) => state.addItem);
  const counter = useListItem((state) => state.counter);

  function addClickedMe(e: Product) {
    addItem(e);
  }

  useEffect(() => {
    const url =
      "https://script.google.com/macros/s/AKfycbx9VQRAfoN_71JPl77jynNfYpnzKSQQKZs8-LNWg-9BlexMG1Oq9oZStm9PtE40DTE0/exec";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  });

  function clickMe() {
    navigate("/AddtoCart");
  }

  function logout() {
    localStorage.setItem("key", "");
    navigate("/");
  }

  return (
    <>
      <h3>
        total cart:{" "}
        <a onClick={clickMe} className="waves-effect  orange waves-light btn">
          {counter}
        </a>{" "}
      </h3>
      <h1>Hello again {finalData.firstName}</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {data.map((post: Product) => (
          <div
            key={post.id}
            style={{
              flex: "0 0 30%",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          >
            <p>
              <b>title</b>:{post.title}
            </p>
            <p>
              <b>category</b>:{post.category}
            </p>
            <p>
              <b>description</b>:{post.description}
            </p>
            <p>
              <b>ratingRate</b>:{post.ratingRate}
            </p>
            <p>
              <b>ratingCount</b>:{post.ratingCount}
            </p>
            <p>
              <b>price</b>:{post.price}
            </p>
            <p>
              <b>item available </b>: {post.itemAvailable} pcs
            </p>
            <p>
              <b>description</b>:{post.description}
            </p>
            <img width={100} height={100} src={post.image} />
            <br />
            <button
              onClick={() => addClickedMe(post)}
              className="waves-effect  waves-light btn"
            >
              add to cart
            </button>

            <button
              onClick={logout}
              className="fixed-action-btn horizontalbtn-floating btn-large red "
            >
              Logout
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
