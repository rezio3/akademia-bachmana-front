import HeaderText from "../elements/HeaderText";
import ListItemWrapper from "../elements/ListItemWrapper";
import type { Audycja } from "./audycje";

type AudycjaCardProps = {
  audycja: Audycja;
};

const AudycjaCard: React.FC<AudycjaCardProps> = ({ audycja }) => {
  const startTime = formatTime(audycja.startDate);
  const endTime = formatTime(audycja.endDate);
  return (
    <ListItemWrapper className="ms-4 my-0 audycja-card" key={audycja._id}>
      <HeaderText
        fontSize={14}
        headerType="h4"
        fontWeight={600}
        className="d-flex justify-content-end mb-2"
      >
        {startTime} - {endTime}
      </HeaderText>
      <HeaderText fontSize={12} headerType="h4" fontWeight={400}>
        {audycja.place.name}
      </HeaderText>
      {/* <HeaderText fontSize={12} headerType="h4" fontWeight={400}>
        {audycja.place}
      </HeaderText> */}
    </ListItemWrapper>
  );
};

export default AudycjaCard;

const formatTime = (date: Date | string) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
