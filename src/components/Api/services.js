import { callAPI } from "./apiCalls";

export const signup = async (data) => {
  try {
    return await callAPI("signup", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};

export const signin = async (data) => {
  try {
    return await callAPI("signin", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const activate = async (data) => {
  try {
    return await callAPI("email-activate", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};

export const getCompany = async (data) => {
  try {
    return await callAPI("getCompany", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const getInvoices = async (data) => {
  try {
    return await callAPI("getInvoices","", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const getQuotations = async (data) => {
  try {
    return await callAPI("getQuotations","", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const createCompany = async (data) => {
  try {
    return await callAPI("createCompany", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const getCustomers = async (data) => {
  try {
    return await callAPI("getCustomers", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const createCustomers = async (data) => {
  console.log("new customerrrrr dataaaaaaaaaaaaa", data);
  try {
    return await callAPI("createCustomers", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const updateCustomers = async (data) => {
  try {
    return await callAPI("updateCustomers", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const getProducts = async (data) => {
  try {
    return await callAPI("getProducts", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }

};
export const createProducts = async (data) => {
  try {
    return await callAPI("createProducts", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const updateProducts = async (data) => {
  try {
    return await callAPI("updateProducts", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const uploadLogo = async (data) => {
  try {
    return await callAPI("uploadLogo", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const updateCompany = async (data) => {
  try {
    return await callAPI("updateCompany", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const createInvoice = async (data) => {
  try {
    return await callAPI("createInvoice", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const createQuotation = async (data) => {
  try {
    console.log('quotatinnnnnn dataaa ',data);
    return await callAPI("createQuotation","", data, "POST");
  } catch (ex) {
    console.log('quotatinnnnnn errroooor ',ex);
    return "Error";
  }
};
export const getInvoicesById = async (data) => {
  try {
    return await callAPI("getInvoicesById", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};

export const getQuotationsById = async (data) => {
  try {
    return await callAPI("getQuotationsById", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};
export const markAsPaid = async (data) => {
  try {
    return await callAPI("markAsPaid", "", data, "POST");
  } catch (ex) {
    console.log(ex);
    return "Error";
  }
};