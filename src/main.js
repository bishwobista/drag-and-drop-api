import "../assets/css/style.scss";
// const sass = require('sass');
// const result = sass.compile(scssFilename);

const app = document.getElementById("app");
app.innerHTML = `
  <h1>Drag And Drop API</h1>
  <div class="uploader"> 
    <!-- <div id=" item-0"class="dragme" draggable="true"></div> !-->
    <h2>Upload your files here</h2>
    <p>Accepts only .png .jpg .svg</p>
    <input type="file" class="files" accept="image/*" multiple>
    <div  class="dropzone">🗂️ Drag to Upload</div>
    <div class="list"> </div>
  </div>
  <style>
    .uploader {
      box-sizing: border-box;
      max-width: 90%;
      border-bottom: 3px solid #d2d5da;
      border-radius: 10px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
    }
    .dragme {
      background: #ce1f99;
      border-radius: 5px;
      width:50px;
      height:50px;
    }
    .dropzone {
      border: 3px dashed #d2d5da;
      margin-top: 25px;
      padding: 20px;
      border-radius: 5px;
      background: #f1f2f5;
    }
    .active {
      // background: #ebfff6;
      border-color: #24b373;
    }
  </style>
`;

//only runs when drag and drop is supported
const init = () => {
  // const dragMe = document.querySelector(".dragme");
  const dropZone = document.querySelector(".dropzone");
  const list = document.querySelector(".list");
  const files = document.querySelector(".files");

  // dragMe.addEventListener('dragstart', (e) => {
  //   e.dataTransfer.setData('text/plain', e.target.id);
  //   e.dataTransfer.effectAllowed = 'copy';
  //   e.target.classList.add('active');
  // });
  dropZone.addEventListener("dragenter", (e) =>
    e.target.classList.add("active")
  );
  dropZone.addEventListener("dragleave", (e) =>
    e.target.classList.remove("active")
  );
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("active");
    // const id = e.dataTransfer.getData('text/plain');
    // const element = document.getElementById(id);

    // if (element instanceof Node) {
    //   dropZone.appendChild(element);

    //   element.addEventListener('click', () => {
    //     element.remove();
    //   });
    // }
    const { files } = e.dataTransfer;
    handleFileUpload(files);
  });
  //code -> https://glitch.com/edit/#!/drag-and-drop-api

  // const uploadFiles = async (files) => {
  //   const form = new FormData();
  //   [...files].forEach((file) => form.append(file.name, file));

  //   const request = new Request("https://drag-and-drop-api.glitch.me/upload", {
  //     method: "POST",
  //     body: form,
  //   });
  //   return await request.json();
  // };

  const uploadFiles = async (files) => {
    const form = new FormData();
    [...files].forEach((file) => form.append(file.name, file));

    const request = new Request("https://drag-and-drop-api.glitch.me/upload", {
      method: "POST",
      body: form,
    });
    const response = await fetch(request);
    const responseData = await response.text();

    console.log(responseData);

    return JSON.parse(responseData);
  };

  files.addEventListener("change", (e) => {
    const { files } = e.target;
    handleFileUpload(files);
  });

  const showFilePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const div = document.createElement("div");
      div.innerHTML = ` 
    <div style = "display: flex; width: 100%; height: 100%">
      <img src="${e.target.result}" alt="${file.name}" style = " width: 20px; height: auto"/>
      <p>${file.name} <span>${file.size} bytes</span> </p>

    </div>
    `;
      list.appendChild(div);
    });
  };

  const isAllowedType = (file) => {
    return ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
  };
  const handleFileUpload = async (files) => {
    const filesToUpload = [...files].filter(isAllowedType);
    filesToUpload.forEach(showFilePreview);
    const uploaded = await uploadFiles(filesToUpload);
    if (uploaded) {
      for (const image of uploaded.images) {
        console.log(image);
      }
    }
  };
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  document.addEventListener("drop", (e) => {
    e.preventDefault();
  });
};

//feature detection
//default draggable is false
if ("draggable" in document.createElement("div")) {
  init();
}
