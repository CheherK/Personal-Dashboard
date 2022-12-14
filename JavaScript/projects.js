// fetching data from github  
fetch('https://api.github.com/users/CheherK/repos')
.then((response) => {
   console.log(response);
   return response.json();
})
.then((data) => {
   let myData = data;
   const projectsPage = document.querySelector(".projects-page");
   quickSort(myData, 0, myData.length - 1);
   myData.reverse();

   myData.forEach(rep => {
      const projectName = rep.name.split("-").join(" ").trim();
      const projectdesc = rep.description;
      const projectDate = rep.created_at.split("T")[0];
      const projectLive = "https://cheherk.github.io/" + rep.name;
      const projectCode = "https://github.com/CheherK/" + rep.name;
      const projectProgress = getRandomInt(50, 100);
      const projectPrice = getRandomInt(100, 1000);
      let beforeColor;
      if(projectProgress < 70) {
         beforeColor = "bg-red"
      }
      if(projectProgress > 69 && projectProgress < 90) {
         beforeColor = "bg-blue"
      }
      if(projectProgress > 89) {
         beforeColor = "bg-green"
      }
      const projectBox = document.createElement("div");
      projectBox.className = "project-box";
      projectBox.innerHTML = `
         <h4>${projectName}</h4>
         <div class="description">
            <p>${projectdesc || projectName+" Description"}</p>
            <span>${projectDate}</span>
         </div>
         <div class="links">
            <a href="${projectLive}" target="_blank">live Show</a>
            <a href="${projectCode}" target="_blank">Code Source</a>
         </div>
         <div class="skills">
            <span><i class="fa-solid fa-magnifying-glass-chart"></i>  Analysis</span>
            <span><i class="fa-solid fa-pen-ruler"></i>  Design</span>
            <span><i class="fa-solid fa-computer"></i>  Programming</span>
         </div>
         <div class="statics">
            <div class="progress" data-spanWidth="${projectProgress}%" data-spanColor="${beforeColor}"><span></span></div>
            <p>$${projectPrice}</p>
         </div>
      `;
      projectsPage.appendChild(projectBox);
   });
   const progress = document.querySelectorAll(".projects-page .project-box .statics .progress");
   progress.forEach((elem) => {
      const progressSpan = elem.firstChild;
      progressSpan.style.width = elem.dataset.spanwidth;
      progressSpan.classList.add(elem.dataset.spancolor);     
   })
});

//sorting myData by created date with quick sort algorithm 

function quickSort(dataSet, fisrt, last) {
   if(fisrt < last) {
      let pivotIndex = partition(dataSet, fisrt, last);
      quickSort(dataSet, fisrt, pivotIndex-1);
      quickSort(dataSet, pivotIndex+1, last);
   }
}

function partition(dataValues, first, last) {
   let pivotvalue = dataValues[first].created_at;
   let lower = first + 1;
   let upper = last;
   let done = false;
   while (!done) {
      while(lower <= upper && dataValues[lower].created_at <= pivotvalue) {
         lower++;
      }
      while(upper >= lower && dataValues[lower].created_at >= pivotvalue) {
         upper--;
      }
      if(upper < lower) {
         done = true;
      } else {
         [dataValues[upper], dataValues[lower]] = [dataValues[lower], dataValues[upper]];
      } 
   }
   [dataValues[first], dataValues[upper]] = [dataValues[upper], dataValues[first]];
   return upper;
}

//random function return random values between 2 numbers

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}