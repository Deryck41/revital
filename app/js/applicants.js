let count = 1;
const buttonAdd = document.querySelector('.add-applicant-button');
buttonAdd.addEventListener('click', function() {
    count++;
    const applicant = document.querySelector('.form__wrapper').innerHTML;
    const newApplicant = document.createElement('div');
    newApplicant.innerHTML = applicant;
    newApplicant.classList.add('form__wrapper', 'form__wrapper_multi');
    newApplicant.querySelector('.applicant-title').textContent = newApplicant.querySelector('.applicant-title').textContent.search("Guarantor") === 0 ? `Guarantor ${count}` : `Applicant ${count}`;
    buttonAdd.parentNode.insertBefore(newApplicant, buttonAdd);

});