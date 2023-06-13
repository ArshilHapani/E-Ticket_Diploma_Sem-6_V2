interface userTableFuncData {
  img: string;
  id: string;
  name: string;
  uname: string;
  email: string;
  mobile: string;
  dob: string;
  balance: number;
}
interface userTableButtonAnnotationTypes {
  row?: userTableFuncData;
  index: number;
  setOpen: Function;
  open: boolean;
  indexMeasure: number;
}

interface userTableDataTypes {
  data: {
    p_img: string;
    p_id: string;
    p_name: string;
    p_uname: string;
    p_email: string;
    p_no: string;
    p_dob: string;
    p_balance: number;
  };
}
interface functionEditUserModelProps {
  setOpen: Function;
  initialValues: {
    name: string;
    email: string;
    uname: string;
    balance: number;
    id: string;
  };
}

interface FileDownload {
  filename: string;
  url: string;
}

export type {
  userTableButtonAnnotationTypes,
  userTableFuncData,
  userTableDataTypes,
  functionEditUserModelProps,
  FileDownload,
};

export interface AddConductorFunctionProps {
  c_uname: string;
  c_pwd: string;
  c_name: string;
  c_email: string;
  c_dob: string;
}

export interface UserDetailsProps {
  p_id: string;
  p_uname: string;
  p_email: string;
  p_name: string;
  p_balance: number;
}

export interface BusStationDetailsProps {
  st_id: number;
  st_name: string;
  st_lat: number;
  st_long: number;
}
