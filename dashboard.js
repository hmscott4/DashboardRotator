// dashboard.js
// Hugh Scott
// 2020/03/26

// Contains functions for loading and running dashboards.


// Function plusDivs()
// Parameter n (integer)
// Used to advance slideshow by n slides
// Wired to left and right buttons with different values
// for number of slides to advance/go back
function plusDivs(n) {
    slideIndex = slideIndex + n;
    showDivs(slideIndex);
}

// Function pause()
// Used to pause automatic advancement of dashboards
// Wired to pause button
function pause() {

    var paused = document.querySelector('#pauseFlag');
    paused.innerText = "Paused";
}

// Function resume()
// Used to resume automatic advancement of dasboards
// Wired to resume button
function resume() {

    var paused = document.querySelector('#pauseFlag');
    paused.innerText = "";

}


// function SortSequence
// Sort data by sequence
function SortSequence(a, b) {
    if (a.sequence < b.sequence)
        return -1;
    if (a.sequence > b.sequence)
        return 1;
    return 0;
}

// function rankingSorter
// Used to sort data by sequence
function rankingSorter(firstKey, secondKey) {
    return function(a, b) {  
        if (a[firstKey] > b[firstKey]) {  
            return -1;  
        } else if (a[firstKey] < b[firstKey]) {  
            return 1;  
        }  
        else {
            if (a[secondKey] > b[secondKey]) {  
                return 1;  
            } else if (a[secondKey] < b[secondKey]) {  
                return -1;  
            } else {
                return 0;
            }
        } 
    }  
}

// Function LoadImages
// Loads the dashboard images based on dashboard.json
// Called on page load and called on setInterval schedule
function LoadImages() {

    var paused = document.querySelector('#pauseFlag');
    if (paused.innerText === "") {

        var i = 0;
        var output = "";
        var myTime = performance.now();

    // Part 1: Load images into imgGallery
        $.getJSON('dashboard.json', function (data) {
			// console.log(data);
			data.sort(SortSequence);

            $.each(data, function (key, val) {
                if(val.type === "Image") {
                    output += '<img class="slides" src="' + val.src + '" id="' + val.name + '" alt="' + val.description + '" loading="lazy">';
                } else if (val.type === "Html") {
                    output += '<embed title="' + val.name + '" type="text/html" class="slides" src="' + val.src + '" style="width:100%;height:100%" loading="lazy"></embed>';
                };
            i+=1;
            });
            $('#imgGallery').html(output);

        });

        // Part 2: Set the initial Slide Index and Total Count Values
        var counter = document.querySelector('#ImgCounter');
        counter.innerText = 1;

        var ImgTotal = document.querySelector('#ImgTotal');
        ImgTotal.innerText = i;

    }

}

// Function LoadNavItems
// Loads the dashboard images based on dashboard.json
function LoadNavItems() {

    var output = "";
    var myTime = performance.now();

    $.getJSON('dashboard.json', function (data) {
        // console.log(data);
		data.sort(SortSequence);
        output += '<ol type="1">';

        $.each(data, function (key, val) {
            output += '<li class="navItem"><a href="' + val.url + '" target="_blank">' + val.description + '</a></li>';
        });
        output += '</ol>';
        $('#navItems').html(output);

    });

}

// Function LoadPinnedItems
// Loads the dashboard images based on dashboard.pinned.json
function LoadPinnedItems() {

    var output = "";
    var myTime = performance.now();

    $.getJSON('dashboard.pinned.json', function (data) {
        // console.log(data);
        output += '<ol type="1">';

        $.each(data, function (key, val) {
            output += '<li class="navItem"><a href="' + val.url + '" target="_blank">' + val.description + '</a></li>';
        });
        output += '</ol>';
        $('#pinnedItems').html(output);

    });

}


// Function ShowDivs
// Used to advance dashboards manually
// Called by plusDivs function
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slides");

    if (n > x.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = x.length;
    };
    for (i = 0; i < x.length; i+=1) {
        x[i].style.display = "none";
    };

    x[slideIndex - 1].style.display = "block";

    var counter = document.querySelector('#ImgCounter');
    counter.innerText = slideIndex;

    var ImgTotal = document.querySelector('#ImgTotal');
    ImgTotal.innerText = x.length;
}

// function carousel
// Used to automatically advance dashboards
// Called by this script after page load
function carousel() {

    var paused = document.querySelector('#pauseFlag');
    if (paused.innerText === "") {

        var i;
        var x = document.getElementsByClassName("slides");
        for (i = 0; i < x.length; i+=1) {
            x[i].style.display = "none";
        }

        slideIndex+=1;
        if (slideIndex > x.length) {
            slideIndex = 1;
        }
        x[slideIndex - 1].style.display = "block";
        // showDivs(1);

        var counter = document.querySelector('#ImgCounter');
        counter.innerText = slideIndex;

        var ImgTotal = document.querySelector('#ImgTotal');
        ImgTotal.innerText = x.length;
    }
}

// function updateClocks
// Used to update world time zone clocks in the clock bar
// This function runs automatically based on setInterval schedule
function updateClocks() {

    var clocks = document.getElementsByClassName("clock");
    var i;
    var l = clocks.length;
    var timezone;
    var time;
	
	// Sort the Clocks by sequence

    for (i = 0; i < l; i+=1) {
        timezone = clocks[i].dataset.timezone;
        time = new Date().toLocaleTimeString("en-GB", {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timezone
        });
        clocks[i].textContent = time;
    }

}

// function LoadClocks
// Used to load clock items from configuration file dashboard.clocks.json
// Called once when the page loads
function LoadClocks() {

    // Jquery, Load clock items
    // Loads the world clock bar based on entries in dashboard.clocks.json.
    $.getJSON('dashboard.clocks.json', function (data) {
        // console.log(data);
		data.sort(SortSequence);
        var output = '<table style="width:100%"><tr>';

        $.each(data, function (key, val) {
            output += '<th>' + val.name + '</th>';
        });

        output += '</tr><tr align="center">';

        $.each(data, function (key, val) {
            output += '<td><span class="clock" data-timezone="' + val.timezone + '"></span></td>';
        });

        output += '</tr></table>';
        $('#clockItems').html(output);

    });
	
}

// Initialize slideIndex, load clock items and images
var slideIndex = 0;
LoadClocks();
LoadImages();

// Load Navigation items
LoadNavItems();
LoadPinnedItems();

// Set intervals for functions to run
// Values in milliseconds (5000=5 seconds)
setInterval(LoadImages, 900000); // Reload dashboard items every 900 seconds [this refreshes images in carousel]
setInterval(updateClocks, 15000); // Update Clocks every 15 seconds
setInterval(carousel, 30000); // Update slide carousel every 8 seconds [this advances carousel to next slide]
