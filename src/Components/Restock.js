import { useState } from "react";
import { addSupply } from "../api/supplyApi";
import styled from "styled-components";

const Container = styled.div`
  width: 30rem;
  margin-top: 0;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  transition: box-shadow 0.3s ease, transform 0.3s ease, font-size 0.3s ease;
  &:hover {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    transform: scaleY(1.1) scaleX(1.1);
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;

const Input = styled.input`
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
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const InputButton = styled.button`
  height: 2rem;
  width: 2rem; // Adjust the width as needed
  cursor: pointer;
  background-color: #007bff; // Primary color
  border: none;
  border-radius: 5px; // Rounded corners for a softer look
  font-size: 1rem; // Adjust the font size as needed
  color: #fff; // Text color
  transition: background-color 0.3s ease, transform 0.3s ease; // Smooth transition for hover effect
  &:hover {
    background-color: #0056b3; // Darker shade on hover
    transform: scale(1.05); // Slightly enlarge the button on hover
  }
  &:active {
    transform: scale(0.95); // Slightly reduce the button size on click
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 1rem;
`;
const Div = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Button = styled.button`
  margin: 0 auto;
  height: 3rem;
  width: 15rem;
  cursor: pointer;
  background-color: rgb(100, 200, 0);
  border-radius: 10rem;
  font-weight: 750;
  font-size: 1rem;
  color: black;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border: none;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
  &:hover {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.4);
    height: 4rem;
    width: 18rem;
    transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease;
    font-size: 1.5rem;
  }
`;
const Span1 = styled.span`
  color: green;
  font-size: 2rem;
`;
const Span2 = styled.span`
  color: orange;
  font-size: 2rem;
`;
const Span3 = styled.span`
  color: red;
  font-size: 2rem;
`;

function Restock({ product, setRes }) {
  const [amount, setAmount] = useState(1);
  const totalCost = amount * product.buyingPrice;
  async function add(supply) {
    try {
      await addSupply(supply);
    } catch (error) {
      console.error("Error while adding supply:", error);
    }
  }
  async function handlClick(e) {
    e.preventDefault();
    const newSupply = {
      productId: product?._id,
      amount: amount,
      totalCost: totalCost,
    };
    await add(newSupply);
    setAmount(1);
    setRes((res) => !res);
  }
  function clickHandler(sign) {
    if (sign === "-") {
      if (amount <= 1) {
        alert("In The Cart There Must be Atleast 1 Item");
        return;
      } else {
        setAmount((amount) => Number(amount) - 1);
      }
    }
    if (sign === "+") {
      setAmount((amount) => Number(amount) + 1);
    }
  }
  return (
    <Container>
      <Div>
        Available in stock:{" "}
        <Span1>
          {product.stock} {product.stock === 1 ? "piece" : "pieces"}
        </Span1>{" "}
        available
      </Div>
      <Div>
        Price for Each Item: <Span2>{product.buyingPrice} Taka</Span2>
      </Div>
      <InputContainer>
        <InputButton onClick={() => clickHandler("-")}>-</InputButton>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></Input>
        <InputButton onClick={() => clickHandler("+")}>+</InputButton>
      </InputContainer>

      <Div>
        The total price would be <Span3>{totalCost} Taka</Span3>{" "}
      </Div>
      <ButtonContainer>
        <Button onClick={handlClick}>Request For Supply</Button>
      </ButtonContainer>
    </Container>
  );
}

export default Restock;
