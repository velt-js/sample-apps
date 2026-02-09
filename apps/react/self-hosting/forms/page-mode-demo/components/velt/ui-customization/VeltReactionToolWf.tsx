"use client";

import { VeltReactionToolWireframe } from "@veltdev/react";
import { ReactionIcon } from './VeltIcons';
import { ReactionWrapper } from './styled';

const VeltReactionToolWf = () => {
    return (
        <VeltReactionToolWireframe>
            <ReactionWrapper className="privado-reaction-wrapper">
                <ReactionIcon />
            </ReactionWrapper>
        </VeltReactionToolWireframe>
    );
};

export default VeltReactionToolWf;
