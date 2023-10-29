import { useApiUrl } from "@refinedev/core";
import { Image } from "antd";
import { useEffect, useState } from "react";
import apiInstance from "src/apiInstance";

function MediaView({ id }: { id: number }) {
  const apiUrl = useApiUrl("medias");
  const [mediaData, setMediaData] = useState<any>();
  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await apiInstance.get(`${apiUrl}/${id}/view`);
        setMediaData(data);
      })();
    }
  }, [id]);

  if (!mediaData) {
    return null;
  }

  return <Image src={mediaData?.url} />;
}
export function useRequestMedia() {
  const apiUrl = useApiUrl("medias");
  async function requestMedia(id: number) {
    const { data } = await apiInstance.get(`${apiUrl}/${id}/view`);
    return data;
  }
  return requestMedia;
}

export default MediaView;
