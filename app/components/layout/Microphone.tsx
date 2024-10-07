import { FaMicrophone } from "react-icons/fa";

type MicrophoneButtonProps = {
  color: "red" | "blue";
  onClick?: () => void;
};

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  color,
  onClick,
}) => {
  const isRed = color === "red";

  return (
    <div className="container">
      <button
        className={`btn ${isRed ? "red" : "blue"} center`}
        onClick={onClick}
      >
        <div className="pulse-ring"></div>
        <FaMicrophone color="white" />
      </button>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }

        .btn {
          border: none;
          padding: 0;
          border-radius: 100%;
          width: 100px;
          height: 100px;
          font-size: 3em;
          color: #fff;
          background-color: ${isRed ? "red" : "#189BFF"};
          position: relative;
          z-index: 999;
          line-height: 100px;
          text-align: center;
          cursor: pointer;
        }

        .pulse-ring {
          content: "";
          width: 100px;
          height: 100px;
          border: 5px solid ${isRed ? "red" : "#189BFF"};
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          animation: pulsate 1.5s infinite;
        }

        @keyframes pulsate {
          0% {
            transform: scale(1, 1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3, 1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
