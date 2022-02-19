import React, { useEffect, useRef, useState } from "react";

const BinaryInput = ({ handleBinaryFileValueChange, idx, item, refresh }) => {
  const inputRef = useRef(null);
  const [fileNameTOshow, setFileNameTOshow] = useState(
    item?.fieldValue?.name || "NO FILE CHOOSEN..."
  );
  console.log({ item }, "form input");
  useEffect(() => {
    setFileNameTOshow(item?.fieldValue?.name || "No");
  }, [refresh, item]);
  return (
    <>
      <input
        type="file"
        data-idx={idx}
        files={item?.fieldValue}
        onChange={handleBinaryFileValueChange}
        hidden
        ref={inputRef}
      />
      <button onClick={() => inputRef.current.click()}>CHOOSE FILE</button>
      <span>
        {/* {inputRef.current?.value
          ? inputRef.current?.value
          : "NO FILE CHOOSEN..."} */}
        {fileNameTOshow}
      </span>
    </>
  );
};

const Body = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = () => {
    console.log(formDataRef.current);
    console.log(formDataWithFilesRef);
  };

  const formDataRef = useRef([
    {
      fieldName: "",
      fieldValue: "",
    },
  ]);

  const formDataWithFilesRef = useRef([
    {
      fieldName: "",
      fieldValue: "",
    },
  ]);

  const handleFileNameChange = (e) => {
    const payload = {
      fieldName: e.target.value,
      index: e.target.dataset.idx,
    };
    console.log(payload);
    updateFormDataRef("name", payload);
  };
  const handleBinaryFileNameChange = (e) => {
    const payload = {
      fieldName: e.target.value,
      index: e.target.dataset.idx,
    };
    updateBinaryFormDataRef("name", payload);
  };
  const handleFileValueChange = (e) => {
    if (e.target.type === "file") {
      const payload = {
        fieldValue: e.target.files[0],
        index: e.target.dataset.idx,
      };
      updateFormDataRef("value", payload);
    } else {
      const payload = {
        fieldValue: e.target.value,
        index: e.target.dataset.idx,
      };
      updateFormDataRef("value", payload);
    }
  };
  const handleBinaryFileValueChange = (e) => {
    console.log(e);
    if (e.target.type === "file") {
      const payload = {
        fieldValue: e.target.files[0],
        index: e.target.dataset.idx,
      };
      updateBinaryFormDataRef("value", payload);
    }
  };

  const updateBinaryFormDataRef = (type, data) => {
    if (type === "value") {
      let prevFormData = formDataWithFilesRef.current;
      prevFormData[data.index] = {
        ...prevFormData[data.index],
        fieldValue: data.fieldValue,
      };
      formDataWithFilesRef.current = prevFormData;
      setRefresh(!refresh);
    }
    if (type === "name") {
      // console.log(formDataWithFilesRef.current[data.index]);
      let prevFormData = formDataWithFilesRef.current;
      prevFormData[data.index] = {
        ...prevFormData[data.index],
        fieldName: data.fieldName,
      };
      formDataWithFilesRef.current = prevFormData;
      setRefresh(!refresh);
    }
  };
  const updateFormDataRef = (type, data) => {
    if (type === "value") {
      let prevFormData = formDataRef.current;
      prevFormData[data.index] = {
        ...prevFormData[data.index],
        fieldValue: data.fieldValue,
      };
      formDataRef.current = prevFormData;
      setRefresh(!refresh);
    }
    if (type === "name") {
      console.log(formDataRef.current[data.index]);
      let prevFormData = formDataRef.current;
      prevFormData[data.index] = {
        ...prevFormData[data.index],
        fieldName: data.fieldName,
      };
      formDataRef.current = prevFormData;
      setRefresh(!refresh);
    }
  };

  const handleAddMoreFormDataField = () => {
    const prevFormData = formDataRef.current;
    prevFormData.push({
      fieldName: "",
      fieldValue: "",
    });
    formDataRef.current = prevFormData;
    setRefresh(!refresh);
  };

  const handleAddMoreBinaryFormDataField = () => {
    const prevFormData = formDataWithFilesRef.current;
    prevFormData.push({
      fieldName: "",
      fieldValue: "",
    });
    formDataWithFilesRef.current = prevFormData;
    setRefresh(!refresh);
  };

  const handleFormDataFieldDelete = (itemIdx) => {
    const prevState = formDataRef.current;
    formDataRef.current = prevState.filter((item, idx) => idx !== itemIdx);

    setRefresh(!refresh);
  };
  const handleBinaryFormDataFieldDelete = (itemIdx) => {
    const prevState = formDataWithFilesRef.current;
    formDataWithFilesRef.current = prevState.filter(
      (item, idx) => idx !== itemIdx
    );
    setRefresh(!refresh);
  };

  return (
    <>
      <div>
        <button onClick={handleAddMoreFormDataField}> formData ADD</button>
        <br />
        <button onClick={handleAddMoreBinaryFormDataField}>binnary ADD</button>
        <br />
      </div>
      {/* query params */}
      <div>
        {formDataRef.current.map((item, idx) => (
          <div key={idx}>
            <span>FieldName</span>
            <input
              type="text"
              value={item?.fieldName}
              data-idx={idx}
              onChange={handleFileNameChange}
            />
            <span>Value</span>
            <input
              type="text"
              data-idx={idx}
              value={item?.fieldValue}
              onChange={handleFileValueChange}
            />
            <button onClick={() => handleFormDataFieldDelete(idx)}>
              Delete
            </button>
          </div>
        ))}
        <button onClick={handleSubmit}>submit</button>
      </div>

      <hr />
      {formDataWithFilesRef.current.map((item, idx) => (
        <div key={idx}>
          <div>
            <span>FieldName</span>
            <input
              type="text"
              data-idx={idx}
              value={item?.fieldName}
              onChange={handleBinaryFileNameChange}
            />
            <span>Value</span>
            <BinaryInput
              item={item}
              idx={idx}
              handleBinaryFileValueChange={handleBinaryFileValueChange}
              refresh={refresh}
            />
          </div>

          <button onClick={() => handleBinaryFormDataFieldDelete(idx)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Body;
