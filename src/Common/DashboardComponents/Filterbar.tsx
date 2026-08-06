import { useState } from "react";
import filterIcon from "../../assets/image-assets/filter.png";
import FilterModal from "./FilterModal";

type FilterSection = {
  title: string;
  options: string[];
};

type FilterBarProps = {
  sections: FilterSection[];
  onFilterChange?: (filters: Record<string, string[]>) => void;
};

export default function FilterBar({
  sections,
  onFilterChange,
}: FilterBarProps) {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});


  const handleFilterClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  const handleCheckboxChange = (
    section: string,
    option: string
  ) => {

    const current = selectedFilters[section] || [];

    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];


    const newFilters = {
      ...selectedFilters,
      [section]: updated
    };


    setSelectedFilters(newFilters);

    onFilterChange?.(newFilters);
  };


  return (
    <div className="filter-container">

      <div className="filter-heading">
        Filter By
      </div>


      <div className="filter-content">

        {sections.map((section)=>(
          <div 
            className="filter-section"
            key={section.title}
          >

            <div className="filter-subheading">
              {section.title}
            </div>


            {
              section.options.map(option=>(

                <label 
                  key={option}
                  className="filter-checkbox"
                >

                  <input
                    type="checkbox"
                    checked={
                      selectedFilters[
                        section.title
                      ]?.includes(option) || false
                    }
                    onChange={()=> 
                      handleCheckboxChange(
                        section.title,
                        option
                      )
                    }
                  />

                  <span>
                    {option}
                  </span>

                </label>

              ))
            }


          </div>
        ))}

      </div>


      <button
        className="btn-filter"
        onClick={handleFilterClick}
      >

        <img
          src={filterIcon}
          className="filter-icon"
          alt="filter"
        />

        Filter

      </button>


      <FilterModal
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={()=>setAnchorEl(null)}
      />

    </div>
  );
}