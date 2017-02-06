var getUserDetails = function(userId, tagId){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/users/user?userId=${userId}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        const ele = document.getElementById(tagId);
        ele.innerHTML =
        
        '<span>' +
        '<img class="user-avatar" src=' + response.avatarURL +
        ' style="width: 60px; height: 60px; border-radius: 50%;">' +
        '</img>' +
        '</span>' +

        '<span><h3> ' + response.username + '</h3></span>';
      }
      else{
        console.err('Could not get User details.');
      }
    }
  };
  xhr.send();
};
