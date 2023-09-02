import React, {ReactNode, useState} from 'react';
import style from './index.module.scss';

interface TooltipProps {
    content: string;
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({content, children}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsTooltipVisible(true);
    }

    const handleMouseLeave = () => {
        setIsTooltipVisible(false);
    };

    return (
        <div
            className={style.tooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isTooltipVisible && <div className={style.tooltipText}>{content}</div>}
        </div>
    );
};

export default Tooltip;

