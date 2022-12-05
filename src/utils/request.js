import axios from "axios";
import { message } from "antd";

/** 创建axios实例 */
const apiService = axios.create({
  baseURL: window.server.serverUrl,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const toFormData = (option) => {
  let formData = new FormData();
  for (let key in option) {
    formData.append(key, option[key]);
  }
  return formData;
};

/** 配置请求拦截器 */
apiService.interceptors.request.use(
  /** 配置config，config里面包含了请求头的设置 */
  (config) => {
    let token = localStorage.getItem("token");
    /** 如果token不空的话，设置到请求头中 */
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (err) => {
    message.error(err.message);
    return Promise.reject(err.messge);
  }
);
/** 配置响应拦截器 */
apiService.interceptors.response.use(
  (res) => {
    const result = res;
    const status = result.status;
    if (200 === status) {
      return Promise.resolve(result);
    } else {
      message.error(result.data.message);
      return Promise.reject(result);
    }
  },
  (err) => {
    if (err.response && err.response.data) {
      message.error(err.response.data.message);
    }
    return Promise.reject(err.messge);
  }
);

/** 统一定义axios请求方法格式，封装成一个函数 */
const axiosFn = {
  // get请求
  commonOnGet: (url, params) => {
    return apiService.get(url, params);
  },

  // post请求
  commonOnPost: (url, params, bFormData = false) => {
    if (bFormData) {
      params = toFormData(params);
    }
    return apiService.post(url, params);
  },

  // put请求
  commonOnPut: (url, params, bFormData = false) => {
    if (bFormData) {
      params = toFormData(params);
    }
    return apiService.put(url, params);
  },

  // delete请求
  commonOnDelete: (url, params) => {
    return apiService.delete(url, params);
  },

  // delete请求通过/id删除
  commonOnDeleteById: (url, id) => {
    return apiService.delete(url + "/" + id);
  },

  // 上传文件
  commonOnUpLoad: (url, params, bFormData = true) => {
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    if (bFormData) {
      params = toFormData(params);
    }
    return apiService.post(url, params, header);
  },
};

export default axiosFn;
