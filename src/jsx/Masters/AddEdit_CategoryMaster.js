import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { Fn_AddEditData } from "../../store/Functions";
import { useDispatch } from "react-redux";
import { API_WEB_URLS } from "../../constants/constAPI";

const NameSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
});

const AddEdit_CategoryMaster = () => {
  const [state, setState] = useState({
    id: 0,
    formData: {
      Name: "",
    },
    isProgress: true,
  });
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  
  const API_URL = `${API_WEB_URLS.MASTER}/0/token/CategoryMaster`
  const API_URL_SAVE = "CategoryMaster/0/token"
  const API_URL_EDIT = `${API_WEB_URLS.MASTER}/0/token/CustomerMasterEdit/Id`
  // Define variables for PageTitle props
  const activeMenu = "Masters";
  const motherMenu = "Masters";
  const pageContent = "Masters";
  const cardTitle = "Form with Name Field";

  const handleSubmit = async (values) => {
    try {
      console.log("Form Data:", values);
      // const obj = JSON.parse(localStorage.getItem("authUser"))
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <Fragment>
      <PageTitle
        activeMenu={activeMenu}
        motherMenu={motherMenu}
        pageContent={pageContent}
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{cardTitle}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Formik
                  initialValues={state.formData}
                  validationSchema={NameSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      handleSubmit(values);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label className="text-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.Name}
                        />
                        {errors.Name && (
                          <div className="text-danger">{errors.Name}</div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                      <button type="button" className="btn btn-danger light">
                        Cancel
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddEdit_CategoryMaster;
