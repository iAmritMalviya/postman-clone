console.log("you are in index.js");
let url = document.getElementById("url");
let getrequest = document.getElementById("getrequest");
let postrequest = document.getElementById("postrequest");
let jsontype = document.getElementById("jsontype");
let customtype = document.getElementById("customtype");
let customParamBox = document.getElementById("customParamBox");
let addBox = document.getElementById("addBox");
let jsonBox = document.getElementById("jsonBox");
let jsonTextarea = document.getElementById("jsonTextarea");
let submitBtn = document.getElementById("submitBtn");

jsonBox.style.display = "none";

jsontype.addEventListener("click", () => {
  jsonBox.style.display = "block";
  customParamBox.style.display = "none";
});

customtype.addEventListener("click", () => {
  jsonBox.style.display = "none";
  customParamBox.style.display = "block";
});

function addString(str) {
  let div = document.createElement("div");
  div.innerHTML = str;
  return div.firstElementChild;
}
let counter = 0;

addBox.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("c");
  let box = `<div class="row mb-3">
    <legend class="col-form-label col-sm-2 pt-0">Parameter:${
      counter + 2
    }</legend>
    <div class="col-sm-4">
        <input type="text" class="form-control" placeholder="Parameter Key ${
          counter + 2
        }" id="parameterkey${counter + 2}"
            aria-label="First name">
    </div>
    <div class="col-sm-4">
        <input type="text" class="form-control" placeholder="Parameter Value ${
          counter + 2
        }" id="parametervalue${counter + 2}"
            aria-label="Last name">
    </div>
    <div class="col-sm-2">
        <button class="btn btn-primary deleteBox" >-</button>
    </div>
</div>`;
  counter++;
  let element = addString(box);
  customParamBox.appendChild(element);

  let deleteBox = document.getElementsByClassName("deleteBox");

  for (const item of deleteBox) {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.parentElement.parentElement.remove();
    });
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let requesttype = document.querySelector('input[name="requesttype"]:checked').value;
  let contenttype = document.querySelector('input[name="contenttype"]:checked').value;
  let prism = document.getElementById('prismCode');
  let data = {};
  if (contenttype == 'customParam') {
      
 
  for (let i = 0; i <= counter; i++) {
    if (
      document.getElementById(`parameterkey${i + 1}`) != undefined 
    ) {
      key = document.getElementById(`parameterkey${i + 1}`).value;
      value = document.getElementById(`parametervalue${i + 1}`).value;
      console.log(document.getElementById(`parameterkey${i + 1}`).value);

      data[key] = value;
    }
  }
  data = JSON.stringify(data);
}
else
{
    data =document.getElementById('jsonTextarea').value
}
  
 
  console.log(requesttype);
  console.log(contenttype);
  console.log(data);
  if (requesttype == 'get') {
    prism.innerHTML = 'Fetching data...'

      fetch(url.value)
      .then(response => response.text())
      .then(res => {

          prism.innerHTML = res
          Prism.highlightAll();
      })

  } 
  else
  {
     fetch(url.value, {
         method: 'POST',
         headers: {
             'Content-Type' : 'application/json',
         },
         body: data
     })
     .then(response => response.text())
     .then(res => {
        prism.innerHTML = res; 
        console.log('success:', res)
        Prism.highlightAll()
    }
     )
  }


});
