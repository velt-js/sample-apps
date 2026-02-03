"use client";

import { VeltAutocompleteOptionWireframe } from "@veltdev/react";
import { CheckIcon } from './VeltIcons';

const VeltAutocompleteOptionWf = () => {
    return (
        <VeltAutocompleteOptionWireframe>
            <div className="privado-autocomplete-option-wrapper">
                <VeltAutocompleteOptionWireframe.Icon />
                <VeltAutocompleteOptionWireframe.Name />
                <CheckIcon />
            </div>
        </VeltAutocompleteOptionWireframe>
    );
};

export default VeltAutocompleteOptionWf;
