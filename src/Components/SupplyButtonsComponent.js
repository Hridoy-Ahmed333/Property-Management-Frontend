import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { updateSupply } from "../api/supplyApi";
import styled from "styled-components";

const Button = styled.button`
  height: 2.5rem;
  width: 8rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #45a049;
    height: 3rem;
    width: 11rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

const Span = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  width: 11rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, height 0.3s ease, width 0.3s ease,
    font-size 0.3s ease, font-width 0.3s ease;

  &:hover {
    background-color: #ff6347;
    height: 3.3rem;
    width: 13rem;
    font-size: 1.2rem;
    font-weight: 800;
  }
`;

function SupplyButtonsComponent({ product }) {
  const [controlButton, setControllButton] = useState(product?.el?.dilevered);
  const user = useContext(UserContext);

  async function handleClick(e) {
    e.preventDefault();

    const req = { ...product.el, dilevered: true, supplierId: user._id };
    const res = await updateSupply(req);
    if (res.message === "ok") {
      console.log(controlButton);
      setControllButton(true);
    }
    console.log(res);
  }
  return (
    <div>
      {!controlButton ? (
        <Button onClick={(e) => handleClick(e)}>Supply</Button>
      ) : (
        <Span>Dilevered</Span>
      )}
    </div>
  );
}

export default SupplyButtonsComponent;
