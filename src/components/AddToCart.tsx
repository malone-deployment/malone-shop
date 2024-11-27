import { Product, useListItem } from "./store-localStorage/Store";
import { useNavigate } from "react-router-dom";

export function AddtoCart() {
  const navigate = useNavigate();
  const listItem = useListItem((state) => state.listItem);
  const addItem = useListItem((state) => state.addItem);
  const removeItem = useListItem((state) => state.removeItem);

  function addClickedMe(item: Product) {
    addItem(item);
  }

  function removeClickedMe(item: Product) {
    removeItem(item);
  }

  function placeOrder() {
    navigate("/CheckOut");
  }

  function logout() {
    localStorage.setItem("key", "");
    navigate("/");
  }

  return (
    <>
      <h5>Malone Cart</h5>
      {listItem.map((item) => (
        <div
          key={item.id}
          style={{
            flex: "0 0 30%",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <p>{item.title}</p>
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
        </div>
      ))}

      <button
        onClick={placeOrder}
        className="waves-effect  materialize-green amber.darken-1 waves-light btn"
      >
        place order
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
