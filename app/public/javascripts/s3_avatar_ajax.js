(function() {
  const uploadButton = document.getElementById('upload-button');

  function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/avatar/sign-s3?file-name=Avatar_${file.name}` +
                    `&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('avatar').src = url;
          document.getElementById('photo-url').value = url;
          uploadButton.innerHTML = '<input id="uploadButton" type="submit" value="Save" />';
        }
        else{
          console.log("S3 ajax error");
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  return (() => {
      document.getElementById('file-input').onchange = () => {
        const files = document.getElementById('file-input').files;
        const file = files[0];
        if(file == null){
          return alert('No file selected.');
        }
        uploadButton.innerHTML = 'Uploading...<div class="loader"></div>';
        getSignedRequest(file);
      };
    })();
})();
