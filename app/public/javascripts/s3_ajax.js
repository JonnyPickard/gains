const uploadButton = document.getElementById('upload-button');

(() => {
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

function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/photo/sign-s3?file-name=${file.name}&file-type=${file.type}`);
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
        uploadButton.innerHTML = '<input id="upload-button" type="submit" value="Upload" />'
        document.getElementById('photo-url').value = url;
      }
      else{
        console.log("S3 ajax error");
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
