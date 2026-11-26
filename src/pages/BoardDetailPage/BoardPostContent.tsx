import { Fragment, useEffect, useState } from "react";
import { getAttachmentName, getImageKind, getSafeHttpUrl, splitBodyUrls } from "./boardImage";
import * as S from "./BoardDetailPage.styles";

function BoardImage({ url }: { url: string }) {
  const kind = getImageKind(url);
  const mixedContent = typeof window !== "undefined" && window.location.protocol === "https:" &&
    getSafeHttpUrl(url)?.protocol === "http:";
  const [preview, setPreview] = useState(kind === "image");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [confirmedImage, setConfirmedImage] = useState(kind === "image");

  useEffect(() => {
    if (kind !== "unknown" || mixedContent) return;
    let cancelled = false;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    void fetch(url, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          if (!cancelled) setPreview(true);
          return;
        }
        const detected = getImageKind(url, response.headers.get("Content-Type"));
        if (!cancelled) {
          setPreview(detected !== "file");
          setConfirmedImage(detected === "image");
        }
      })
      .catch(() => {
        // An image can load without CORS even when its HEAD response cannot be read.
        if (!cancelled) setPreview(true);
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [kind, mixedContent, url]);

  if (kind === "file") return null;
  if (mixedContent) {
    return kind === "image"
      ? <S.ImageNotice>HTTP 이미지는 HTTPS 페이지에서 미리 볼 수 없습니다. 링크로 확인해 주세요.</S.ImageNotice>
      : null;
  }
  if (failed) {
    return confirmedImage
      ? <S.ImageNotice>이미지를 불러오지 못했습니다. 링크로 확인해 주세요.</S.ImageNotice>
      : null;
  }
  if (!preview) return null;
  return (
    <S.ImageItem
      src={url}
      alt={getAttachmentName(url)}
      loading={kind === "unknown" ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      hidden={kind === "unknown" && !loaded}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}

export default function BoardPostContent({ content, imageUrls }: { content: string; imageUrls: string[] }) {
  const files = imageUrls.filter((url) => getSafeHttpUrl(url) !== null);
  return (
    <>
      <S.BodyText>
        {splitBodyUrls(content).map((part, index) => part.url ? (
          <Fragment key={`${index}:${part.url}`}>
            <S.BodyLink href={part.url} target="_blank" rel="noopener noreferrer">{part.text}</S.BodyLink>
            <BoardImage url={part.url} />
          </Fragment>
        ) : part.text)}
      </S.BodyText>
      {files.map((url, index) => <BoardImage key={`${index}:${url}`} url={url} />)}
      {files.length ? (
        <S.FileList>
          {files.map((url, index) => (
            <S.FileItem key={`${index}:${url}`} href={url} download={getAttachmentName(url)} target="_blank" rel="noreferrer">
              (파일) {getAttachmentName(url)}
            </S.FileItem>
          ))}
        </S.FileList>
      ) : null}
    </>
  );
}
