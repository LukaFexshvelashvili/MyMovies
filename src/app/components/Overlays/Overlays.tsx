import TrailerOverlay from "./TrailerOverlay";
import DetailsOverlay from "./DetailOverlay";
import AuthOverlay from "./AuthOverlay";
import WatchHistoryOverlay from "./WatchHistoryOverlay";
import BookmarksOverlay from "./BookmarksOverlay";
import Alerts from "../../../components/Alerts";

export default function Overlays() {
  return (
    <>
      <TrailerOverlay />
      <DetailsOverlay />
      <AuthOverlay />
      <WatchHistoryOverlay />
      <BookmarksOverlay />
      <Alerts />
    </>
  );
}
