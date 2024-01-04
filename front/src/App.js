import React from "react";
import AsyncSelect from "react-select/async";

const MyComponent = () => {
  // Function to load options from the server using async/await
  const loadOptions = async (inputValue) => {
    if (inputValue.length < 2) return;
    try {
      const response = await fetch(`http://localhost:3001/api/artist/${inputValue}`);
      const res = await response.json();
      console.log(res);
      return res.data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };

  return (
    <div>
      <AsyncSelect loadOptions={loadOptions}  placeholder="Artist 1" />
      <AsyncSelect loadOptions={loadOptions}  placeholder="Artist 2" />
    </div>
  );
};

export default MyComponent;
