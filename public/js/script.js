document.addEventListener('DOMContentLoaded', () => {

  


    const iluvnet = document.querySelector('.button--submit');

    iluvnet.addEventListener('click', (event) => {

      const loading = document.querySelector('.loading-bar')
      var url = document.getElementById('url').value
      const instaImage = document.getElementById('insta-image')
      const route = iluvnet.getAttribute('data-download')
      console.log(route);
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

      fetch(`/downloader/${route}-download`, {
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

          return swal ( "Oops" ,  "I think You have Reached Limit For today" ,  "error" )

        }


        loading.style.display = 'none';
       

       if (data.data[0].url == undefined) {
        return swal ( "Oops" ,  "I think You have entred worong Link" ,  "error" )
       }

       instaImage.src = data.data[0].thumbnail

       swal({
        title: "Success",
        text: "Video loaded Successfully",
        icon: "success",
        buttons: {
          cancel: "Cancel",
          download: {
            text: "Download",
            value: "download",
          },
        },
      })
      .then((value) => {
        switch (value) {
          case "download":
            const a = document.createElement('a');
            a.href = data.data[0].url;
            a.download = data.data[0].filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            break;
          default:
            break;
        }
      });


      })


    })





  })