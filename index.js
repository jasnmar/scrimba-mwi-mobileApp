
const appSettings = {
    databaseURL: "https://realtime-database-51a33-default-rtdb.firebaseio.com/"
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
setupPage()

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEl = document.getElementById("shopping-list")
const inputFieldEl = document.getElementById("input-field")

function setupPage() {
    const addBtnEl = document.getElementById("add-button")
    addBtnEl.addEventListener("click", addBtnClick)
}

function addBtnClick(event) {
    event.preventDefault();
    
    const inputVal = inputFieldEl.value
    push(shoppingListInDB, inputVal)
    //addItemToShoppingList(inputVal)
    clearNewItem();
    console.log(inputVal)
}

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        clearShoppingList()
        let itemsList = Object.entries(snapshot.val())
        console.log(itemsList)
        for (let i = 0; i < itemsList.length; i++) {
            const currentItem = itemsList[i]
            const currentItemID = currentItem[0];
            const currentItemValue = currentItem[1]
            console.log(currentItemValue)
            addItemToShoppingList(currentItem)
            console.log(itemsList[i])
        }

    } else {
        shoppingListEl.textContent = "No items here... yet"
    }

})

function clearNewItem() {
    inputFieldEl.value = ""
}

function addItemToShoppingList(item) {
    //shoppingListEl.innerHTML += `<li>${item}</li>`
    const newEl = document.createElement("li")
    const itemID = item[0]
    const itemVal = item[1]

    newEl.addEventListener("click", function() {
        console.log(itemID)
        const exactLocationOfItem = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItem)
    })

    newEl.textContent = itemVal
    shoppingListEl.appendChild(newEl)
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}

