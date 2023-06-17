import "../assets/css/style.scss";
// const sass = require('sass');
// const result = sass.compile(scssFilename);

const app = document.getElementById("app");
app.innerHTML = `
  <h1>Drag And Drop API</h1>
  <div class="uploader"> 
    <div id=" item-0"class="dragme" draggable="true"></div>
    <div  class="dropzone"> 🎯Drag Here!</div>
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
  const dragMe = document.querySelector(".dragme");
  const dropZone = document.querySelector(".dropzone");
  dragMe.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'copy';
    e.target.classList.add('active');
  });
  dropZone.addEventListener('dragenter', (e) => e.target.classList.add('active'));
  dropZone.addEventListener('dragleave', (e) => e.target.classList.remove('active'));
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';

  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('active');
    const id = e.dataTransfer.getData('text/plain');
    const element = document.getElementById(id);
    dropZone.appendChild(element);
    
    element.addEventListener('click', () => {
      element.remove();
    }
    );
  });
};

//feature detection
//default draggable is false
if ("draggable" in document.createElement("div")) {
  init();
}
