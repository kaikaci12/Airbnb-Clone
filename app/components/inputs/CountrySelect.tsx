"use client";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";
import Flag from "react-world-flags";
export type CountrySelectValue = {
  flag: string;
  label: string;
  latling: number[];
  region: string;
  value: string;
};
const { getAll } = useCountries();

interface CountrySelectProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <Flag code={option.value} className="w-5" />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
