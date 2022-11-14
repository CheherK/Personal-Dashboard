// start yearly rarget 
let spans = document.querySelectorAll(".yearly-target .detail .progress span");
let yearlyTargetSection = document.querySelector(".yearly-target"); 
let spansStat = document.querySelectorAll(".yearly-target .detail .progress span span");

window.onscroll = function() {
    if(window.scrollY >= yearlyTargetSection.offsetTop - 350) {
        spans.forEach((span) => {
            span.style.width = span.dataset.width;
        })
        setTimeout(() => {
            spansStat.forEach((span) => {
                    span.style.opacity = "1";
                }
            )
        }, 600)
    }
}
// end yearly target 
// start latest tasks 
let  deleteIcons = document.querySelectorAll(".latest-task .task i.delete");
let checkIcons = document.querySelectorAll(".latest-task .task i:not(.delete)");

console.log(deleteIcons);
deleteIcons.forEach((deleteIcon) => {
    deleteIcon.onclick = function() {
        deleteIcon.parentElement.parentElement.remove();
    }
})
checkIcons.forEach((checkIcon) => {
    checkIcon.onclick = function() {
        checkIcon.classList.toggle("fa-solid");
        checkIcon.classList.toggle("fa-regular");
        checkIcon.classList.toggle("c-green");
        checkIcon.parentElement.previousElementSibling.classList.toggle("task-done");
    }
})
// end latest tasks 