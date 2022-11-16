// fetching data from github api 
fetch('https://api.github.com/users/CheherK/repos')
.then((response) => {
   console.log(response);
   return response.json();
})
.then((data) => {
   let myData = data;
   let projectsPage = document.querySelector(".projects-page");
   quickSort(myData, 0, myData.length - 1);
   console.log(myData);
   myData.reverse();
   let startTime = performance.now();

   myData.forEach(rep => {
      let projectName = rep.name.split("-").join(" ").trim();
      let projectdesc = rep.description;
      let projectDate = rep.created_at.split("T")[0];
      let projectLive = "https://cheherk.github.io/" + rep.name;
      let projectCode = "https://github.com/CheherK/" + rep.name;
      let projectProgress = getRandomInt(50, 100);
      let projectPrice = getRandomInt(100, 1000);
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
      projectsPage.innerHTML += `
      <div class="project-box">
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
      </div>
      `;
      let progress = document.querySelectorAll(".projects-page .project-box .statics .progress");
      let progressSpan = progress[progress.length - 1].firstChild;
      progressSpan.style.width = progress[progress.length - 1].dataset.spanwidth;
      progressSpan.classList.add(progress[progress.length - 1].dataset.spancolor);
   });
   let endTime = performance.now();
   console.log(endTime - startTime);
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