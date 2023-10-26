import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleImageUploadMulter = () => {
  const [image, setImage] = useState();
  const [image_data, setImage_Data] = useState([]);
  console.log(image_data[0]?.image_path);

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/test/get-image-local")
      .then((res) => {
        setImage_Data(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("picture", image);
    axios
      .post("http://localhost:5555/api/test/upload-image-local", formdata)
      .then((res) => {
        setImage_Data(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-screen h-screen p-3 flex flex-col justify-center items-center">
        <h1 className="p-3 text-[2rem] font-bold">Image Upload Local</h1>
        {image_data.map((data, index) => {
          const imageUrl = "/server" + data.image_path;

          return (
            <img
              key={index}
              className="h-[8rem] w-[8rem] rounded-full object-cover "
              src={imageUrl}
              alt=""
            />
          );
        })}
        <form action="" encType="multipart/form-data">
          <div className="p-3 flex justify-center items-center">
            <label className="px-[2rem] font-semibold text-[16px]" htmlFor="">
              Upoad Field 1
            </label>
            <input
              type="file"
              name="picture"
              id=""
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="p-3 flex justify-center items-start">
            <button
              onClick={handleSubmit}
              className="w-[15rem] h-[2rem] rounded-lg bg-green-700 text-white uppercase font-bold hover:opacity-80 transition-all duration-200 cursor-pointer"
              type="button"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleImageUploadMulter;
