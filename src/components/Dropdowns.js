import Select from "react-select";
import '../App.css';

const Dropdowns = ({label, options, selected, onChange, multiSelection, style}) => {
  const formattedOptions = options.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div style={{ margin: "1rem 0", ...style }}>
      <Select className = "select-custom"
        isMulti = {multiSelection}
        options={formattedOptions}
        value={formattedOptions.filter(o => selected.includes(o.value))}
        onChange={(selectedOptions) => (multiSelection)?
          onChange(selectedOptions.map((opt) => opt.value)) : onChange(selectedOptions.value)
        }
        placeholder={label}
      />
    </div>
  );
};

export default Dropdowns;
