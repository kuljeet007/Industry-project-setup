import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";

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

  // Define variables for PageTitle props
  const activeMenu = "Validation";
  const motherMenu = "Form";
  const pageContent = "Validation";
  const cardTitle = "Form with Name Field";

  const handleSubmit = async (values) => {
    try {
      console.log("Form Data:", values);
      // Add your API call here
      // await apiCall(values); // Example API call
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
