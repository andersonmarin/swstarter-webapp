import DetailCard from "@/app/(detail)/_components/DetailCard";
import DetailCardCol from "@/app/(detail)/_components/DetailCardCol";

function Page() {
    return (
        <DetailCard title={<div className="rounded bg-gray-100 animate-pulse h-6 w-1/2"/>}>
            {new Array(2).fill(0).map((_, i) => (
                <DetailCardCol key={i} title={<div className="rounded bg-gray-100 animate-pulse h-6 w-1/2"/>}>
                    {i === 0
                        ? (
                            <div className="flex flex-col gap-1">
                                {new Array(6).fill(0).map((_, j) => (
                                    <div key={j} className="rounded bg-gray-100 animate-pulse h-6"/>
                                ))}
                            </div>
                        )
                        : (
                            <div className="grid grid-cols-4 gap-1">
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-2 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-2 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-3 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-2 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-3 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-1 rounded bg-gray-100 animate-pulse h-6"/>
                                <div className="col-span-2 rounded bg-gray-100 animate-pulse h-6"/>
                            </div>
                        )}
                </DetailCardCol>
            ))}
        </DetailCard>
    );
}

export default Page;