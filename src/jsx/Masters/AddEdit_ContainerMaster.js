import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { API_WEB_URLS } from "../../constants/constAPI";
import { Fn_AddEditData } from "../../store/Functions";

const ContainerMasterSchema = Yup.object().shape({
  InspectionDate: Yup.date().required("Inspection Date is required"),
  ContainerNumber: Yup.string().required("Container Number is required"),
  ItemCode: Yup.string().required("Item Code is required"),
  ItemName: Yup.string().required("Item Name is required"),
  BatchCode: Yup.string().required("Batch Code is required"),
  Quantity: Yup.number().required("Quantity is required").positive().integer(),
  ALCode: Yup.string().required("AL Code is required"),
  ItemWidth: Yup.number().required("Item Width is required").positive(),
  ItemDepth: Yup.number().required("Item Depth is required").positive(),
  ItemHeight: Yup.number().required("Item Height is required").positive(),
  Picture: Yup.mixed(),
});

const AddEdit_ContainerMaster = () => {
  const [state, setState] = useState({
    id: 0,
    formData: {
      InspectionDate: "",
      ContainerNumber: "",
      ItemCode: "",
      ItemName: "",
      BatchCode: "",
      Quantity: "",
      ALCode: "",
      ItemWidth: "",
      ItemDepth: "",
      ItemHeight: "",
      Picture: null,
    },
    isProgress: true,
  });
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  
  const API_URL = `${API_WEB_URLS.MASTER}/0/token/Sales`
  const API_URL2 = `${API_WEB_URLS.MASTER}/0/token/State`
  const API_URL_SAVE = "ComponentMaster/0/token"
  const API_URL_EDIT = `${API_WEB_URLS.MASTER}/0/token/CustomerMasterEdit/Id`
  // Define variables for PageTitle props
  const activeMenu = "Validation";
  const motherMenu = "Form";
  const pageContent = "Validation";
  const cardTitle = "Vertical Forms with icon";

  const handleSubmit = async (values) => {
    try {
      console.log("Form Data:", values);
      const formData = new FormData()
      formData.append("InspectionDate", values.InspectionDate)
      formData.append("ContainerNumber", values.ContainerNumber)
      formData.append("ItemCode", values.ItemCode)
      formData.append("ItemName", values.ItemName)
      formData.append("Quantity", values.Quantity)
      formData.append("ALCode", values.ALCode)
      formData.append("ItemWidth", values.ItemWidth)
      formData.append("ItemDepth", values.ItemDepth)
      formData.append("ItemHeight", values.ItemHeight)
      formData.append("BatchCode", values.BatchCode)
      formData.append("UserID", 1)

     
      Fn_AddEditData(
        dispatch,
        setState,
        { arguList: { id: state.id, formData } },
        API_URL_SAVE,
        true,
        "memberid",
        navigate,
        "/CategoryMaster"
      )
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
                  validationSchema={ContainerMasterSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      handleSubmit(values); // Call the new handleSubmit function
                    //   alert(JSON.stringify(values, null, 2));
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
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Inspection Date *
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              name="InspectionDate"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.InspectionDate}
                            />
                            {errors.InspectionDate && (
                              <div className="text-danger">
                                {errors.InspectionDate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Container Number *
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="ContainerNumber"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ContainerNumber}
                            />
                            {errors.ContainerNumber && (
                              <div className="text-danger">
                                {errors.ContainerNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">Item Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ItemCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ItemCode}
                            />
                            {errors.ItemCode && (
                              <div className="text-danger">
                                {errors.ItemCode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">Item Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ItemName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ItemName}
                            />
                            {errors.ItemName && (
                              <div className="text-danger">
                                {errors.ItemName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">Batch Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="BatchCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.BatchCode}
                            />
                            {errors.BatchCode && (
                              <div className="text-danger">
                                {errors.BatchCode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">Quantity *</label>
                            <input
                              type="number"
                              className="form-control"
                              name="Quantity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.Quantity}
                            />
                            {errors.Quantity && (
                              <div className="text-danger">
                                {errors.Quantity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">AL Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ALCode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ALCode}
                            />
                            {errors.ALCode && (
                              <div className="text-danger">{errors.ALCode}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Item Width (cm) *
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="ItemWidth"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ItemWidth}
                            />
                            {errors.ItemWidth && (
                              <div className="text-danger">
                                {errors.ItemWidth}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Item Depth (cm) *
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="ItemDepth"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ItemDepth}
                            />
                            {errors.ItemDepth && (
                              <div className="text-danger">
                                {errors.ItemDepth}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="text-label">
                              Item Height (cm) *
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="ItemHeight"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ItemHeight}
                            />
                            {errors.ItemHeight && (
                              <div className="text-danger">
                                {errors.ItemHeight}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="text-label">Picture *</label>
                        <input
                          type="file"
                          className="form-control"
                          name="Picture"
                          onChange={(event) => {
                            setFieldValue("Picture", event.target.files[0]);
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.Picture && (
                          <div className="text-danger">{errors.Picture}</div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger light"
                      >
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

export default AddEdit_ContainerMaster;
