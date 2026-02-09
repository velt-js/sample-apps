"use client";

import { VeltAutocompleteOptionWireframe } from "@veltdev/react";
import { CheckIcon } from './VeltIcons';
import { AutocompleteOptionWrapper } from './styled';

const VeltAutocompleteOptionWf = () => {
    return (
        <VeltAutocompleteOptionWireframe>
            <AutocompleteOptionWrapper className="privado-autocomplete-option-wrapper">
                <VeltAutocompleteOptionWireframe.Icon />
                <VeltAutocompleteOptionWireframe.Name />
                <CheckIcon />
            </AutocompleteOptionWrapper>
        </VeltAutocompleteOptionWireframe>
    );
};

export default VeltAutocompleteOptionWf;
