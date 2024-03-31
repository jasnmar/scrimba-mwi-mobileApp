
const appSettings = {
    databaseURL: "https://realtime-database-51a33-default-rtdb.firebaseio.com/"
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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
    clearShoppingList()
    let itemsList = Object.values(snapshot.val())
    for (let i = 0; i < itemsList.length; i++) {
        addItemToShoppingList(itemsList[i])
        console.log(itemsList[i])
    }
    console.log(snapshot.val())
})
function clearNewItem() {
    inputFieldEl.value = ""
}

function addItemToShoppingList(item) {
    shoppingListEl.innerHTML += `<li>${item}</li>`
}

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}