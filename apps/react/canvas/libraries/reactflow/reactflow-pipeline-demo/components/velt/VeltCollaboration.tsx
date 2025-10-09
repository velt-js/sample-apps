"use client";
import { VeltInitializeUser } from "./VeltInitializeUser";
import { VeltInitializeDocument } from "./VeltInitializeDocument";
import { VeltCustomization } from "./ui-customization/VeltCustomization";
import { VeltTools } from "./VeltTools";

export function VeltCollaboration() {
    return (
        <>
            <VeltInitializeUser />
            <VeltInitializeDocument />
            <VeltCustomization />
        </>
    );
}
