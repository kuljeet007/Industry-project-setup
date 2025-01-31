import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { useDispatch } from "react-redux";
import { API_WEB_URLS } from "../../constants/constAPI";
import { Fn_AddEditData, Fn_DisplayData } from "../../store/Functions";
import readXlsxFile from "read-excel-file";

const AddEdit_MachineComponentMap = () => {
  const [state, setState] = useState({
    id: 0,
    excelData: null,
    isProgress: true,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL_EDIT = `${API_WEB_URLS.MASTER}/0/token/CustomerMasterEdit/Id`;
  const API_URL_SAVE = "ComponentMaster/0/token";

  useEffect(() => {
    const Id = (location.state && location.state.Id) || 0;
    if (Id > 0) {
      setState((prevState) => ({ ...prevState, id: Id }));
      Fn_DisplayData(dispatch, setState, Id, API_URL_EDIT);
    }
  }, [dispatch, location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submitting Excel Data:", state.excelData);
      const formData = new FormData();
      formData.append("excelData", JSON.stringify(state.excelData));

      Fn_AddEditData(
        dispatch,
        setState,
        { arguList: { id: state.id, formData } },
        API_URL_SAVE,
        true,
        "memberid",
        navigate,
        "/ComponentMaster"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Please upload a valid Excel (.xlsx) file.");
      return;
    }

    readXlsxFile(file)
      .then((rows) => {
        console.log("Parsed Excel Data:", rows);
        setState((prevState) => ({ ...prevState, excelData: rows }));
      })
      .catch((error) => {
        console.error("Error reading Excel file:", error);
        alert("Error reading the Excel file. Please try again.");
      });
  };

  return (
    <Fragment>
      <PageTitle
        activeMenu="Validation"
        motherMenu="Form"
        pageContent="Validation"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Upload Excel File</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="text-label">Upload Excel File</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".xlsx"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary me-2">
                    Submit
                  </button>
                  <button type="button" className="btn btn-danger light">
                    Cancel
                  </button>
                </form>

                {/* Display Uploaded Excel Data */}
                {state.excelData && (
                  <div className="mt-4">
                    <h5>Uploaded Excel Data:</h5>
                    <div
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {state.excelData[0].map((col, index) => (
                              <th key={index}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {state.excelData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddEdit_MachineComponentMap;
