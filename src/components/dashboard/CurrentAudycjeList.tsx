import AudycjaCard from "../audycje/AudycjaCard";
import type { Audycja } from "../audycje/audycje";
import "../audycje/AudycjeList.scss";
import CustomText from "../elements/CustomText";

type CurrentAudycjeListProps = {
  currentAudycje: Audycja[];
};

const CurrentAudycjeList: React.FC<CurrentAudycjeListProps> = ({
  currentAudycje,
}) => {
  return (
    <div
      className="d-flex p-3 ps-0 audycje-wrapper"
      //   style={{ overflowX: "auto" }}
    >
      {currentAudycje.length > 0 ? (
        <>
          {currentAudycje.map((currentAudycja) => (
            <AudycjaCard
              key={"current-" + currentAudycja._id}
              audycja={currentAudycja}
              isDashboardViewCard={true}
            />
          ))}
        </>
      ) : (
        <CustomText className="mt-3" fontSize={16}>
          Obecnie nie są prowadzone żadne audycje.
        </CustomText>
      )}
    </div>
  );
};

export default CurrentAudycjeList;
