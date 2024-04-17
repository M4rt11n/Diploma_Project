import React, { useState, useEffect } from "react";
import Button from "../Elements/Button/Button";
import "../Styles/NavBar.scss";
import "../Styles/SearchBar.scss";
import Hamburger from "./menu/Hamburger";
import Title from "../Elements/Title";
import Pic from "../Elements/Pic";
import ShalomLogo from "../Assets/Images/ShalomLogo.svg";
import "../Styles/Pic.scss";
import { Link } from "react-router-dom";
import { songsSearchAdapter } from "../Utility/songs-adapter";
import { debounce } from "lodash";

function NavBar({ setSongs, loadSongsCache }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/songs/search?title=${searchQuery}`
      );
      const songsJson = await res.json();

      const songsRemap = songsSearchAdapter(songsJson);

      setSongs(songsRemap);
    };

    const debouncedSearch = debounce(search, 300); // Adjust the debounce delay as needed (300 milliseconds here)

    if (searchQuery) debouncedSearch();
    else loadSongsCache();

    return () => {
      debouncedSearch.cancel(); // Cancel the debounced function on component unmount
    };
  }, [searchQuery]);

  return (
    <>
      <div className="nav">
        <div className="shalom-logo">
          <Link to={"/"}>
            <Pic src={ShalomLogo} />
          </Link>
        </div>

        <div className="nav-search-acc">
          <div className="search-box">
            <input
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсиш песен?"
            />
            <button className="search-button" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <a href="https://www.shalom-sevlievo.church/"></a>
                <g clipPath="url(#clip0_2_17)">
                  <g filter="url(#filter0_d_2_17)">
                    <path
                      d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      shapeRendering="crispEdges"
                    ></path>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_2_17"
                    x="-0.418549"
                    y="3.70435"
                    width="29.7139"
                    height="29.7139"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dy="4"></feOffset>
                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2_17"
                    ></feBlend>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2_17"
                      result="shape"
                    ></feBlend>
                  </filter>
                  <clipPath id="clip0_2_17">
                    <rect
                      width="28.0702"
                      height="28.0702"
                      fill="white"
                      transform="translate(0.403503 0.526367)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
