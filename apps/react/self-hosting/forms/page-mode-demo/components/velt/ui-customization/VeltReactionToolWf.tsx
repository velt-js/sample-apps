"use client";

import { VeltReactionToolWireframe } from "@veltdev/react";
import { ReactionIcon } from './VeltIcons';

const VeltReactionToolWf = () => {
    return (
        <VeltReactionToolWireframe>
            <div className="privado-reaction-wrapper">
                <ReactionIcon />
            </div>
        </VeltReactionToolWireframe>
    );
};

export default VeltReactionToolWf;
