

import React from "react";

export const CartItem = (props) => {
  return (
    <div className="row my-4">
      <div className="col-md-4 px-4 py-4">{props.product_name}</div>
      <div className="col-md-4 px-4 py-4">
        <div className="row">
          <div className="col-md-4 text-end">+</div>
          <div className="col-md-4">
            <form>
              <input type="text" value={props.qty} className="form-control" readOnly />
            </form>
          </div>
          <div className="col-md-4 text-left font-big">-</div>
        </div>
      </div>
      <div className="col-md-4 px-4 py-4">{Number(props.product_price)*props.qty}</div>
    </div>
  );
};