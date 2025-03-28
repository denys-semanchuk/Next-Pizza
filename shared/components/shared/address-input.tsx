"use client";
import React, { useRef } from "react";
import Geosuggest, { Suggest } from "@ubilabs/react-geosuggest";

interface Props {
  onChange?: (value?: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const AdressInput: React.FC<Props> = ({
  onChange,
  placeholder = "Enter your address",
  initialValue = "",
}) => {
  const geosuggestRef = useRef<Geosuggest>(null);

  const handleSuggestSelect = (suggest: Suggest | null) => {
    if (suggest) {
      onChange?.(suggest.label || suggest.description);

      if (geosuggestRef.current) {
        geosuggestRef.current.hideSuggests();
        geosuggestRef.current.blur();
        console.log('dick')

        geosuggestRef.current.update(suggest.label || suggest.description);
      }
    }
  };

  return (
    <div className="relative w-full">
      <Geosuggest
        ref={geosuggestRef}
        placeholder={placeholder}
        initialValue={initialValue}
        onSuggestSelect={handleSuggestSelect}
        onChange={(value) => onChange?.(value)}
        onBlur={() => {
          geosuggestRef.current?.blur();
        }}
        autoComplete="off"
        country={["us"]}
        minLength={3}
        queryDelay={300}
        inputClassName="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        suggestsClassName="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        suggestItemClassName="px-4 py-2 cursor-pointer hover:bg-gray-100"
        suggestItemActiveClassName="bg-primary text-white"
        style={{
          input: {
            width: "100%",
          },
          suggests: {
            marginTop: "4px",
          },
        }}
      />
    </div>
  );
};
