"use client";
import React, { useEffect, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputMask from "react-input-mask";
import {
  PaymentContainer,
  PaymentCard,
  PaymentForm,
  Input,
  ExpiryInput,
  CVCInput,
  PaymentPix,
} from "./style";
import PaymentSuccess from "./components/PaymentSuccess";

export default function PaymentPage() {
  const [SSR, setSSR] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "" as Focused,
  });

  function handleInputFocus(e) {
    const { name } = e.target;
    setCardData({ ...cardData, focus: name });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPaymentSuccessful(true);
  }

  useEffect(() => {
    setSSR(true);
  }, []);

  return (
    <>
      {isPaymentSuccessful ? (
        <PaymentSuccess />
      ) : (
        SSR && (
          <PaymentContainer>
            <h1 className="font-bold text-xl mb-2">
              Realize o pagamento para confirmar sua reserva
            </h1>

            <h2 className="font-normal text-lg mb-8">
              Valor da reserva: R$ 00,00
            </h2>

            <h3 className="font-normal text-base mb-2">
              Pagar com cartão:
            </h3>

            <PaymentCard>
              <Cards
                cvc={cardData.cvc}
                expiry={cardData.expiry}
                focused={cardData.focus}
                name={cardData.name}
                number={cardData.number}
              />

              <PaymentForm>
                <InputMask
                  mask="9999 9999 9999 9999"
                  maskChar=""
                  value={cardData.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                >
                  {() => (
                    <Input
                      type="tel"
                      name="number"
                      placeholder="Card Number"
                      required
                    />
                  )}
                </InputMask>

                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={cardData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />

                <div className="flex">
                  <InputMask
                    mask="99/99"
                    maskChar=""
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  >
                    {() => (
                      <ExpiryInput
                        type="tel"
                        name="expiry"
                        placeholder="Valid Thru"
                        required
                      />
                    )}
                  </InputMask>

                  <CVCInput
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
              </PaymentForm>
            </PaymentCard>

            <PaymentPix>
              <input type="checkbox" id="pixCheckbox" className="group" />
              <label
                htmlFor="pixCheckbox"
                className="checkbox"
                data-label="Pagar com pix! (Seu pagamento deverá ser confirmado em até
                  24h)"
              ></label>
            </PaymentPix>
            
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-52 h-7 bg-[#ea5e53] text-white border-0 rounded-full"
            >
              Confirmar pagamento
            </button>
          </PaymentContainer>
        )
      )}
    </>
  );
}