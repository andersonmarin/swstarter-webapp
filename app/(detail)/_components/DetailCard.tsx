import Link from "next/link";
import React, {ReactNode} from "react";

function DetailCard({title, children}: {
    title: ReactNode,
    children: ReactNode,
}) {
    return (
        <div
            className="bg-white flex flex-col gap-5 p-4 rounded-lg border border-gray-300 w-2xl shadow-md">
            <div className="font-semibold">{title}</div>
            <div className="flex flex-row gap-10 flex-1">
                {children}
            </div>
            <div>
                <Link href="/"
                      className="bg-green-600 px-8 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300 inline-flex items-center justify-center">
                    Back to search
                </Link>
            </div>
        </div>
    );
}

export default DetailCard;
