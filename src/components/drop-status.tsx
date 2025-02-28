import Countdown from "@/components/countdown";
import LiveIndicator from "@/components/live-indicator";
import { cn } from "@/lib/utils";

export default function DropStatus({
  status,
  startDate,
  className,
}: {
  status: "ENDED" | "LIVE" | "UPCOMING";
  startDate: Date;
  className?: string;
}) {
  if (status === "ENDED") return <span className={className}>ENDED</span>;
  if (status === "LIVE")
    return (
      <span className={cn("flex gap-2 items-center", className)}>
        <LiveIndicator />
        {status}
      </span>
    );
  if (status === "UPCOMING")
    return (
      <span className={cn("flex gap-2 items-center", className)}>
        START IN <Countdown targetDate={startDate} />{" "}
      </span>
    );
}
