// =====================================================
// 1. JavaScript Basics & Setup
// =====================================================

console.log("Welcome to the Community Portal");

window.onload = () => {
    alert("Page fully loaded");
};

// =====================================================
// 2. Syntax, Data Types, and Operators
// =====================================================

const portalName = "Community Event Portal";
const todayDate = "2026-05-29";

let availableSeats = 50;

console.log(`${portalName} started on ${todayDate}`);

availableSeats--;
console.log(`Remaining Seats: ${availableSeats}`);

// =====================================================
// 5. Objects and Prototypes
// =====================================================

class Event {
    constructor(name, category, date, seats, location) {
        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
        this.location = location;
    }
}

Event.prototype.checkAvailability = function () {
    return this.seats > 0;
};

// =====================================================
// 6. Arrays and Methods
// =====================================================

const events = [
    new Event("Music Night", "Music", "2026-06-10", 20, "City Hall"),
    new Event("Baking Workshop", "Workshop", "2026-06-15", 15, "Community Center"),
    new Event("Football Match", "Sports", "2026-06-20", 0, "Sports Ground")
];

// Add new event using push

events.push(
    new Event("Art Expo", "Workshop", "2026-06-25", 25, "Art Gallery")
);

// Filter only music events

const musicEvents = events.filter(event => event.category === "Music");
console.log(musicEvents);

// Map formatted display

const eventTitles = events.map(event => `Workshop on ${event.name}`);
console.log(eventTitles);

// Object entries

Object.entries(events[0]).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
// =====================================================
// 3. Conditionals, Loops, and Error Handling
// =====================================================

function displayValidEvents() {
    const container = document.querySelector("#eventContainer");
    container.innerHTML = "";

    events.forEach((event, index) => {

        if (new Date(event.date) > new Date() && event.seats > 0) {

            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p>Category: ${event.category}</p>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
                <p>Seats: ${event.seats}</p>
                <button onclick="registerUser(${index})">Register</button>
            `;

            container.appendChild(card);
        }
    });
}

// =====================================================
// 4. Functions, Scope, Closures, Higher-Order Functions
// =====================================================

function addEvent(name, category, date, seats, location) {
    events.push(new Event(name, category, date, seats, location));
}

function registerUser(index) {
    try {
        if (events[index].seats <= 0) {
            throw new Error("No seats available");
        }

        events[index].seats--;

        alert(`Registered for ${events[index].name}`);

        displayValidEvents();

    } catch (error) {
        console.error(error.message);
    }
}

function filterEventsByCategory(category, callback) {
    const filtered = events.filter(event => event.category === category);
    callback(filtered);
}

// Closure example

function registrationTracker() {
    let totalRegistrations = 0;

    return function () {
        totalRegistrations++;
        console.log(`Total Registrations: ${totalRegistrations}`);
    };
}

const trackRegistration = registrationTracker();

// =====================================================
// 7. DOM Manipulation
// =====================================================

const eventContainer = document.querySelector("#eventContainer");
console.log(eventContainer);

displayValidEvents();

// =====================================================
// 8. Event Handling
// =====================================================

const categoryFilter = document.querySelector("#categoryFilter");

categoryFilter.onchange = function () {

    const selected = this.value;

    if (selected === "all") {
        displayValidEvents();
        return;
    }

    const container = document.querySelector("#eventContainer");
    container.innerHTML = "";

    filterEventsByCategory(selected, (filteredEvents) => {

        filteredEvents.forEach((event, index) => {

            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p>${event.category}</p>
                <button onclick="registerUser(${index})">Register</button>
            `;

            container.appendChild(card);
        });
    });
};

// Search with keydown

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keydown", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(value)
    );

    console.log(filtered);
});

// =====================================================
// 9. Async JS, Promises, Async/Await
// =====================================================

function fetchEvents() {

    console.log("Loading events...");

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
}

fetchEvents();

// Async Await version

async function fetchEventsAsync() {

    try {
        console.log("Loading...");

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

fetchEventsAsync();

// =====================================================
// 10. Modern JavaScript Features
// =====================================================

function greetUser(name = "Guest") {
    console.log(`Welcome ${name}`);
}

const sampleEvent = {
    eventName: "Music Night",
    eventDate: "2026-06-10",
    location: "City Hall"
};

const { eventName, eventDate, location } = sampleEvent;

console.log(eventName, eventDate, location);

// Spread operator

const clonedEvents = [...events];
console.log(clonedEvents);

// =====================================================
// 11. Working with Forms
// =====================================================

const registrationForm = document.querySelector("#registrationForm");

registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = registrationForm.elements[0].value;
    const email = registrationForm.elements[1].value;
    const selectedEvent = registrationForm.elements[2].value;

    const message = document.querySelector("#message");

    if (name === "" || email === "") {
        message.style.color = "red";
        message.textContent = "Please fill all fields";
        return;
    }

    message.style.color = "green";
    message.textContent = `Successfully registered for ${selectedEvent}`;

    console.log(name, email, selectedEvent);

    sendRegistration({ name, email, selectedEvent });
});

// =====================================================
// 12. AJAX & Fetch API
// =====================================================

function sendRegistration(userData) {

    setTimeout(() => {

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                alert("Registration Successful");
            })
            .catch(error => {
                console.error("Failure:", error);
            });

    }, 2000);
}

// =====================================================
// 13. Debugging and Testing
// =====================================================

console.log("Form submission initialized");
console.log("Checking fetch payload...");

// Use browser developer tools:
// 1. Open Console tab
// 2. Open Network tab
// 3. Add breakpoints in Sources tab
// 4. Inspect variables step-by-step

// =====================================================
// 14. jQuery and JS Frameworks
// =====================================================

/*
$(document).ready(function () {

    $('#registerBtn').click(function () {
        alert('Button Clicked');
    });

    $('.event-card').fadeIn();
    $('.event-card').fadeOut();
});
*/

// Benefit of React or Vue:
// Frameworks make UI development faster,
// reusable, and easier to maintain.