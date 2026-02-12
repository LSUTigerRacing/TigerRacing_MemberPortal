import { useState, type ReactElement } from "react";

import type { TRAPI } from "../../../shared/typings/api";
// import { api } from "@/lib/API";

export default function ProjectKanban (): ReactElement {
    const [data, setData] = useState<TRAPI.Project>();

    return (
        <div className="mt-18.75 px-8 py-4">
            <div className="flex">
                <div>
                    <h1 className="text-2xl font-semibold">{data.}</h1>
                    <span className="text-sm">{projectDescription}</span>
                </div>
            </div>
        </div>
    );
}
