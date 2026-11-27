import { Wordmark } from "@/components/ui/Wordmark";
export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Wordmark className="animate-pulse text-6xl text-midnight/70" />
    </div>
  );
}
