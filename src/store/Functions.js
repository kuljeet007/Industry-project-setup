// functions.js
// import toastr from "toastr";
// import "toastr/build/toastr.css";
import { callAdd_Data, callAdd_Data_Multipart, callDelete_Data, callEdit_Data, callEdit_Data_Multipart, callFill_GridData, callGet_Data } from './common-actions';



export const convertToArray = (str) => {
    return str.split(',');  
  };

export const Fn_FillListData = (dispatch, setState, gridName, apiURL, setKey, setSearchKeyArray) => { 
    return new Promise((resolve, reject) => {
        const request = {
            apiURL: apiURL,
            callback: (response) => {
                if (response && response.status === 200 && response.data) {
                   
                    const dataList = response.data.dataList;
                    
                    if (gridName === "gridDataSearch") {
                        const firstObject = dataList[0];
                        const keysArray = Object.keys(firstObject).filter((item) => item !== 'Id');
                        setSearchKeyArray(keysArray);
                        setState(dataList);
                        setKey(keysArray[0]);
                    } else if (gridName === "productData" || gridName === "OtherDataScore") {
                        setState(prevState => ({
                            ...prevState,
                            [gridName]: dataList,
                            rows: [Object.keys(dataList[0])],
                            isProgress: false
                        }));
                    } else if (gridName == 'gridData' || gridName=='rows') {
                        setState(dataList);
                    } else if (gridName == 'FileNo') {
                        setState(prevState => ({
                            ...prevState,
                            ['FileNo']: dataList[0].FileNo
                        }));
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            [gridName]: dataList,
                            isProgress: false
                        }));
                    }
                    
                 //   showToastWithCloseButton("success", "Data loaded successfully");
                    resolve(dataList); // Resolve the promise with the response data
                } else {
                   // showToastWithCloseButton("error", "Error loading data");
                    reject(new Error("Error loading data")); // Reject the promise if there's an error
                }
            }
        };

        dispatch(callFill_GridData(request));
    });
};


export const Fn_DisplayData = (dispatch, setState, id, apiURL, gridname) => {
    return new Promise((resolve, reject) => {
        const request = {
            id: id,
            apiURL: apiURL,
            callback: response => {
                if (response && response.status === 200 && response.data) {
                    setState(prevState => ({
                        ...prevState,
                        formData: response.data.dataList[0],
                    }));
                //    showToastWithCloseButton("success", "Data displayed successfully");
                    resolve(response.data); // Resolve the Promise with the data
                } else {
                //    showToastWithCloseButton("error", "Error displaying data");
                    reject(new Error("Error displaying data")); // Reject the Promise with an error
                }
            },
        };
        dispatch(callGet_Data(request));
    });
};

export const Fn_DeleteData = (dispatch, setState, id, apiURL, apiURL_Display) => {
    return new Promise((resolve, reject) => {
      const request = {
        id: id,
        apiURL: apiURL,
        callback: response => {
          if (response && response.status === 200) {
            setState(prevState => ({
              ...prevState,
              confirm_alert: false,
              success_dlg: true,
              dynamic_title: "Deleted",
              dynamic_description: "Selected data has been deleted.",
            }));
          //  showToastWithCloseButton("success", "Data deleted successfully");
  
            // If apiURL_Display is provided, refresh the list
            if (apiURL_Display) {
            //   Fn_FillListData(dispatch, setState, "gridData", apiURL_Display);
            //   Fn_FillListData(dispatch, setState, "Invoice", apiURL_Display);
            window.location.reload();
            }
  
            resolve(response); // Resolve the Promise with the response
          } else {
            setState(prevState => ({
              ...prevState,
              confirm_alert: false,
              dynamic_title: "Error",
              dynamic_description: "Some error occurred while deleting data.",
            }));
           // showToastWithCloseButton( "error", "Some error occurred while deleting data"  );
            reject(new Error("Error deleting data")); // Reject the Promise with an error
          }
        },
      };
  
      // Dispatch the delete action
      dispatch(callDelete_Data(request));
    });
  };

  
export const Fn_AddEditData = (
    dispatch,
    setState,
    data,
    apiURL,
    isMultiPart = false,
    getid,
    navigate,
    forward
) => {
    console.log('in function')
    return new Promise((resolve, reject) => {
        const { arguList } = data;
        const request = {
            arguList: arguList,
            apiURL: apiURL,
            callback: response => {
                if (response && response.status === 200) {
                    console.log('arguList',arguList);
                    if (getid === 'certificate') {
                        if (response.data.response[0].Id > 0) {
                            setState(response.data.response[0].RegNo);
                           // showToastWithCloseButton("success", "File downloaded successfully");
                        } else {
                           // showToastWithCloseButton("error", "Duplicate mobile number");
                        }
                    }else if(response.data.response && response.data.response[0].Id>0){
                       setState(true);
                        localStorage.setItem("YesBank", JSON.stringify(response.data.response[0]));
                        
                    }else if(getid=='TenderH'){
                    
                        
                        setState(prevState => ({
                            ...prevState,
                            F_TenderFileMasterH : response.data.data.id
                        }));
                        
                    }
                    
                    if (arguList.id === 0 ) {
                        
                     //   showToastWithCloseButton("success", "Data added successfully");
                        resolve(response.data.data);
                        navigate(forward, { state: { Id: 0 } });
                    }  else {
                     //   showToastWithCloseButton("success", "Data updated successfully");
                        resolve(response.data.data);
                        navigate(forward, { state: { Id: 0 } });
                    }
                } else {
                    if (arguList.id === 0) {
                       // showToastWithCloseButton("error", "Error adding data");
                        reject('Some error occurred while adding data');
                    } else {
                      //  showToastWithCloseButton("error", "Error updating data");
                        reject('Some error occurred while updating data');
                    }
                }
            },
        };

        if (arguList.id == 0) {
         
            if (isMultiPart) dispatch(callAdd_Data_Multipart(request));
            else callAdd_Data(request);
        } else {
            if (isMultiPart) dispatch(callEdit_Data_Multipart(request));
            else callEdit_Data(request);
        }
    });
};

export const Fn_GetReport = async (dispatch, setState, gridName, apiURL, data, isMultiPart = false, index, Arr, name) => {
    return new Promise((resolve, reject) => {
        const { arguList } = data;
        const request = {
            arguList: arguList,
            apiURL: apiURL,
            callback: (response) => {
                if (response && response.status === 200 && response.data) {
                    const responseData = response.data.response;

                    if (gridName === "productData" || gridName === "productDataAssest") {
                        setState(prevState => ({
                            ...prevState,
                            [gridName]: responseData,
                            rows: [Object.keys(responseData[0])],
                            isProgress: false
                        }));
                    } else if (gridName === 'tenderData') {
                        setState(responseData);
                    } else if (gridName === 'ItemArray') {
                        // Corrected update logic for 'ItemArray'
                        if (Arr[index]) {
                            Arr[index] = responseData;
                        } else {
                            Arr.push(responseData);
                        }
                        setState(prevState => ({
                            ...prevState,
                            [name]: Arr,
                            isProgress: false
                        }));
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            [gridName]: responseData,
                            isProgress: false
                        }));
                    }

                  //  showToastWithCloseButton("success", "Report generated successfully");
                    resolve(responseData); // Resolve the promise with the response data
                } else {
                   // showToastWithCloseButton("warning", "Data not found");
                    reject(new Error("Data not found")); // Reject the promise
                }
            }
        };

        dispatch(callAdd_Data_Multipart(request));
    });
};


// export function showToastWithCloseButton(toastType, message) {
//     toastr.options = {
//         closeButton: true,
//         preventDuplicates: true,
//         newestOnTop: true,
//         progressBar: true,
//         timeOut: 2000,
//     };

//     if (toastType === "success") {
//         toastr.success(message);
//     } else if (toastType === "error") {
//         toastr.error(message);
//     } else if (toastType === "warning") {
//         toastr.warning(message);
//     }
// }
