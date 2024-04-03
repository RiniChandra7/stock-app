import React from "react";

interface TimeIntervalButtonProps {
    interval: string;
    onClick: (interval: string) => void;
}

const TimeIntervalButton: React.FC<TimeIntervalButtonProps> = ({ interval, onClick }) => {
    return (
        <button 
            className="px-4 py-2 bg-blue-500 text-white rounded border border-white"
            onClick={() => onClick(interval)}
        >
            {interval}
        </button>
    );
};

export default TimeIntervalButton;
