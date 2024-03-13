
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
    alert("hello")
    const form = document.getElementById("form-images");
    
    
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
function downloadPdf(pdfPath) {
    // Construct the full URL for the PDF file
    const fullUrl = window.location.origin + pdfPath;

    console.log(fullUrl);

    // Send a GET request to fetch the PDF file
    axios.get(fullUrl, {
        responseType: 'blob',
        headers: {
          'Cache-Control': 'no-cache' // Add a Cache-Control header to prevent IDM interception
      } // Specify the response type as blob
    })
    .then(response => {

      console.log(response);
        // Create a blob object from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Create a link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // Set the download attribute with the desired file name
        link.download = 'downloaded_file.pdf';

        // Append the link to the document body
        document.body.appendChild(link);

        // Click the link programmatically to start the download
        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);
        const blobUrl = window.URL.createObjectURL(blob);

        // Open the blob URL in a new browser tab
        window.open(blobUrl, '_blank');
    })
    .catch(error => {
        console.error('Error downloading PDF:', error);
    });
}

// Call the function to download the PDF file
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
