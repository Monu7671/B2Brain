function toggleAccounts() {
    let accounts = document.getElementById("sidenav-accounts-collapsible");
    if (accounts.style.display === "none") {
        accounts.style.display = "block";
    } else {
        accounts.style.display = "none";
    }
    document.getElementById("sidenav-icon-accounts").classList.toggle("rotated");
}

function togglePreferences() {
    let preferences = document.getElementById("sidenav-preferences-collapsible");
    if (preferences.style.display === "none") {
        preferences.style.display = "block";
    } else {
        preferences.style.display = "none";
    }
    document.getElementById("sidenav-icon-preferences").classList.toggle("rotated");
}

function goToSearchPage() {
    let homepage = document.getElementById("homepage");
    let searchpage = document.getElementById("searchpage");
    let searchicon = document.getElementById("search-icon");
    let cancelicon = document.getElementById("cancel-icon");
    homepage.style.display = "none";
    searchpage.style.display = "grid";
    searchicon.style.display = "none";
    cancelicon.style.display = "block";
}

function goToHomePage() {
    let homepage = document.getElementById("homepage");
    let searchpage = document.getElementById("searchpage");
    let searchicon = document.getElementById("search-icon");
    let cancelicon = document.getElementById("cancel-icon");
    let searchinput = document.getElementById("search-input");
    homepage.style.display = "block";
    searchpage.style.display = "none";
    searchicon.style.display = "block";
    cancelicon.style.display = "none";
    searchinput.value = "";
}

async function getResults() {
    let searchResults = document.getElementById("search-results");
    searchResults.innerText = "Loading...";
    let value = document.getElementById("search-input").value;
    const response = await fetch("https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=" + value);
    results = await response.json();
    updateResults();
}

function updateResults() {
    let searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    results.forEach((result, index) => {
        let newResult = document.createElement("div");
        newResult.classList.add("search-result");
        let newLogo = document.createElement("div");
        if(result.logo === "") {
            newLogo.classList.add("search-result-initial");
            newLogo.innerHTML = result.company[0].toUpperCase();
            newLogo.style.backgroundColor = result.color;
        } else {
            newLogo.classList.add("search-result-img");
            newImage = document.createElement("img");
            newImage.setAttribute("src", result.logo);
            newLogo.appendChild(newImage);
        }
        let newDetails = document.createElement("div");
        newDetails.classList.add("search-result-details");
        let newName = document.createElement("div");
        newName.classList.add("search-result-name");
        newName.innerHTML = result.company;
        let newWebsite = document.createElement("div");
        newWebsite.classList.add("search-result-website");
        newWebsite.innerHTML = result.website;
        newDetails.appendChild(newName);
        newDetails.appendChild(newWebsite);
        let newLink = document.createElement("div");
        newLink.classList.add("search-result-link");
        newLink.setAttribute("id", "search-result-link-" + index);
        let newSpinner = document.createElement("img");
        newSpinner.setAttribute("src", "images/spinner.png");
        newSpinner.setAttribute("alt", "loading");
        newSpinner.setAttribute("id", "search-result-tracking-logo-" + index);
        newSpinner.classList.add("search-result-tracking-logo");
        newLink.addEventListener("click", () => {
            track(index);
        });
        newLink.appendChild(newSpinner);
        newLink.appendChild(document.createTextNode("Track"));
        newResult.appendChild(newLogo);
        newResult.appendChild(newDetails);
        newResult.appendChild(newLink);
        searchResults.appendChild(newResult);
    });
}

function track(index) {
    let link = document.getElementById("search-result-link-" + index);
    let spinner = document.getElementById("search-result-tracking-logo-" + index);
    link.style.width = "74px";
    spinner.style.display = "block";
    setTimeout(() => {
        spinner.style.display = "none";
        link.style.borderColor = "rgba(26, 171, 43, 1)";
        link.style.color = "rgba(26, 171, 43, 1)";
        link.innerText = "Tracking";
        console.log(results[index].company + " (" + results[index].slug + ")" + " tracked at " + new Date());
    }, 1000);
}