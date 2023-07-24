const imgSection = document.querySelector(".img-section");
const photoInput = document.getElementById("photo-input");
let num = 0;

photoInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  const remainderImg = 5 - num;
  const filesToUpload = files.slice(0, remainderImg);

  if (files.length > remainderImg) {
    alert("写真は最大5まで登録出来ます。");
  }

  filesToUpload.forEach((file) => {
    const reader = new FileReader();
    num++;
    if (num >= 5) {
      document.querySelector(".upload-container").style.display = "none";
    }
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      createUploadContainer(imageUrl);
    };

    reader.readAsDataURL(file);
  });

  photoInput.value = null;
});

const createUploadContainer = (imageUrl) => {
  const container = document.createElement("div");
  container.classList.add("upload-container");

  const image = document.createElement("img");
  image.classList.add("upload-image");
  image.src = imageUrl;

  container.appendChild(image);
  imgSection.appendChild(container);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  container.style.position = "relative";

  container.appendChild(closeButton);

  closeButton.addEventListener("click", () => {
    num--;
    imgSection.removeChild(container);
    if (num < 5) {
      document.querySelector(".upload-container").style.display = "block";
    }
  });
};
