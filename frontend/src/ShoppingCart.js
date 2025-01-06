// ShoppingCart.js
import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";

function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", amount: 1 });

  // Fetch all items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/shoppingItems");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    if (newItem.name.trim() === "") return;
    try {
      const response = await fetch("http://localhost:8080/api/shoppingItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const addedItem = await response.json();

      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.name.toLowerCase() === addedItem.name.toLowerCase()
        );
        if (existingItem) {
          return prevItems.map((item) =>
            item.name.toLowerCase() === addedItem.name.toLowerCase()
              ? { ...item, amount: addedItem.amount }
              : item
          );
        }
        return [...prevItems, addedItem];
      });

      setNewItem({ name: "", amount: 1 });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (name, updatedAmount) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/shoppingItems/${name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, amount: updatedAmount }),
        }
      );

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.name === name ? { ...item, amount: updatedAmount } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/shoppingItems/${name}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.name !== name)
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
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
          value={newItem.amount}
          onChange={(e) =>
            setNewItem({ ...newItem, amount: parseInt(e.target.value) })
          }
        />
        <button className="add-button" onClick={addItem}>Add Item</button>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.name} className="item">
            <input
              className="input-field"
              type="text"
              value={item.name}
              readOnly
            />
            <input
              className="input-field"
              type="number"
              min="1"
              value={item.amount}
              onChange={(e) =>
                updateItem(item.name, parseInt(e.target.value))
              }
            />
            <button
              className="delete-button"
              onClick={() => deleteItem(item.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;