import { useListItem } from "./store-localStorage/Store";
import { Purchase } from "../model/user-purchase-model";
import { useNavigate } from "react-router-dom";

export function Print() {
  const navigate = useNavigate();

  const { listItem, counter, resetAll } = useListItem((state) => state);

  const totalPrice = listItem.reduce((acc, item) => acc + item.price, 0);

  let purchaseList: Purchase[] = [];

  listItem.map((item) =>
    purchaseList.push({ id: item.id, itemCounter: item.itemCounter })
  );

  function closeOrHome() {
    navigate("/Home");
    resetAll();
  }

  function printReceipt() {
    print();
    resetAll();
    navigate("/Home");
  }

  return (
    <>
      <h3>Receipt</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {listItem.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.itemCounter}</td>
              <td>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h6>Total Item: {counter} </h6>
      <h6>Total Price: {totalPrice.toFixed(2)}</h6>
      <button onClick={printReceipt} className="waves-effect  waves-light btn">
        Print Receipt
      </button>
      <button
        onClick={closeOrHome}
        className="fixed-action-btn horizontalbtn-floating btn-large red "
      >
        Close
      </button>
    </>
  );
}
