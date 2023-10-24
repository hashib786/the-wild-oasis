import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type Props = {
  options: FilterI[];
};

const SortBy = ({ options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      type="white"
      value={currentParams}
    />
  );
};

export default SortBy;
