const seatSelected = {};
let seatCount = 0;

const remainingSeat = document.getElementById('remainingSeat');
const SelectionId = document.getElementById('selection');
const priceTable = document.getElementById('pricing');
const totalElement = document.getElementById('total');
const voucher = document.getElementById('coupon');
const couponInput = document.getElementById('couponInput');
const grandTotal = document.getElementById('grandTotal');
const couponField = document.getElementById('couponField');
let finalAmount = 0;
let amount = 0;

function ticketPurchase(elementId) {
    const ticketSection = document.getElementById(elementId);
    if (ticketSection) {
        ticketSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function seatSelect(event) {
    if (event.target.id.match(/[A-B][1-4]/)) {
        const SeatId = event.target.id;
        const elementId = document.getElementById(SeatId);

        if (seatSelected[SeatId] !== undefined) {
            const closestDiv = event.target.closest('div');
            closestDiv.classList.remove('bg-green-400');
            elementId.classList.remove('text-white');
            closestDiv.classList.add('bg-stone-50');
            elementId.classList.add('text-gray-400');
            delete seatSelected[SeatId];
            seatCount--;
            removeSeatFromTable(SeatId);
        } else {
            if (seatCount >= 4) {
                alert("All seats are taken!");
                return;
            }

            const closestDiv = event.target.closest('div');
            closestDiv.classList.add('bg-green-400');
            elementId.classList.add('text-white');
            closestDiv.classList.remove('bg-stone-50');
            elementId.classList.remove('text-gray-400');
            addSeatToTable(SeatId);
            seatSelected[SeatId] = true;
            seatCount++;
        }
    }
    SelectionId.textContent = `${seatCount}`;
    remainingSeat.textContent = `Remaining Seats: ${8 - seatCount}`;
     amount = seatCount*550;
    totalElement.textContent = `${amount}`;

    if(seatCount===4){
        couponField.classList.remove('hidden');

    }
    else
    {
        couponField.classList.add('hidden');

    }
}

function addSeatToTable(seatId) {
    const row = priceTable.insertRow();
    const cellSeatId = row.insertCell();
    const cellClass = row.insertCell();
    const cellPrice = row.insertCell();

    cellSeatId.textContent = seatId;
    cellClass.textContent = 'Economy';
    cellPrice.textContent = '550';
}

function removeSeatFromTable(seatId) {
    for (let i = 0; i < priceTable.rows.length; i++) {
        if (priceTable.rows[i].cells[0].textContent === seatId) {
            priceTable.deleteRow(i);
            break;
        }
    }
}
voucher.addEventListener('click',function()
{
    const value = couponInput.value;
   if (couponValidity(value)){
    if(value==="NEW15"){
        finalAmount = amount-(amount*15)/100;
        grandTotal.textContent = `${finalAmount}`;
    }

    else{
        finalAmount = amount-(amount*20)/100;
        grandTotal.textContent = `${finalAmount}`;
    }
   }

   else
   {
    alert("Coupon Not VALID!!!!")
   }

});
function couponValidity (coupon){
    return coupon === "NEW15"|| coupon === "Couple 20";
}

document.addEventListener('click', seatSelect);
