let quote = document.querySelector('.quote_copy');
let quote_inp = document.querySelector('.quote_inp');
let input_area = document.querySelector(".input_area");
const reader = new FileReader();

if (window.FileList && window.File && window.FileReader) {
	document.getElementById('file-selector').addEventListener('change', event => {
	  quote.innerText = '';
	  const file = event.target.files[0];
	  console.log("New file!")
	  reader.addEventListener('load', event => {
		const pl = JSON.parse(atob(event.target.result.substring(29)))
		console.log(pl) // atob decodes it from Base64 NOT btoa
	  });
	  reader.readAsDataURL(file);
	}); 
  }