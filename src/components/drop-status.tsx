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
  switch (status) {
    case "ENDED":
      return <span className={className}>ENDED</span>;
    case "LIVE":
      return (
        <span className={cn("flex items-center gap-2", className)}>
          <LiveIndicator />
          {status}
        </span>
      );
    case "UPCOMING":
      return (
        <span className={cn("flex items-center gap-2", className)}>
          <span className="min-w-14">START IN</span>
          <Countdown targetDate={startDate} />{" "}
        </span>
      );
  }
}
