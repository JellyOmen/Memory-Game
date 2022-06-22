document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What's your name ?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector('.control-buttons').remove();
};


let duration = 1000;

let blockContainer = document.querySelector(".memory-game");

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        // Trigger The Flip Block Function
        flipBlock(block);

    });

});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        stopClicking();

        checkmatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    blockContainer.classList.add('no-clicking');

    setTimeout(() => {

        blockContainer.classList.remove('no-clicking');

    }, duration);
}

function checkmatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        var audio = document.getElementById('success');
        audio.volume = 0.3;
        audio.play();
    } else {
        setTimeout(() => {

            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);
        var audio = document.getElementById('fail');
        audio.volume = 0.3;
        audio.play();
    }
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }

    return array;
}