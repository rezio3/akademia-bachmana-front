import { Button, Tooltip } from "@mui/material";
import { getAudycjaStatusColor, getAudycjaStatusLabelById } from "../../common";
import CustomText from "../elements/CustomText";
import ListItemWrapper from "../elements/ListItemWrapper";
import type { Audycja } from "./audycje";
import LabeledAudycjaInfo from "./LabeledAudycjaInfo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { urlRoutes } from "../../routes/urlRoutes";

type AudycjaCardProps = {
  audycja: Audycja;
  onEditClick: (audycja: Audycja) => void;
  onDeleteClick: (audycjaId: string) => void;
};

const AudycjaCard: React.FC<AudycjaCardProps> = ({
  audycja,
  onEditClick,
  onDeleteClick,
}) => {
  const startTime = formatTime(audycja.startDate);
  const endTime = formatTime(audycja.endDate);
  const navigate = useNavigate();
  return (
    <ListItemWrapper
      className="ms-4 my-0 audycja-card d-flex flex-column justify-content-between"
      key={audycja._id}
      style={{
        backgroundColor: getAudycjaStatusColor(audycja.status),
      }}
    >
      <div>
        <div className="d-flex justify-content-between mb-2">
          <CustomText fontSize={14} headerType="span" fontWeight={600}>
            {getAudycjaStatusLabelById(audycja.status)}
          </CustomText>
          <CustomText fontSize={14} headerType="span" fontWeight={600}>
            {startTime} - {endTime}
          </CustomText>
        </div>
        <CustomText
          fontSize={12}
          headerType="p"
          fontWeight={500}
          lineHeight="1.2"
          onClick={() => {
            navigate(
              `${urlRoutes.places}?search=${encodeURIComponent(
                audycja.place.name
              )}`
            );
          }}
        >
          {audycja.place.name}
        </CustomText>
        <div className="mt-2 d-flex flex-column">
          <LabeledAudycjaInfo label="Tel." value={audycja.place.phone} />
          <LabeledAudycjaInfo label="Email" value={audycja.place.email} />
          <LabeledAudycjaInfo
            label="Os. kontaktowa"
            value={audycja.place.contactPerson}
          />
        </div>
        <div className="d-flex flex-column mt-3">
          <LabeledAudycjaInfo label="Prowadzący" value={audycja.leader?.name} />
          <LabeledAudycjaInfo label="Tel." value={audycja.leader?.phone} />
          <LabeledAudycjaInfo label="Muzyk" value={audycja.musician?.name} />
          <LabeledAudycjaInfo label="Tel." value={audycja.musician?.phone} />
        </div>
        <div className="d-flex flex-column mt-3">
          <LabeledAudycjaInfo label="Cena" value={audycja.price} />
          <LabeledAudycjaInfo label="Płatność" value={audycja.paymentMethod} />
          <LabeledAudycjaInfo
            label="FV"
            value={audycja.place.invoiceEmail || audycja.place.email}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <CustomText headerType="span" fontSize={12}>
            Notatka
          </CustomText>
          <Tooltip title={audycja.description || "Brak"} className="ms-1">
            <VisibilityIcon style={{ cursor: "pointer" }} />
          </Tooltip>
        </div>
        <div className="d-flex gap-1">
          <Tooltip title="Edytuj">
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{
                minWidth: "unset",
                padding: "4px",
              }}
              onClick={() => onEditClick(audycja)}
            >
              <EditIcon fontSize="small" />
            </Button>
          </Tooltip>
          <Tooltip title="Usuń">
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{
                minWidth: "unset",
                padding: "4px",
              }}
              onClick={() => onDeleteClick(audycja!._id!)}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </Tooltip>
        </div>
      </div>
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
