// ShoppingCart.js
import React, { useState } from "react";
import "./ShoppingCart.css";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });

  const addItem = () => {
    if (newItem.name.trim() === "") return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", quantity: 1 });
  };

  const editItem = (id, updatedItem) => {
    setItems(items.map((item) => (item.id === id ? updatedItem : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="shopping-cart-container">
      <h1 className="title">Shopping Cart</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          className="input-field"
          type="number"
          min="1"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
          }
        />
        <button className="add-button" onClick={addItem}>Add Item</button>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <input
              className="input-field"
              type="text"
              value={item.name}
              onChange={(e) =>
                editItem(item.id, { ...item, name: e.target.value })
              }
            />
            <input
              className="input-field"
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                editItem(item.id, { ...item, quantity: parseInt(e.target.value) })
              }
            />
            <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
