import * as MemoTypes from '../types/MemoTypes';
import { API_ROUTES } from '../config/MemoConfig';
import { httpRequest } from '../../helpers/index';





export const setIsLoading = (value) => ({
  type: MemoTypes.LOADING,
  payload: value,
});

export const getAllMemo = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllMemo.route,
      method: API_ROUTES?.getAllMemo?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.GET_ALL_MEMO,
        payload: res?.data?.memos,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
}; 


export const getSingleMemo = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getSingleMemo.route + id,
      method: API_ROUTES?.getSingleMemo?.method,
      needToken: true,
    });

    console.log("response of server",res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.GET_SINGLE_MEMO,
        payload: res?.data?.memo,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createMemo = (data, setOpen, setError, setErrorMessage, isFormData) => async (dispatch) => {
                            
 try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createMemo?.route,
      method: API_ROUTES?.createMemo?.method,
      needToken: true,
      data,
      header: {
         
             "Content-Type": "multipart/form-data",
          }
        ,
      isFormData
      // body: data,
    });


  ///
  /*
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createMemo?.route,
      method: API_ROUTES?.createMemo?.method,
      needToken: true,
      data,
      header: isFormData
        ? {
            'Access-Control-Allow-Origin': '*',
            mode: 'no-cors',
            'Content-Type': 'multipart/form-data',
          }
        : false,
      isFormData,
      // body: data,
    });
*/
   // console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.CREATE_MEMO,
        payload: res?.data,
      });
      setOpen(true);
    }
  } catch (error) {
      dispatch(setIsLoading(false));
    console.log(error);
    dispatch(setIsLoading(false));
    setError(true);
   // setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const updateMemo =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage, isFormData) => async (dispatch) => {
  //  console.log(data);
 //   console.log(isFormData);
    // const finalData = {
    //   ...data,
    //   completion: 'true',
    // };
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.updateMemo?.route,
        method: API_ROUTES?.updateMemo?.method,
        needToken: true,
        data,
        header: isFormData
          ? {
              'Access-Control-Allow-Origin': '*',
              mode: 'no-cors',
              'Content-Type': 'multipart/form-data',
            }
          : false,
        isFormData,
        // body: data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: MemoTypes?.UPDATE_MEMO,
          payload: res?.data,
        });
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const deleteMemo =
  (data, setReloadAllData,setOpen, setError, setErrorMessage, setSuccessMessage, isFormData) => async (dispatch) => {
  //  console.log(data);
 //   console.log(isFormData);
    // const finalData = {
    //   ...data,
    //   completion: 'true',
    // };
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.sendDeleteAction?.route,
        method: API_ROUTES?.sendDeleteAction?.method,
        needToken: true,
        data:{_id:data},
        header: isFormData
          ? {
              'Access-Control-Allow-Origin': '*',
              mode: 'no-cors',
              'Content-Type': 'multipart/form-data',
            }
          : false,
        isFormData,
        // body: data,
      });

     // console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch(getAllMemo());
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
    //  console.log(error);
      dispatch(setIsLoading(false));
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const updateMemoStatus =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage, isFormData) => async (dispatch) => {
   // console.log(data);
   // console.log(isFormData);
    
   
    // const finalData = {
    //   ...data,
    //   completion: 'true',
    // };
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.updateMemoStatus?.route,
        method: API_ROUTES?.updateMemo?.method,
        needToken: true,
        data,
        header: isFormData
          ? {
              'Access-Control-Allow-Origin': '*',
              mode: 'no-cors',
              'Content-Type': 'multipart/form-data',
            }
          : false,
        isFormData,
        // body: data,
      });

     // console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: MemoTypes?.UPDATE_MEMO,
          payload: res?.data,
        });
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
     // console.log(error);
      dispatch(setIsLoading(false));
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const sendMemoActionRedo = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.sendMemoAction?.route,
      method: API_ROUTES?.sendMemoAction?.method,
      needToken: true,
      data,
      // body: data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.MEMO_ACTION,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const sendMemoAction = (data) => async (dispatch) => {
 // console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.sendMemoAction?.route,
      method: API_ROUTES?.sendMemoAction?.method,
      needToken: true,
      data,
      // body: data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.MEMO_ACTION,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const sendMemoActionRedoAgain = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.sendMemoAction?.route,
      method: API_ROUTES?.sendMemoAction?.method,
      needToken: true,
      data,
      // body: data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MemoTypes?.MEMO_ACTION,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};