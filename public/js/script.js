document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const navLink = document.querySelector('.nav__link');
  


    const DownloadButton = document.querySelector('.botao');

    const getReels = document.querySelector('.button--submit');

    getReels.addEventListener('click', (event) => {

      const loading = document.querySelector('.loading-bar')
      var url = document.getElementById('url').value
      const instaImage = document.getElementById('insta-image')
      let newurl;


      var urlRegx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

      if (!urlRegx.test(document.getElementById('url').value)) {

        return swal ( "Oops" ,  "The Link you entered is wrong!" ,  "error" )
      }
      console.log(url)


      const questionMarkIndex = url.indexOf("?");

      // If "?" exists in the URL, remove everything after it
      if (questionMarkIndex !== -1) {
        newurl = url.substring(0, questionMarkIndex);
        newurl += "?utm_source=ig_web_copy_link";
      }

      // Add "&utm_source=ig_web_copy_link" to the end of the URL



      loading.style.display = 'block';

      console.log(url)

      url = newurl ? newurl : url

      console.log(newurl)

      fetch('/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url
        })
      }).then(res => {
        return res.json()
      }).then(data => {

        console.log(data)

        if (data.data.length == 0) {

          loading.style.display = 'none';
         return swal ( "Oops" ,  "The Link you entered is wrong!" ,  "error" )

        }
        if (!data.status) {

          return alert(data.error)
        }


        loading.style.display = 'none';
        instaImage.src = data.data[0].thumb
        swal ( "Success" ,  "Downloaded Successfully" ,  "success" )
        window.location.href = data.data[0].link



      })


    })





  })