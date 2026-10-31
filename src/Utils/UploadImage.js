
const API_BASE_URL = import.meta.env.VITE_API_URL;


async function UploadImage(file, token,f) {
  const sigRes = await fetch(`${API_BASE_URL}/api/transactions/upload-signature?folder=${f}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!sigRes.ok) throw new Error("Couldn't start the upload");
  const { timestamp, folder, signature, apiKey, cloudName } = await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", timestamp);
  fd.append("folder", folder);
  fd.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
}

export default UploadImage;