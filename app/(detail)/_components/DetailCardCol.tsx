import React, {ReactNode} from "react";

function DetailCardCol({title, children}: { title: string, children: ReactNode }) {
    return (
        <div className="flex-1">
            <div className="font-semibold border-b border-gray-300 pb-2">{title}</div>
            <div className="py-2 overflow-y-auto h-100 flex flex-col gap-1">
                {children}
            </div>
        </div>
    );
}

export default DetailCardCol;