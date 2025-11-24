// import { useEffect, useState } from "react";
// import CustomText from "../elements/CustomText";

// type CountdownTimerProps = {
//   endDate: Date | string;
// };

// const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date().getTime();
//       const end = new Date(endDate).getTime();
//       const difference = end - now;

//       if (difference <= 0) {
//         setTimeLeft("Zakończona");
//         return;
//       }

//       const hours = Math.floor(difference / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       setTimeLeft(
//         `${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//       );
//     };

//     calculateTimeLeft();
//     const interval = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(interval);
//   }, [endDate]);

//   return (
//     <CustomText fontSize={18} fontWeight={700} headerType="span">
//       {timeLeft}
//     </CustomText>
//   );
// };

// export default CountdownTimer;

// TO DELETE VVVVVVVVVVVVVVVVVVVVVV
import { useEffect, useState, useRef } from "react";
import CustomText from "../elements/CustomText";

type CountdownTimerProps = {
  minHours?: number;
  maxHours?: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  minHours = 1,
  maxHours = 2,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Generuj losowy czas tylko raz przy montowaniu
    if (endTimeRef.current === null) {
      const now = new Date().getTime();
      const minMilliseconds = minHours * 60 * 60 * 1000;
      const maxMilliseconds = maxHours * 60 * 60 * 1000;
      const randomMilliseconds =
        Math.random() * (maxMilliseconds - minMilliseconds) + minMilliseconds;

      endTimeRef.current = now + randomMilliseconds;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTimeRef.current! - now;

      if (difference <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [minHours, maxHours]);

  return (
    <CustomText fontSize={18} fontWeight={700} headerType="span">
      {timeLeft}
    </CustomText>
  );
};

export default CountdownTimer;
