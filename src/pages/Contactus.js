import React from "react";
import styled from "styled-components";

// Define styled components for the title, paragraphs, and container
const ContactFormContainer = styled.div`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 10px;
  max-width: 800px;
  margin: 100px auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5em;
  text-align: center;
  color: #333;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 10px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// Enhanced Contactus component with styled components
function Contactus() {
  return (
    <ContactFormContainer>
      <Title>Contact Us</Title>
      <Paragraph>
        For any inquiries, please feel free to reach out to us via:
      </Paragraph>
      <Paragraph>Email: propertyBd@gmail.com</Paragraph>
      <SocialLink>Phone Number: 01955151414</SocialLink>
      <Paragraph>Or visit our office at:</Paragraph>
      <Paragraph>
        <strong>Dhaka Uttara</strong>
      </Paragraph>
      <Paragraph>You can call us Saturday to Thursday, 9AM to 5PM.</Paragraph>
      <Paragraph>
        Feel free to give us a call. We'd love to hear from you!
      </Paragraph>
    </ContactFormContainer>
  );
}

export default Contactus;
