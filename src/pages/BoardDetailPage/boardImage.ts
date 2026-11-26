const IMAGE_EXTENSION = /\.(?:jpe?g|png|gif|webp|bmp)$/i;
const FILE_EXTENSION = /\.(?:pdf|zip|hwp|hwpx|docx?|xlsx?|pptx?|txt|csv|html?|svg)$/i;
const IMAGE_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/x-ms-bmp",
]);

export const getSafeHttpUrl = (value: string): URL | null => {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password
      ? url
      : null;
  } catch {
    return null;
  }
};

export const getAttachmentName = (value: string) => {
  const pathname = getSafeHttpUrl(value)?.pathname ?? value.split(/[?#]/)[0];
  const name = pathname.split("/").pop() || "첨부 파일";
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
};

export const getImageKind = (value: string, contentType?: string | null): "image" | "file" | "unknown" => {
  if (!getSafeHttpUrl(value)) return "file";
  const mime = contentType?.split(";")[0].trim().toLowerCase();
  if (mime && mime !== "application/octet-stream") {
    return IMAGE_MIME_TYPES.has(mime) ? "image" : "file";
  }
  const name = getAttachmentName(value);
  return IMAGE_EXTENSION.test(name) ? "image" : FILE_EXTENSION.test(name) ? "file" : "unknown";
};

export const splitBodyUrls = (content: string) => {
  const parts: Array<{ text: string; url?: string }> = [];
  let end = 0;
  for (const match of content.matchAll(/https?:\/\/[^\s<>"']+/gi)) {
    if (match.index > end) parts.push({ text: content.slice(end, match.index) });
    parts.push({ text: match[0], url: getSafeHttpUrl(match[0]) ? match[0] : undefined });
    end = match.index + match[0].length;
  }
  if (end < content.length) parts.push({ text: content.slice(end) });
  return parts;
};
