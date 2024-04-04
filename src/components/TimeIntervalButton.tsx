import React from "react";
import { useAppSelector } from "../hooks/storeHooks";

interface TimeIntervalButtonProps {
    interval: string;
    onClick: (interval: string) => void;
}

const TimeIntervalButton: React.FC<TimeIntervalButtonProps> = ({ interval, onClick }) => {
    // Retrieve current selected interval from Redux store
    const curInterval = useAppSelector(store => store.timeInterval.interval);
    // Determine active button style based on whether the button represents the current selected interval
    const buttonClass = interval === curInterval ? "bg-blue-500" : "bg-gray-800";

    return (
        <button 
            className={`px-4 py-2 ${buttonClass} text-white rounded border border-white`}
            onClick={() => onClick(interval)}
        >
            {interval}
        </button>
    );
};

export default TimeIntervalButton;
