import { Typography } from "@mui/material";
import type { Track } from "../../../models/track";

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <Typography>{track.name}</Typography>
      ))}
    </div>
  );
};

export default SearchResultList;
