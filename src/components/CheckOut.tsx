import { Product, useListItem } from "./store-localStorage/Store";
import { Purchase, UserPurchase } from "../model/user-purchase-model";
import { useNavigate } from "react-router-dom";

export function CheckOut() {
  const navigate = useNavigate();
  const localData = localStorage.getItem("key");
  const finalData = JSON.parse(localData || "{}");

  const { listItem, counter, addItem, removeItem } = useListItem(
    (state) => state
  );

  const totalPrice = listItem.reduce((acc, item) => acc + item.price, 0);

  function addClickedMe(item: Product) {
    addItem(item);
  }

  function removeClickedMe(item: Product) {
    removeItem(item);
  }

  let purchaseList: Purchase[] = [];

  listItem.map((item) =>
    purchaseList.push({ id: item.id, itemCounter: item.itemCounter })
  );

  async function checkout() {
    alert("processing");
    const data: UserPurchase = {
      determineStats: "purchase",
      userId: finalData.id,
      name: finalData.firstName,
      totalPrice: totalPrice,
      purchases: purchaseList,
    };

    const url =
      "https://script.google.com/macros/s/AKfycbx9VQRAfoN_71JPl77jynNfYpnzKSQQKZs8-LNWg-9BlexMG1Oq9oZStm9PtE40DTE0/exec";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });

    const result = await response.json();
    console.log(result.status);
    navigate("/Print");
  }

  function logout() {
    localStorage.setItem("key", "");
    navigate("/");
  }

  return (
    <>
      <h2>Hello {finalData.firstName}</h2>
      <br />
      <br />
      {listItem.map((item) => (
        <div
          key={item.id}
          style={{
            flex: "0 0 30%",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <h4>{item.title}</h4>
          <p>Price: {item.price.toFixed(2)}</p>
          <img width={100} height={100} src={item.image} />
          <br />
          <button
            onClick={() => addClickedMe(item)}
            className="waves-effect blue  waves-light btn"
          >
            +{" "}
          </button>
          <p className="waves-effect grey   waves-light btn">
            {item.itemCounter}
          </p>
          <button
            onClick={() => removeClickedMe(item)}
            className="waves-effect  materialize-red amber.darken-1 waves-light btn"
          >
            -
          </button>
          <br />
          <br />
        </div>
      ))}
      <h5>Total Item: {counter} </h5>{" "}
      <h5>Total Price: {totalPrice.toFixed(2)}</h5>
      <button
        onClick={checkout}
        className="waves-effect green  waves-light btn"
      >
        Checkout
      </button>
      <button
        onClick={logout}
        className="fixed-action-btn horizontalbtn-floating btn-large red "
      >
        Logout
      </button>
    </>
  );
}
