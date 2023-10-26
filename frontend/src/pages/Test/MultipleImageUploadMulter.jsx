import axios from "axios";
import React, { useState } from "react";

const MultipleImageUploadMulter = () => {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [message, setMessage] = useState(null);

  const UploadImage = () => {
    if (!file) {
      alert("No file selected!");
    } else {
      const fd = new FormData();
      const newArr = [];

      for (let i = 0; i < file.length; i++) {
        fd.append("images", file[i]);
      }

      setMessage("Uploading");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });

      axios
        .post(
          "http://localhost:5555/api/test/upload-multiple-image-local",
          fd,
          {
            onUploadProgress: (progressEvent) => {
              setProgress((prevState) => {
                return { ...prevState, pc: progressEvent.progress * 100 };
              });
            },
            headers: {
              "Custom-Header": "value",
            },
          }
        )
        .then((res) => {
          setMessage("File Uploaded!");
          setTimeout(() => {
            setMessage(null);
            setProgress({ started: false, pc: 0 });
          }, 2000);
          res.data;
        })
        .catch((error) => {
          setMessage("File Upload Failed!");
          console.log(error);
        });
    }

    // const image_FD = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   image_FD.append(`images${i + 1}`, files[i]);
    // }

    // setMessage("Uploading");
    // setProgress((prevState) => {
    //   return { ...prevState, started: true };
    // });

    // axios
    //   .post(
    //     "http://localhost:5555/api/test/upload-multiple-image-local",
    //     image_FD,
    //     {
    //       onUploadProgress: (progressEvent) => {
    //         setProgress((prevState) => {
    //           return { ...prevState, pc: progressEvent.progress * 100 };
    //         });
    //       },
    //       headers: {
    //         "Custom-Header": "value",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setMessage("File Uploaded!");
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     setMessage("File Upload Failed!");
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col p-5 border border-black rounded-lg bg-gray-200">
          <div className="py-10 text-center">
            <h1 className="text-[2rem] font-semibold">Multiple File Upload</h1>
          </div>
          <div className="p-3 bg-white w-full rounded-lg">
            <input
              type="file"
              name="images"
              id=""
              multiple
              accept="images/*"
              className="ml-[70px]"
              onChange={(e) => setFile(e.target.files)}
            />
          </div>
          <div className="flex justify-center items-center py-10">
            <button
              onClick={UploadImage}
              className="w-[15rem] h-[2rem] rounded-lg bg-green-700 text-white uppercase font-bold hover:opacity-80 transition-all duration-200 cursor-pointer"
            >
              Upload
            </button>
          </div>
          {progress.started && (
            <>
              <progress
                className="w-full"
                max={100}
                value={progress.pc}
              ></progress>
            </>
          )}
          {message && (
            <>
              <span>{message}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MultipleImageUploadMulter;
