import { useState, useEffect } from "react"; // useState is used to store text which is entered on search field and useEffect is used for API call.

import { InputBase, Box, List, ListItem, styled } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux"; //these are used to pick data from redux and to dispatch

import { getProducts } from "../../redux/actions/productActions";

import { Link } from "react-router-dom";

const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
  color: blue;
  padding: 5px;
  display: flex;
`;

const ListWrapper = styled(List)`
  position: absolute;
  background: #ffffff;
  color: #000;
  margin-top: 36px;
`;

const Search = () => {
  const [text, setText] = useState(""); //state for text which stores null initially.

  const { products } = useSelector((state) => state.getProducts); // list of products which have to be picked from redux

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]); // API call

  const getText = (text) => {
    setText(text);
  }; // storing of text which entered in search bar.

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />
      {/* calls the getText() function with text entered on search bar */}
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {text && (
        <ListWrapper>
          {
            products
              .filter((product) =>
                product.title.longTitle
                  .toLowerCase()
                  .includes(text.toLowerCase())
              )
              .map((product) => (
                <ListItem>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setText("")}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {product.title.longTitle}
                  </Link>
                </ListItem>
              ))
            // all the names of the items will displayed which have any letter matches with the user entered text.
            // 'link to' is added to navigate the displayed name to its product page.
          }
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
