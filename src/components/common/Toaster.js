import { toast } from 'react-toastify';

export default function Toaster(message,type) {
    const successNotify = (v) => toast.success(v, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const errorNotify = (v) => toast.error(v, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const infoNotify = (v) => toast.info(v, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const warnNotify = (v) => toast.warn(v, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const fancyNotify = (v) => toast(v, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if(type==='success'){
        successNotify(message);
      }
      else if(type==='error'){
        errorNotify(message);
      }
      else if(type==='info'){
        infoNotify(message);
      }
      else if(type==='warn'){
        warnNotify(message);
      }
      else{
        fancyNotify(message);
      }
}