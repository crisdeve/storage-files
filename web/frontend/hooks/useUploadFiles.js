export const useUploadFiles = async ({ url, parameters }, file) => {
  const formData = new FormData();

  parameters.forEach(({ name, value }) => {
    formData.append(name, value);
  });

  formData.append("file", file);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};
