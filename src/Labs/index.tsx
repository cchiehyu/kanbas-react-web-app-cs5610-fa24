import React from 'react';
import { Route, Routes } from "react-router-dom";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import store from "./store";
import { Provider } from "react-redux";

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
};

const labStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '20px',
};

export default function Labs() {
  return (
    <Provider store={store}>
    <div style={containerStyle}>
      <TOC />
      <Routes>
        <Route path="/" element={<AllLabs />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="Lab4" element={<Lab4 />} />
      </Routes>
    </div>
    </Provider>
  );
}

function AllLabs() {
  return (
    <div style={{width: '100%'}}>
      <h1>All Labs</h1>
      <div style={labStyle}><Lab1 /></div>
      <div style={labStyle}><Lab2 /></div>
      <div style={labStyle}><Lab3 /></div>
      <div style={labStyle}><Lab4 /></div>
    </div>
  );
}