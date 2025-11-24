import { Button, CircularProgress, Tooltip } from "@mui/material";
import {
  getAudycjaStatusColor,
  getAudycjaStatusLabelById,
  getLocationLabelById,
  LocationTypeMap,
} from "../../common";
import CustomText from "../elements/CustomText";
import ListItemWrapper from "../elements/ListItemWrapper";
import { handlePaymentStatusChange, type Audycja } from "./audycje";
import LabeledAudycjaInfo from "./LabeledAudycjaInfo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { urlRoutes } from "../../routes/urlRoutes";
import PaidIcon from "@mui/icons-material/Paid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../assets/queryKeys";
import { useNotification } from "../../assets/NotificationProvider";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import NavigationIcon from "@mui/icons-material/Navigation";
import CountdownTimer from "../elements/CountdownTimer";

type AudycjaCardProps = {
  audycja: Audycja;
  onEditClick?: (audycja: Audycja) => void;
  onDeleteClick?: (audycjaId: string) => void;
  onReminderClick?: (audycja: Audycja) => void;
  index?: number;
  isDashboardViewCard?: boolean;
};

const AudycjaCard: React.FC<AudycjaCardProps> = ({
  audycja,
  onEditClick,
  onDeleteClick,
  onReminderClick,
  // index,
  isDashboardViewCard,
}) => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const startTime = formatTime(audycja.startDate);
  const endTime = formatTime(audycja.endDate);
  const navigate = useNavigate();
  const { mutate: updatePaymentStatusMutate, isPending } = useMutation({
    mutationFn: ({
      audycjaId,
      newStatus,
    }: {
      audycjaId: string;
      newStatus: boolean;
    }) => handlePaymentStatusChange(audycjaId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeListBase(),
        exact: false,
      });
      showNotification("success", "Zaktualizowano status płatności.");
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas zmiany statusu płatności.");
      console.error("Błąd podczas zmiany statusu płatności:", error);
    },
  });

  const handlePaymentToggle = () => {
    const newStatus = !audycja.isPaid;
    updatePaymentStatusMutate({ audycjaId: audycja._id!, newStatus });
  };

  return (
    <ListItemWrapper
      className="ms-4 my-0 audycja-card d-flex flex-column justify-content-between position-relative"
      key={audycja._id}
      style={
        !isDashboardViewCard && {
          backgroundColor: getAudycjaStatusColor(audycja.status),
        }
      }
    >
      {audycja.place ? (
        <div>
          <div className="d-flex justify-content-between mb-2">
            {isDashboardViewCard ? (
              // TO DELETE VVVVVVVVVVVVV
              //@ts-ignore
              <CountdownTimer endDate={audycja.endDate} />
            ) : (
              <CustomText fontSize={14} headerType="span" fontWeight={600}>
                {getAudycjaStatusLabelById(audycja.status)}
              </CustomText>
            )}
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
            <LabeledAudycjaInfo
              label="Prowadzący"
              value={audycja.leader?.name}
            />
            <LabeledAudycjaInfo label="Tel." value={audycja.leader?.phone} />
            <LabeledAudycjaInfo label="Muzyk" value={audycja.musician?.name} />
            <LabeledAudycjaInfo label="Tel." value={audycja.musician?.phone} />
          </div>
          <div className="d-flex flex-column mt-3">
            <div>
              <LabeledAudycjaInfo label="Cena" value={audycja.price} />
              {onEditClick && (
                <PaidIcon
                  className="ms-1"
                  fontSize="small"
                  style={{
                    cursor: "pointer",
                    color: `${audycja.isPaid ? "green" : "red"}`,
                  }}
                  onClick={handlePaymentToggle}
                />
              )}
            </div>

            <LabeledAudycjaInfo
              label="Płatność"
              value={audycja.paymentMethod}
            />

            <LabeledAudycjaInfo
              label="FV"
              value={audycja.place.invoiceEmail || audycja.place.email}
            />
          </div>
        </div>
      ) : (
        <span>Wystąpił błąd - brak placówki.</span>
      )}
      {/* VVVVVVVVVVV TRAVEL TIME ARROW VVVVVVVVVVV */}
      {/* {index !== 0 && (
        <div className="position-relative">
          <NavigationIcon
            className="position-absolute"
            style={{
              rotate: "90deg",
              left: -75,
              top: -120,
              fontSize: 90,
              color: "rgba(128, 128, 128, 0.5)",
            }}
          />
          <CustomText
            className="position-absolute"
            style={{
              left: -47,
              top: -83,
            }}
            fontSize={10}
            fontWeight={600}
          >
            20 min
          </CustomText>
        </div>
      )} */}

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
          {onEditClick && onDeleteClick && onReminderClick && (
            <>
              <Tooltip title="Wyślij przypomnienie">
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{
                    minWidth: "unset",
                    padding: "4px",
                  }}
                  onClick={() => onReminderClick(audycja)}
                >
                  <NotificationsActiveIcon fontSize="small" />
                </Button>
              </Tooltip>
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
            </>
          )}
          {isDashboardViewCard && (
            <CustomText fontSize={18} fontWeight={700}>
              {audycja.place.locationTypeId !==
              LocationTypeMap.KujawskoPomorskie
                ? getLocationLabelById(audycja.place.locationTypeId)
                : "Kuj-Pom"}
            </CustomText>
          )}
        </div>
      </div>

      {isPending && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(2px)",
            zIndex: 10,
            borderRadius: "12px",
          }}
        >
          <CircularProgress size={32} />
        </div>
      )}
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
