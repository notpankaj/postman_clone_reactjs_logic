import React, { useContext, useEffect, useRef, useState } from "react";
import { HttpRequestContext } from "../../context/HttpRequest";

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
      <span>{fileNameTOshow}</span>
    </>
  );
};

const FormDataBodyView = () => {
  const [refresh, setRefresh] = useState(false);

  const { reqObj, updateReqObj } = useContext(HttpRequestContext);

  const handleSubmit = () => {
    // console.log(formDataRef);
    // console.log(formDataWithFilesRef);
    console.log(reqObj);
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

      updateReqObj(reqObj, {
        binaryData: formDataWithFilesRef.current,
      });
      setRefresh(!refresh);
    }
    if (type === "name") {
      let prevFormData = formDataWithFilesRef.current;
      prevFormData[data.index] = {
        ...prevFormData[data.index],
        fieldName: data.fieldName,
      };
      formDataWithFilesRef.current = prevFormData;
      updateReqObj(reqObj, {
        binaryData: formDataWithFilesRef.current,
      });

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
      updateReqObj(reqObj, {
        formData: formDataRef.current,
      });
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
      updateReqObj(reqObj, {
        formData: formDataRef.current,
      });
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
    updateReqObj(reqObj, {
      formData: formDataRef.current,
    });
    setRefresh(!refresh);
  };

  const handleAddMoreBinaryFormDataField = () => {
    const prevFormData = formDataWithFilesRef.current;
    prevFormData.push({
      fieldName: "",
      fieldValue: "",
    });
    formDataWithFilesRef.current = prevFormData;
    updateReqObj(reqObj, {
      binaryData: formDataWithFilesRef.current,
    });
    setRefresh(!refresh);
  };

  const handleFormDataFieldDelete = (itemIdx) => {
    const prevState = formDataRef.current;
    formDataRef.current = prevState.filter((item, idx) => idx !== itemIdx);
    updateReqObj(reqObj, {
      formData: formDataRef.current,
    });
    setRefresh(!refresh);
  };
  const handleBinaryFormDataFieldDelete = (itemIdx) => {
    const prevState = formDataWithFilesRef.current;
    formDataWithFilesRef.current = prevState.filter(
      (item, idx) => idx !== itemIdx
    );
    updateReqObj(reqObj, {
      binaryData: formDataWithFilesRef.current,
    });
    setRefresh(!refresh);
  };

  return (
    <>
      <>
        <div>
          <button onClick={handleAddMoreFormDataField}> formData ADD</button>
          <br />
          <button onClick={handleAddMoreBinaryFormDataField}>
            binnary ADD
          </button>
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

        <hr
          style={{
            width: "100%",
            background: "#fff",
            height: "2px",
            margin: "50px 0",
          }}
        />
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
    </>
  );
};

export default FormDataBodyView;
