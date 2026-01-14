import { VeltReactionToolWireframe } from "@veltdev/react";
import { Reactions } from "./Icons";

const VeltReactionToolWf = () => {
    return (
        <VeltReactionToolWireframe>
            <div className="oe--icon-button">
                <Reactions width={17.5} height={17.5} />
            </div>
        </VeltReactionToolWireframe>
    )
}

export default VeltReactionToolWf;