import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

import nookies from "nookies";
import axios from "axios";
import apiInstance from "src/apiInstance";
import MediaView, { useRequestMedia } from "@components/MediaView";
import { useApiUrl, useResource } from "@refinedev/core";


function useCustomRequest() {
  const apiUrl = useApiUrl("medias");
  const { id: articles_id = "", resource } = useResource("articles");
  const onUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: getAuthorization(),
      },
      //   onUploadProgress: event => {
      //     const percent = Math.floor((event.loaded / event.total) * 100);
      //     setProgress(percent);
      //     if (percent === 100) {
      //       setTimeout(() => setProgress(0), 1000);
      //     }
      //     onProgress({ percent: (event.loaded / event.total) * 100 });
      //   }
    };
    fmData.append("file", file);
    fmData.append("article_id", articles_id.toString());
    fmData.append("type", "image");
    fmData.append("enabled", "true");

    try {
      const res = await axios.post(apiUrl, fmData, config);

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  


  function onRemove(file: any) {
    console.log("onRemove", file);
  }
  return {
    onUpload,
    onRemove
  };
}

const getProps = () => {
  const auth = nookies.get()["auth"];
  let authorization = "";
  if (auth) {
    const parsedUser = JSON.parse(auth);
    authorization = `Bearer ${parsedUser.token}`;
  }
  return {
    headers: {
      authorization: authorization,
    },
    name: "file",
  };
};

function getAuthorization() {
  const auth = nookies.get()["auth"];
  let authorization = "";
  if (auth) {
    const parsedUser = JSON.parse(auth);
    authorization = `Bearer ${parsedUser.token}`;
  }
  return authorization;
}

function UploadMedia({ value }: any) {
  const { onUpload, onRemove } = useCustomRequest();

  const requestMedia = useRequestMedia();

  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    // requestMedia
    if (!value) {
      return;
    }
    var promises =
      value &&
      value.map(async ({ id }: any) => {
        const data = await requestMedia(id);
        return data;
      });
    Promise.all(promises).then(function (results) {
      setImages(
        results.map((e) => ({
          status: "done",
          url: e.url,
          name: e.media_id,
          id: e.media_id,
        })),
      );
    });
  }, [value]);

  return (
    <Upload
      {...getProps()}
      listType="picture"
      fileList={[...images]}
      multiple
      onChange={({fileList})=> {
        setImages(fileList);
      }}
      onRemove={onRemove}
      customRequest={onUpload}>
      <Button block icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
}

export default UploadMedia;
