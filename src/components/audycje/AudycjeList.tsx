import { Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState, useEffect } from "react";
import CustomText from "../elements/CustomText";
import AudycjaCard from "./AudycjaCard";
import type { Audycja } from "./audycje";
import { deleteAudycja } from "./audycje";
import "./AudycjeList.scss";
import AddIcon from "@mui/icons-material/Add";
import AddOrEditAudycjaModal from "./AddOrEditAudycjaModal";
import ConfirmModal from "../elements/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../assets/queryKeys";
import { useNotification } from "../../assets/NotificationProvider";

type AudycjeListProps = {
  audycje: Audycja[];
  selectedMonth: number;
  selectedYear: number;
};

const AudycjeList: React.FC<AudycjeListProps> = ({
  audycje,
  selectedMonth,
  selectedYear,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAudycja, setSelectedAudycja] = useState<Audycja | undefined>();
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [audycjaToDelete, setAudycjaToDelete] = useState<string | undefined>();

  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const handleEditClick = (audycja: Audycja) => {
    setSelectedAudycja(audycja);
    setDefaultDate(undefined);
    setOpenModal(true);
  };
  const handleAddClick = (date: Date) => {
    setSelectedAudycja(undefined);
    setDefaultDate(date);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenDeleteConfirmModal(false);
    setSelectedAudycja(undefined);
    setDefaultDate(undefined);
  };

  const handleDeleteClick = (audycjaId: string) => {
    setAudycjaToDelete(audycjaId);
    setOpenDeleteConfirmModal(true);
  };
  const handleConfirmDelete = () => {
    if (audycjaToDelete) {
      deletePlaceMutation.mutate(audycjaToDelete);
    }
  };
  const deletePlaceMutation = useMutation({
    mutationFn: deleteAudycja,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.audycjePage.audycjeListBase(),
        exact: false,
      });
      showNotification("success", "Usunięto audycję.");
      setOpenDeleteConfirmModal(false);
      setAudycjaToDelete(undefined);
    },
    onError: (error) => {
      showNotification("error", "Błąd podczas usuwania audycji.");
      console.error("Błąd podczas usuwania placówki:", error);
    },
  });
  const getDayName = (year: number, month: number, day: number): string => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("pl-PL", { weekday: "short" });
  };
  const getDaysInMonth = (month: number): number => {
    const year = new Date().getFullYear();
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  return (
    <div className="audycje-list">
      {Array.from({ length: daysInMonth }, (_, index) => {
        const dayNumber = index + 1;
        const dayName = getDayName(selectedYear, selectedMonth, dayNumber);

        const audycjeForDay = audycje.filter((audycja) => {
          const startDate = new Date(audycja.startDate);
          return startDate.getDate() === dayNumber;
        });

        const sortedAudycje = audycjeForDay.sort((a, b) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getTime() - dateB.getTime();
        });

        return (
          <AudycjeRow
            key={dayNumber}
            dayNumber={dayNumber}
            dayName={dayName}
            audycje={sortedAudycje}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onEditClick={handleEditClick}
            onAddClick={handleAddClick}
            onDeleteClick={handleDeleteClick}
          />
        );
      })}

      <AddOrEditAudycjaModal
        handleClose={handleCloseModal}
        open={openModal}
        audycjaToEdit={selectedAudycja}
        defaultDate={defaultDate}
      />
      <ConfirmModal
        open={openDeleteConfirmModal}
        handleClose={() => {
          setOpenDeleteConfirmModal(false);
          setAudycjaToDelete(undefined);
        }}
        onConfirm={() => {
          handleConfirmDelete();
        }}
        description="Czy na pewno chcesz usunąć tę audycję?"
      />
    </div>
  );
};

type AudycjeRowProps = {
  dayNumber: number;
  dayName: string;
  audycje: Audycja[];
  selectedMonth: number;
  selectedYear: number;
  onEditClick: (audycja: Audycja) => void;
  onAddClick: (date: Date) => void;
  onDeleteClick: (audycjaId: string) => void;
};

const AudycjeRow: React.FC<AudycjeRowProps> = ({
  dayNumber,
  dayName,
  audycje,
  selectedMonth,
  selectedYear,
  onEditClick,
  onAddClick,
  onDeleteClick,
}) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [audycje]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddButtonClick = () => {
    const date = new Date(selectedYear, selectedMonth - 1, dayNumber);
    onAddClick(date);
  };

  return (
    <div className="audycje-row d-flex">
      <div className="header-container d-flex flex-column align-items-end pe-3 position-relative">
        <CustomText fontSize={14} className="position-absolute">
          {dayName}
        </CustomText>
        <CustomText
          fontSize={34}
          headerType="h5"
          fontWeight={300}
          className="pt-2"
        >
          {dayNumber}
        </CustomText>

        {audycje.length > 0 && (
          <Button
            className="mt-2"
            variant="outlined"
            size="small"
            onClick={handleAddButtonClick}
            sx={{
              minWidth: "unset",
              padding: "4px",
              color: "rgba(128, 128, 128, 0.5)",
              borderColor: "rgba(128, 128, 128, 0.3)",
              "&:hover": {
                borderColor: "darkgray",
                backgroundColor: "rgba(128, 128, 128, 0.04)",
              },
            }}
          >
            <AddIcon fontSize="small" className="" />
          </Button>
        )}
      </div>
      <div className="audycje-wrapper position-relative">
        {showLeftArrow && (
          <IconButton
            className="scroll-arrow scroll-arrow-left"
            onClick={() => scroll("left")}
            size="large"
          >
            <ArrowBackIosNewIcon className="arrow-icon" />
          </IconButton>
        )}
        <ul
          ref={scrollContainerRef}
          className="list-unstyled audycje-container my-0 d-flex p-3 ps-0"
          onScroll={checkScroll}
        >
          {audycje.length > 0 ? (
            <>
              {audycje.map((audycja) => (
                <AudycjaCard
                  audycja={audycja}
                  key={audycja._id}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </>
          ) : (
            <>
              <span className="ms-3">Brak audycji w tym dniu.</span>
              <Button
                className="ms-2"
                variant="outlined"
                size="small"
                onClick={handleAddButtonClick}
                sx={{
                  minWidth: "unset",
                  padding: "4px",
                  color: "rgba(128, 128, 128, 0.5)",
                  borderColor: "rgba(128, 128, 128, 0.3)",
                  "&:hover": {
                    borderColor: "darkgray",
                    backgroundColor: "rgba(128, 128, 128, 0.04)",
                  },
                }}
              >
                <AddIcon fontSize="small" className="" />
              </Button>
            </>
          )}
        </ul>
        {showRightArrow && (
          <IconButton
            className="scroll-arrow scroll-arrow-right"
            onClick={() => scroll("right")}
            size="large"
          >
            <ArrowForwardIosIcon className="arrow-icon" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default AudycjeList;
