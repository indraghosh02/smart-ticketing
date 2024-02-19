const seatSelected={}
let seatCount =0;
function ticketPurchase(elementId){
    const ticketSection = document.getElementById(elementId);
    if (ticketSection) {
        ticketSection.scrollIntoView({ behavior: 'smooth' });
            }
}
function seatSelect(event){
    if( event.target.id.match(/[A-B][1-4]/i)){
        const SeatId= event.target.id;
        const elementId = document.getElementById(SeatId);
        if(seatSelected[elementId]){
            const closestDiv = event.target.closest('div');
            closestDiv.classList.remove('bg-green-400');
            elementId.classList.remove('text-white');
            closestDiv.classList.add('bg-stone-50');
            elementId.classList.add('text-gray-400');
            seatSelected[elementId] = false;
            seatCount--;
            
        }
        else{
            const closestDiv = event.target.closest('div');
            closestDiv.classList.add('bg-green-400');
            elementId.classList.add('text-white');
            closestDiv.classList.remove('bg-stone-50');
            elementId.classList.remove('text-gray-400');
            seatSelected[elementId] = true;
            seatCount++;

        }
    }
    

}

document.addEventListener('click', seatSelect);


 