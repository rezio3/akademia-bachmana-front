import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState, useEffect } from "react";
import HeaderText from "../elements/HeaderText";
import AudycjaCard from "./AudycjaCard";
import type { Audycja } from "./audycje";
import "./AudycjeList.scss";

type AudycjeListProps = {
  audycje: Audycja[];
};

const AudycjeList: React.FC<AudycjeListProps> = ({ audycje }) => {
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
      const scrollAmount = 150; // zmniejszona wartość z 300 na 150
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="audycje-list">
      <div className="audycje-row d-flex">
        <div className="header-container d-flex justify-content-end">
          <HeaderText
            fontSize={34}
            headerType="h5"
            fontWeight={300}
            className="pe-3 pt-2"
          >
            1
          </HeaderText>
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
                  <AudycjaCard audycja={audycja} key={audycja._id} />
                ))}
              </>
            ) : (
              <span className="ms-3">Brak audycji w tym dniu.</span>
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
    </div>
  );
};

export default AudycjeList;
