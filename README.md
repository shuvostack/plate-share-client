PlateShare — A Community Food Sharing Platform

PlateShare is a community-driven food sharing platform where users can donate extra food, and people in need can request and collect it.
The goal of this project is to reduce food waste and build a collaboration-driven society.

⭐ Features
1️⃣ Available Foods (Public Route)

#A fully public page accessible to all users

#Fetches all foods from MongoDB where food_status = "Available"

#Clean and responsive grid card layout

#Each card displays → Food Image, Donator Name & Image, Quantity, Pickup Location, Expire Date

#Clicking View Details redirects non-logged-in users to the Login page


2️⃣ Add Food (Private Route)

#Only logged-in users can add new food items

#Form fields include: Food Name, Image Upload (imgbb), Quantity, Pickup Location, Expire Date, Additional Notes

#Donator’s Name, Email, and Profile Image are auto-filled from Firebase Auth

#Default food_status = "Available"

#On submit, the new food item is stored in MongoDB and a success toast appears


3️⃣ Food Details + Request System

#Every food item has a dedicated details page

#Clicking Request This Food opens a modal

#Modal fields include:

#Requester Location

#Why They Need The Food

#Contact Number

#After submitting, the request is saved into a separate requests collection with:

requester info

food info

status: "pending"


4️⃣ My Food Requests

#Users can view all food requests they have submitted

#Each card shows → Food Image, Donator Info, Pickup Location, Expire Date, Status

#Users can cancel a pending request

#Request statuses include: "pending", "accepted", "rejected"


5️⃣ Food Owner Panel — Accept/Reject Requests

#Donators can view all requests made for their food item

#Two actions available:
✔ Accept Request → Food status becomes "Donated"
✔ Reject Request → Request status becomes "rejected"

#Proper updates are made in both collections → foods & requests

🛠 Tech Stack

#React + React Router

#Firebase Authentication

#Node.js + Express

#MongoDB

#imgbb (Image Hosting)

#Tailwind CSS + DaisyUI


🎯 Project Purpose

PlateShare aims to:

#Reduce food waste

#Help community members in need

#Connect food donors and recipients

#Promote sustainable food usage and environmental responsibility