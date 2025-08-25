import DetailCard from "@/app/(detail)/_components/DetailCard";
import DetailCardCol from "@/app/(detail)/_components/DetailCardCol";

function Page() {
    return (
        <DetailCard title="Loading...">
            {new Array(2).fill(0).map((_, i) => (
                <DetailCardCol key={i} title="Loading...">
                    <div
                        className="text-gray-400 text-center flex items-center justify-center h-100 flex-1">
                        Loading...
                    </div>
                </DetailCardCol>
            ))}
        </DetailCard>
    );
}

export default Page;