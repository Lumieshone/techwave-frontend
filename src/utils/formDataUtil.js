export function toFormData(obj) {
    let formData = new FormData();
    for (let key in obj) {
      formData.append(key, obj[key]);
    }
    return formData;
  }

//   使用
//   import { toFormData } from '@/utils/formDataUtil';
//   const formData = toFormData(obj);
