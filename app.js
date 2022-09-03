var calculateBtn = document.querySelector('#btn-calculate');
var initialPrice = document.querySelector('#initial-price');
var currentPrice = document.querySelector('#current-price');
var quantity = document.querySelector('#quantity');
var messageArea = document.querySelector("#message");
var imageHero = document.querySelector(".hero");
var gifContainer = document.querySelector(".gif-container");
var mainContainer = document.querySelector("main");


const colors = {
    offWhite:"#fefce8",
    positiveColor: "#5CDB95",
    dangerColor: "#f87171",
    primaryColor:'#7dd3fc'
};

gifContainer.style.display = 'none'

function calculatePercent(value,initPrice){
    var valuePercent = ((value / initPrice) * 100).toFixed(2)
    return valuePercent
}

function calculateProfitorLoss(initPrice,curPrice,quant) {
    
    if (initPrice === curPrice) {
        messageArea.innerText = 'No Profit, No Loss! In Markets, patience responds!'
        mainContainer.style.backgroundColor = colors.offWhite
        imageHero.src = "nopl.gif"

    } else if (initPrice > curPrice) {
        
        var loss = (initPrice - curPrice)
        var netloss = (loss * quant).toFixed(2)
        var lossPercent = calculatePercent(loss,initPrice)
        messageArea.innerText = `You incurred a total loss of ₹${netloss}.\n Loss Percentage ~ ${lossPercent}%`
        // Style update based on loss status
        mainContainer.style.backgroundColor = colors.dangerColor
        imageHero.src = "loss.gif"  
    } else {
        
        var profit = (curPrice - initPrice)
        var netprofit = (profit * quant).toFixed(2)
        var profitPercent = calculatePercent(profit,initPrice)
        messageArea.innerText = `You incurred a profit of ₹${netprofit}.\n Profit Percentage ~ ${profitPercent}%`
         // Style update based on profit status
        mainContainer.style.backgroundColor = colors.positiveColor
        imageHero.src = "profit.gif"
    }
    gifContainer.style.display = 'block'
}

function changeType(value){
    return Number(value)
}

function clickHandler() {
    
    var initPrice = initialPrice.value;
    var curPrice = currentPrice.value;
    var quant = quantity.value;
    
    // Error checking
    if (initPrice === "" || curPrice === "" || quant === "")
    {
        gifContainer.style.display = 'none'
        mainContainer.style.backgroundColor = colors.primaryColor
        messageArea.innerText =''
        alert('Please fill out all Fields')
        
    } else {
        initPrice = changeType(initPrice)
        curPrice = changeType(curPrice)
        quant = changeType(quant)

        if (initPrice < 0 || curPrice < 0) {
            messageArea.innerText = 'Price of a stock cannot be less than 0'
            // Styling to be restored if user is on same page
            gifContainer.style.display = 'none'
            mainContainer.style.backgroundColor = colors.primaryColor

        } else if (quant <= 0){
            messageArea.innerText = 'Quantity bought should be greater than 0'
            // Styling to be restored if user is on same page
            gifContainer.style.display = 'none'
            mainContainer.style.backgroundColor = colors.primaryColor

        } else {
            // Calculate profit or loss
            calculateProfitorLoss(initPrice,curPrice,quant);
            
        }
    }
}
calculateBtn.addEventListener('click',clickHandler)