import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id || "" });

  if (id === undefined) return <Navigate to="/" />;

  console.log("pp", playlist);

  return <div>PlaylistDetailPage</div>;
};

export default PlaylistDetailPage;
