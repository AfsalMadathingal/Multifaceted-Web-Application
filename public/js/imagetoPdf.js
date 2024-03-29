


const dropZone = document.querySelector('.drop-zone');
const fileInput = document.querySelector('.drop-zone__input');
const previewList = document.querySelector('.preview-list');
const uploadBtn = document.querySelector('.upload-btn');

const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close-btn")[0];



// Close the modal when the close button is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


const browseBtn = document.querySelector('.drop-zone__browse');
browseBtn.addEventListener('click', () => fileInput.click());

let files = [];

// Handle file drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drop-zone--over');
});

['dragleave', 'dragend'].forEach((type) => {
  dropZone.addEventListener(type, (e) => {
    dropZone.classList.remove('drop-zone--over');
  });
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drop-zone--over');
  handleFiles(e.dataTransfer.files);
});

// Handle file input
fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

function handleFiles(newFiles) {
  files = [...files, ...newFiles];
  updatePreviewList();
  uploadBtn.disabled = files.length === 0;
}

function updatePreviewList() {
  previewList.innerHTML = '';
  files.forEach(createPreviewItem);
}

function createPreviewItem(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const previewItem = document.createElement('div');
    previewItem.classList.add('preview-item');

    const img = document.createElement('img');
    img.src = e.target.result;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'x';
    removeBtn.addEventListener('click', () => {
      files = files.filter((f) => f !== file);
      updatePreviewList();
      uploadBtn.disabled = files.length === 0;
    });

    previewItem.appendChild(img);
    previewItem.appendChild(removeBtn);
    previewList.appendChild(previewItem);
  };
  reader.readAsDataURL(file);
}

uploadBtn.addEventListener('click', (e) => {

    e.preventDefault()
    const form = document.getElementById("form");

    if (fileInput.value == '') {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an image',
      });
      return
    }


    let fileNameArray = fileInput.value.split('.');
     let fileExtension = fileNameArray[fileNameArray.length - 1];

      if (!fileExtension.match(/jpg|jpeg|png/i)) {
        swal({
          icon: 'error',
         title: 'Oops...',
        text: 'Please upload a valid image (jpg, jpeg, or png)',
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
      
     

      if(data.status == false)
      {
        loading.style.display= "none"
        swal({
          icon: 'error',
         title: 'Oops...',
        text: data.message,
      });
      
      return
      }

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

        link.download = "iluvnetPDFTools_downloaded.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        const blobUrl = window.URL.createObjectURL(blob);
        loading.style.display= "none"
        modal.style.display = "block";
        //window.open(blobUrl, "_blank");

       
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

