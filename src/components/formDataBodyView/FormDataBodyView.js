import React, { useContext, useEffect, useRef, useState } from "react";
import { HttpRequestContext } from "../../context/HttpRequest";
import "./formDataBodyView.css";

const BinaryInput = ({ handleBinaryFileValueChange, idx, item, refresh }) => {
  const inputRef = useRef(null);
  const [fileNameTOshow, setFileNameTOshow] = useState(
    item?.fieldValue?.name || "NO FILE CHOOSEN..."
  );
  console.log({ item }, "form input");
  useEffect(() => {
    setFileNameTOshow(item?.fieldValue?.name || "No File Choosen!..");
  }, [refresh, item]);
  return (
    <div style={{ flex: 1 }}>
      <input
        type="file"
        data-idx={idx}
        files={item?.fieldValue}
        onChange={handleBinaryFileValueChange}
        hidden
        ref={inputRef}
      />
      <button
        style={{
          border: "1px solid #fff",
          padding: "5px",
          borderRadius: "4px",
          fontSize: "0.6rem",
          margin: "0 8px 0 0",
        }}
        onClick={() => inputRef.current.click()}
      >
        CHOOSE FILE
      </button>
      <span
        style={{
          fontSize: "0.6rem",
          fontStyle: "italic",
        }}
      >
        {fileNameTOshow}
      </span>
    </div>
  );
};

const FormDataBodyView = () => {
  const [refresh, setRefresh] = useState(false);

  const { reqObj, updateReqObj } = useContext(HttpRequestContext);

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
      <section>
        <div className="formDataView-header">
          <h4>FormData (Normal)</h4>
          <div className="add-more-btn-box">
            <span onClick={handleAddMoreFormDataField}>Add More Field</span>
          </div>
        </div>

        {/* query params */}
        <div>
          {formDataRef.current.map((item, idx) => (
            <div key={idx} className="field">
              <div className="row">
                <input
                  type="text"
                  placeholder="field Key"
                  value={item?.fieldName}
                  data-idx={idx}
                  onChange={handleFileNameChange}
                />
                <input
                  type="text"
                  data-idx={idx}
                  placeholder="field Value"
                  value={item?.fieldValue}
                  onChange={handleFileValueChange}
                />
              </div>

              <div className="delete-btn__box">
                <span onClick={() => handleFormDataFieldDelete(idx)}>x</span>
              </div>
            </div>
          ))}
        </div>

        <hr
          style={{
            width: "100%",
            background: "#fff",
            height: "2px",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        />

        <div className="formDataView-header">
          <h4>FormData (Binary)</h4>
          <div className="add-more-btn-box">
            <span onClick={handleAddMoreBinaryFormDataField}>
              Add Binary Field
            </span>
          </div>
        </div>

        {formDataWithFilesRef.current.map((item, idx) => (
          <div key={idx} className="field">
            <div className="row">
              <input
                type="text"
                placeholder="field Key"
                data-idx={idx}
                value={item?.fieldName}
                onChange={handleBinaryFileNameChange}
              />
              <BinaryInput
                item={item}
                idx={idx}
                handleBinaryFileValueChange={handleBinaryFileValueChange}
                refresh={refresh}
              />
            </div>

            <div className="delete-btn__box">
              <span onClick={() => handleBinaryFormDataFieldDelete(idx)}>
                x
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default FormDataBodyView;
