import Link from "next/link";
import { Button } from "./button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface IconButtonWithTooltipProps {
    tooltipText: string;
    icon: React.ElementType;
    variant?: "link" | "ghost" | "default" | "destructive" | "outline" | "secondary" | null | undefined;
    size?: "default" | "icon" | "sm" | "lg" | null | undefined;
    className?: string;
    href?: string;
    onClick?: () => void;
}

const IconButtonWithTooltip = ({
                                   tooltipText,
                                   icon: Icon,
                                   variant = "ghost",
                                   size = "icon",
                                   className = "",
                                   href = null,
                                   onClick = null,
                               }: IconButtonWithTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {href ? (
                        <Link href={href}>
                            <Button
                                variant={variant}
                                size={size}
                                className={className}
                            >
                                <Icon className="h-4 w-4" />
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            variant={variant}
                            size={size}
                            className={className}
                            onClick={onClick}
                        >
                            <Icon className="h-4 w-4" />
                        </Button>
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default IconButtonWithTooltip;
