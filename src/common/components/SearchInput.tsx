import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SearchInputContainer = styled(TextField)(({ theme }) => ({
  width: "70%",
  maxWidth: "30rem",
  minWidth: "18rem",
  marginBottom: "1.625rem",
  backgroundColor: theme.palette.background.default,
  borderRadius: "1rem",

  "& .MuiInputBase-root": {
    border: `0.5px solid ${alpha(theme.palette.text.secondary, 0.5)}`,
    borderRadius: "1rem",
    height: "2.625rem",
    fontSize: "0.9rem",
  },

  "& .MuiInputBase-input": {
    padding: "0 0.5rem",
    height: "100%",
    boxSizing: "border-box",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
    },
  },
}));

interface SearchInputProps {
  initialValue?: string;
}

export const SearchInput = ({ initialValue = "" }: SearchInputProps) => {
  const [keyword, setKeyword] = useState<string>(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <SearchInputContainer
      value={keyword}
      onChange={handleSearchKeyword}
      onKeyPress={handleKeyPress}
      placeholder="곡이나 아티스트를 검색해보세요."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} />
          </InputAdornment>
        ),
      }}
    />
  );
};
