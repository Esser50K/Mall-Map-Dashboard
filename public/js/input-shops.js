"use strict"

window.addEventListener("load", async () => {
    await populateTable("/api/shops/list", "/api/shops/remove", addRowCallback);
    document.getElementById("add-store-form")
        .addEventListener("submit", onSubmitShop);
});

function addRowCallback(shop, cells, row) {
    cells[0].textContent = shop.name;
    cells[1].textContent = shop.type;
    cells[2].textContent = shop.dateAdded;

    //const editButton = row.querySelector("a");
   // editButton.href = `edit-shop?id=${shop.id}`;
}


/**
 * Event handler for when the form is submitted
 * @param {Event} event The submit event
 */
async function onSubmitShop(event) {
    event.preventDefault();
    const shopNameElement = document.getElementById("shop-name");
    const typeElement = document.getElementById("shop-type");

    const shopName = shopNameElement.value;
    const shopType = typeElement.options[typeElement.selectedIndex].text;

    //Post it to the server
    const response = await postRequestJson("/api/shops/add", {
        shopName, 
        shopType 
    });

    //If it was added succesfully then update the table
    if (response.status === 201) {
        const shop = await response.json();
        console.log(shop);
        await addTableRow(shop, "/api/shops/remove", addRowCallback);
    }

}