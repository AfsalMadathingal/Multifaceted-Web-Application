document.addEventListener('DOMContentLoaded', () => {

  


    const iluvnet = document.querySelector('.button--submit');

    iluvnet.addEventListener('click', (event) => {

      const loading = document.querySelector('.loading-bar')
      var url = document.getElementById('url').value
      const route = iluvnet.getAttribute('data-download')
      console.log(route);



      var urlRegx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

      if (!urlRegx.test(document.getElementById('url').value)) {

        return swal ( "Oops" ,  "The Link you entered is wrong!" ,  "error" )
      }


      loading.style.display = 'block';



    fetch(`/downloader/${route}-download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url
        })
      })
      .then(response => {

       
        // Check if the response status is okay
        if (!response.ok) {
          throw new Error('Failed to download video');
        }

        
        // Return the response blob
        return response.blob();
      })
      .then(blob => {
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a link element and simulate a click to initiate download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'iluvnetfacebookdownloader.mp4';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        loading.style.display = 'none';
        // Inform the user that the download is complete
        swal("Success", "Video downloaded successfully!", "success");
      })
      .catch(error => {
        console.error('Error downloading video:', error);
        // Handle error using SweetAlert
        loading.style.display = 'none';
        swal("Oops", "Failed to download video", "error");
      });
      


    })





  })