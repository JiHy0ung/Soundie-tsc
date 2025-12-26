import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGetNewReleases from "../../../hooks/useGetNewReleases";

const TitleText = styled(Typography)(({ theme }) => ({
  padding: "0 1rem",
  fontFamily: theme.typography.fontFamily,
  fontSize: "1.625rem",
  fontWeight: 700,
}));

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  console.log("ddd", data);
  return (
    <div>
      <TitleText>New Releases Albums</TitleText>
    </div>
  );
};

export default NewReleases;
