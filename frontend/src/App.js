// Imported React functionality
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// components
import './app.css';
import Home from "./components/Home";
import PodcastOverview from "./components/Podcastoverview";
import PodcastDetails from "./components/PodcastDetails";
import About from "./components/About"
import Main from "./components/Main";
import Login from "./components/Login";
import NavigationBar from "./components/Navigationbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Reducers
import user from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aktuelles" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/episodes" element={<PodcastOverview />} />
          <Route path="/episodes/:id" element={<PodcastDetails />}/>
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
};
