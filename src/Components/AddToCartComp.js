import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

const Button = styled.button`
  height: 3rem;
  width: 15rem;
  cursor: pointer;
  background-color: rgb(100, 200, 0);
  border-radius: 10rem;
  font-weight: 750;
  font-size: 1.5rem;
  color: black;
  margin: 0.5rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border: none;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
  &:hover {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    height: 4rem;
    width: 18rem;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
    font-size: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const CartButton = styled.button`
  height: 2rem;
  width: 2rem; // Adjust the width as needed
  cursor: pointer;
  background-color: #007bff; // Primary color
  border: none;
  border-radius: 5px; // Rounded corners for a softer look
  font-size: 1rem; // Adjust the font size as needed
  color: #fff; // Text color
  margin: 0.5rem auto; // Add some margin for spacing
  transition: background-color 0.3s ease, transform 0.3s ease; // Smooth transition for hover effect
  &:hover {
    background-color: #0056b3; // Darker shade on hover
    transform: scale(1.05); // Slightly enlarge the button on hover
  }
  &:active {
    transform: scale(0.95); // Slightly reduce the button size on click
  }
`;

const CartInput = styled.input`
  height: 2rem;
  width: 5rem;
  margin: 0 1rem;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
// const cart = {
//   productId: "444",
//   product: "product",
//   totalNumber: 1,
// };

function AddToCartComp({ product, totalPrice, setTotalPrice }) {
  const [amount, setAmount] = useState(1);
  const { setCartAmount } = useContext(CartContext);

  // Save cart and cartAmount to local storage whenever they change
  async function clickHandler(e) {
    e.preventDefault();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedCartAmount = Number(localStorage.getItem("cartAmount")) || 0;
    const newStoredCartAmount = storedCartAmount + amount;

    // Check if the product already exists in the cart
    const existingProductIndex = storedCart.findIndex(
      (item) => item.id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      const updatedCart = storedCart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, totalNumber: item.totalNumber + amount };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the product does not exist, add it to the cart
      const newCart = [
        ...storedCart,
        { id: product._id, product: product.name, totalNumber: amount },
      ];
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    // Update the cart amount in local storage
    localStorage.setItem("cartAmount", newStoredCartAmount.toString());
    setCartAmount(Number(localStorage.getItem("cartAmount")) || 0);

    // Reset the amount to  1 for the next product
    setAmount(1);
  }

  return (
    <Container>
      <CartForm
        amount={amount}
        setAmount={setAmount}
        product={product}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      <Button onClick={(e) => clickHandler(e)}>Add to Cart</Button>
    </Container>
  );
}

function CartForm({ amount, setAmount, product, totalPrice, setTotalPrice }) {
  useEffect(() => {
    function total() {
      setTotalPrice(amount);
    }
    total();
  }, [amount, product?.discountPercentage, setTotalPrice]);

  function clickHandler(sign) {
    if (sign === "-") {
      if (amount <= 1) {
        alert("In The Cart There Must be Atleast 1 Item");
        return;
      } else {
        setAmount((amount) => amount - 1);
      }
    }
    if (sign === "+") {
      if (amount > product?.stock) {
        setAmount(product?.stock);

        alert("No more item in the stock");
        return;
      }
      setAmount((amount) => amount + 1);
    }
  }
  return (
    <CartContainer>
      <CartButton onClick={() => clickHandler("-")}>-</CartButton>
      <CartInput
        value={amount}
        onChange={(e) => {
          setAmount(
            Number(
              e.target.value > product?.stock ? product?.stock : e.target.value
            )
          );
          if (Number(e.target.value) > Number(product?.stock)) {
            alert(
              `Only ${product?.stock} pieces of this product are availble in stock`
            );
          }
        }}
      ></CartInput>
      <CartButton onClick={() => clickHandler("+")}>+</CartButton>
    </CartContainer>
  );
}

export default AddToCartComp;
