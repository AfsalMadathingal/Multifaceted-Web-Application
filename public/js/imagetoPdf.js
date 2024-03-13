
document.addEventListener("DOMContentLoaded", () => {



  

  var isAdvancedUpload = (function () {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  let draggableFileArea = document.querySelector(".drag-file-area");
  let browseFileText = document.querySelector(".browse-files");
  let uploadIcon = document.querySelector(".upload-icon");
  let dragDropText = document.querySelector(".dynamic-message");
  let fileInput = document.querySelector(".default-file-input");
  let cannotUploadMessage = document.querySelector(".cannot-upload-message");
  let cancelAlertButton = document.querySelector(".cancel-alert-button");
  let uploadedFile = document.querySelector(".file-block");
  let fileName = document.querySelector(".file-name");
  let fileSize = document.querySelector(".file-size");
  let progressBar = document.querySelector(".progress-bar");
  let removeFileButton = document.querySelector(".remove-file-icon");
  let uploadButton = document.querySelector(".upload-button");
  let fileFlag = 0;
  let hiddenInput = document.querySelector(".hiden-file-input");
  const loading = document.getElementById('loading')
  fileInput.addEventListener("click", () => {
   
    fileInput.value=''
    console.log(fileInput.value);
    dragDropText.innerText = "Image Selected Click Upload"
  });


  uploadButton.addEventListener("click", (e) => {
    e.preventDefault()
    const form = document.getElementById("form-images");
    if (fileInput.value == '') {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an image',
      });
      return
    }
    
    loading.style.display= "block"
    const formData = new FormData(form);
    const url = form.getAttribute('action');


    fetch('/tools/imagetoPdf', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      
      loading.style.display= "none"
      console.log(data);

      // Assuming you have received the PDF path from the Axios response
const pdfPath = data.pdf

// Function to download the PDF file
async function downloadPdf  (pdfPath) {
  
    const fullUrl = window.location.origin + pdfPath;
    console.log(fullUrl);
   await axios
      .get(fullUrl, {
        responseType: "blob",
        headers: {
          "Cache-Control": "no-cache", 
        }, 
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        link.download = "downloaded_file.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        const blobUrl = window.URL.createObjectURL(blob);

        window.open(blobUrl, "_blank");

       
      }).then(() => {

        axios.delete('/tools/delete',)

      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
}


downloadPdf(pdfPath);

      
    })
    .catch(error => console.error(error));



  });

  cancelAlertButton.addEventListener("click", () => {
    cannotUploadMessage.style.cssText = "display: none;";
  });

  if (isAdvancedUpload) {
    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ].forEach((evt) =>
      draggableFileArea.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
      })
    );

    ["dragover", "dragenter"].forEach((evt) => {
      draggableFileArea.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadIcon.innerHTML = "file_download";
        dragDropText.innerHTML = "Drop your file here!";
      });
    });

    draggableFileArea.addEventListener("drop", (e) => {
      uploadIcon.innerHTML = "check_circle";
      dragDropText.innerHTML = "File Dropped Successfully!";
      document.querySelector(
        ".label"
      ).innerHTML = `drag & drop or <span class="browse-files"> <input type="file" class="default-file-input" style=""/> <span class="browse-files-text" style="top: -23px; left: -20px;"> browse file</span> </span>`;
      uploadButton.innerHTML = `Upload`;

      let files = e.dataTransfer.files;
      fileInput.files = files;
      console.log(files[0].name + " " + files[0].size);
      console.log(document.querySelector(".default-file-input").value);
      fileName.innerHTML = files[0].name;
      fileSize.innerHTML = (files[0].size / 1024).toFixed(1) + " KB";
      uploadedFile.style.cssText = "display: flex;";
      progressBar.style.width = 0;
      fileFlag = 0;
    });
  }

  removeFileButton.addEventListener("click", () => {
    uploadedFile.style.cssText = "display: none;";
    fileInput.value = "";
    uploadIcon.innerHTML = "file_upload";
    dragDropText.innerHTML = "Drag & drop any file here";
    document.querySelector(
      ".label"
    ).innerHTML = `or <span class="browse-files"> <input type="file" class="default-file-input"/> <span class="browse-files-text">browse file</span> <span>from device</span> </span>`;
    uploadButton.innerHTML = `Upload`;
  });


});
