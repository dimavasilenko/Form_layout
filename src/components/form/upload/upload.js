const inputUpload = document.querySelector('.upload__input');
const fileListParent = document.querySelector('.upload__table');
const fileList = document.querySelector('.upload__table-body');

inputUpload.addEventListener('change', addElement);

function addElement() {
    const listElement = document.createElement('tr');
    listElement.setAttribute('class', 'upload__table-item');
    const files = inputUpload.files;
    const bytesInKilobytes = 0.001;
    const size = parseInt(files[0].size * bytesInKilobytes);
    const tabletResolution = 768;
    let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const childMobile = `<th> 
    <i class="fas fa-file-alt file-icon"></i>
    ${files[0].name}
    </th>
    <td><i class="fas fa-trash remove-icon"></i></td>`;
    const childTablet = `
      <th> 
      <i class="fas fa-file-alt file-icon"></i>
      ${files[0].name}
      </th>
      <td>${size}kb</td>
      <td>842</td>
      <td><i class="fas fa-trash remove-icon"></i></td>`;
    windowWidth > tabletResolution ? (listElement.innerHTML += childTablet) : (listElement.innerHTML += childMobile);
    fileList.appendChild(listElement);
    isListEmpty();
}

function isListEmpty() {
    const requestText = document.querySelector('.upload__request-text');
    let isEmpty = fileList.children.length === 0;
    if (isEmpty) {
        fileListParent.setAttribute('hidden', 'hidden');
        requestText.removeAttribute('hidden', 'hidden');
    } else {
        fileListParent.removeAttribute('hidden', 'hidden');
        requestText.setAttribute('hidden', 'hidden');
    }
}

fileListParent.addEventListener('click', event => {
    const file = event.target;
    const parent = file.closest('.upload__table-item');
    file.classList.contains('fa-trash') ? parent.remove() : null;
    isListEmpty();
});