const { input, number } = require('@inquirer/prompts');

const products = [
    { productName: 'Apples', quantity: 5 },
    { productName: 'Bananas', quantity: 12 },
    { productName: 'Oranges', quantity: 8 },
    { productName: 'Avocados', quantity: 4 }
];

async function showIntro() {
    let intro = "Welcome to The Shop!  Here is a list of products in stock:";
    console.log(intro);
    console.log('-'.repeat(intro.length));
}

async function showProducts() {
    products.forEach(product => console.log(product));
}

function formatInput(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

async function askForInput() {
    const foodOrder = await input({ message: 'What product would you like to order?' });
    return foodOrder;
}

async function askForQuantity(productName) {
    const quantity = await number({
        message: `How many ${productName} would you like to order?`,
        validate: (value) => (value > 0 ? true : 'Please enter a positive number.')
    });
    return quantity;
}

async function validateInput(foodOrder) { 
    const formattedOrder = formatInput(foodOrder);
    const productNames = ['Apples', 'Bananas', 'Oranges', 'Avocados'];
    if (!productNames.includes(formattedOrder)) {
        console.log('The requested product does not exist.');
        return;
    }

    console.log('The requested product is available.');

    const product = products.find(item => item.productName === formattedOrder);

    if (product.quantity <= 0) {
        console.log(`Sorry - ${formattedOrder} is out of stock.`);
        return;
    }

    const requestedQuantity = await askForQuantity(formattedOrder);

    if (requestedQuantity > product.quantity) {
        console.log(
            `Sorry, we only have ${product.quantity} ${formattedOrder}(s) in stock.`
        );
    } else {
        product.quantity -= requestedQuantity;
        console.log(
            `You have ordered ${requestedQuantity} ${formattedOrder}(s). Remaining quantity: ${product.quantity}.`
        );
    }
}

async function startShop() {
    await showIntro();
    let continueShopping = true;
    while (continueShopping) {
        await showProducts()
        const userInput = await askForInput();
        await validateInput(userInput);
        const userResponse = await input({ message: 'Would you like to order another product? (yes/no)' }) === 'yes';
        /* continueShopping = userResponse.toLowerCase() === 'yes' */
    }
    console.log("Thank you for shopping with us!");
}
startShop();