import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="animate-spin text-green-600" size={48} />
        </div>
    );
}
