import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";

type SearchBarProps = {
  onSearch: any;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue]);
  return (
    <Toolbar className="ps-0 mt-2 w-75">
      <Search style={{ backgroundColor: "rgb(235, 223, 213)" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Szukaj..."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setLocalValue(e.target.value)}
          value={localValue}
        />
      </Search>
    </Toolbar>
  );
};

export default SearchBar;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
