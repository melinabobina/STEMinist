window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image');
    let imageSources = ['images/straightPipe.png', 'images/bentPipe.png',  'images/bentPipe.png'];

    // Select a random index for the start image
    const startIndex = Math.floor(Math.random() * images.length);
    let endIndex = Math.floor(Math.random() * images.length);
    while(endIndex == startIndex){
        endIndex = Math.floor(Math.random() * images.length);
    }
    while(endIndex == startIndex + 1||endIndex == startIndex - 1||endIndex == startIndex + 5||endIndex == startIndex - 5 ||endIndex == startIndex + 6||endIndex == startIndex - 6 || endIndex == startIndex + 4||endIndex == startIndex - 4){
        endIndex = Math.floor(Math.random() * images.length);
    }

    images.forEach(function(image, index) {
        // Define an array of possible rotation angles
        let possibleRotations = [0, 90, 180, 270];

        const possibleRotationTop = [0, 90, 180];
        const possibleRotationDown = [0, 180, 270];
        const possibleRotationLeft = [0, 90, 270];
        const possibleRotationRight = [90, 180, 270];
        const possibleLeftUp = [0, 90];
        const possibleRightUp = [90, 180];
        const possibleRightDown = [270, 180];
        const possibleLeftDown = [270, 0];

        // Generate a random index to select from the possible rotations
        const randomRotationIndex = Math.floor(Math.random() * possibleRotations.length);
        // Select a random rotation from the possible rotations
        let rotation;

        rotation = possibleRotations[randomRotationIndex]; //stupid code that prevents ends/starts from facing wall
        possibleRotations.splice(randomRotationIndex, 1);
        if (possibleRotations.length === 0) {
            // Reinitialize possibleRotations array
            possibleRotations = [0, 90, 180, 270];
        }

        if(index == startIndex && (startIndex == 3|| startIndex == 1 || startIndex == 2)){
            rotation = possibleRotationTop[Math.floor(Math.random() * possibleRotationTop.length)];
        }
        else if(index == startIndex && (startIndex == 9|| startIndex == 14 || startIndex == 19)){
            rotation = possibleRotationRight[Math.floor(Math.random() * possibleRotationRight.length)];
        }
        else if(index == startIndex && (startIndex == 5|| startIndex == 10 || startIndex == 15)){
            rotation = possibleRotationLeft[Math.floor(Math.random() * possibleRotationLeft.length)];
        }
        else if(index == startIndex && (startIndex == 21|| startIndex == 22 || startIndex == 23)){
            rotation = possibleRotationDown[Math.floor(Math.random() * possibleRotationDown.length)];
        }
        else if(index == startIndex && startIndex == 0){
            rotation = possibleLeftUp[Math.floor(Math.random() * possibleLeftUp.length)];
        }
        else if(index == startIndex && startIndex == 4){
            rotation = possibleRightUp[Math.floor(Math.random() * possibleRightUp.length)];
        }
        else if(index == startIndex && startIndex == 20){
            rotation = possibleLeftDown[Math.floor(Math.random() * possibleLeftDown.length)];
        }
        else if(index == startIndex && startIndex == 24){
            rotation = possibleRightDown[Math.floor(Math.random() * possibleRightDown.length)];
        }

        if(index == endIndex && (endIndex == 3|| endIndex == 1 || endIndex == 2)){ //does the same with the end
            rotation = possibleRotationTop[Math.floor(Math.random() * possibleRotationTop.length)];
        }
        else if(index == endIndex && (endIndex == 9|| endIndex == 14 || endIndex == 19)){
            rotation = possibleRotationRight[Math.floor(Math.random() * possibleRotationRight.length)];
        }
        else if(index == endIndex && (endIndex == 5|| endIndex == 10 || endIndex == 15)){
            rotation = possibleRotationLeft[Math.floor(Math.random() * possibleRotationLeft.length)];
        }
        else if(index == endIndex && (endIndex == 21|| endIndex == 22 || endIndex == 23)){
            rotation = possibleRotationDown[Math.floor(Math.random() * possibleRotationDown.length)];
        }
        else if(index == endIndex && endIndex == 0){
            rotation = possibleLeftUp[Math.floor(Math.random() * possibleLeftUp.length)];
        }
        else if(index == endIndex && endIndex == 4){
            rotation = possibleRightUp[Math.floor(Math.random() * possibleRightUp.length)];
        }
        else if(index == endIndex && endIndex == 20){
            rotation = possibleLeftDown[Math.floor(Math.random() * possibleLeftDown.length)];
        }
        else if(index == endIndex && endIndex == 24){
            rotation = possibleRightDown[Math.floor(Math.random() * possibleRightDown.length)];
        }
  // Set the image source and direction attributes
  if (index === startIndex) {
    // Use the start image source
    image.src = 'images/pipeStart.png';
    console.log("start is at: " + startIndex + " with rotation " + rotation)

    // Set outgoing direction based on rotation angle for the start image
    let outgoingDirection;
        // When mirrored, adjust the outgoing direction accordingly
        switch (rotation) {
            case 0:
                outgoingDirection = 'right';
                break;
            case 90:
                outgoingDirection = 'down';
                break;
            case 180:
                outgoingDirection = 'left';
                break;
            case 270:
                outgoingDirection = 'up';
                break;
            default:
                // Handle other rotation angles if needed
                break;
        }
    // Set outgoing direction attribute
    image.parentElement.dataset.outgoing = outgoingDirection;

}
else if (index === endIndex) {
    // Use the start image source
    image.src = 'images/pipeEnd.png';
    console.log("start is at: " + startIndex + " with rotation " + rotation)


    // Set outgoing direction based on rotation angle for the start image
    let outgoingDirection;
        // When mirrored, adjust the outgoing direction accordingly
        switch (rotation) {
            case 0:
                image.parentElement.dataset.incoming = 'right';
                image.parentElement.dataset.incoming2 = 'right';
                break;
            case 90:
                image.parentElement.dataset.incoming = 'down';
                image.parentElement.dataset.incoming2 = 'down';
                break;
            case 180:
                image.parentElement.dataset.incoming = 'left';
                image.parentElement.dataset.incoming2 = 'left';
                break;
            case 270:
                image.parentElement.dataset.incoming = 'up';
                image.parentElement.dataset.incoming2 = 'up';
                break;
            default:
                break;
        }
    // Set outgoing direction attribute
    image.parentElement.dataset.outgoing = outgoingDirection;
}
else{
    // Use a random image source from the array excluding the start image
    const randomImageIndex = Math.floor(Math.random() * (imageSources.length - 1));
    image.parentElement.dataset.source = imageSources[randomImageIndex];

    // Randomly select incoming and outgoing directions for non-start images
    let incoming;
    let incoming2;

    if (image.parentElement.dataset.source == "images/bentPipe.png") {
        switch (rotation) {
            case 0:
                image.parentElement.dataset.incoming = 'right';
                image.parentElement.dataset.incoming2 = 'up' 
                console.log(index + "Bent pits at 0 DEG at: " + index);
                break;
            case 90:
                image.parentElement.dataset.incoming = 'right';
                image.parentElement.dataset.incoming2 = 'down'; 
                console.log(index + "Bent pits at 90 DEG at: " + index);
                break;
            case 180:
                image.parentElement.dataset.incoming = 'left';
                image.parentElement.dataset.incoming2 = 'down'; 
                console.log(index + "Bent pits at 180 DEG at: " + index);
                break;
            case 270:
                image.parentElement.dataset.incoming = 'left';
                image.parentElement.dataset.incoming2 = 'up'; 
                console.log(index + "Bent pits at 270 DEG at: " + index);
                break;
            default:
                console.log("NO DIR ASSIGNED");
                // Handle other rotation angles if needed
                break;
        }
    } 
    else if(image.parentElement.dataset.source == "images/straightPipe.png"){
        switch (rotation) {
            case 0:
                image.parentElement.dataset.incoming = 'right';
                image.parentElement.dataset.incoming2 = 'left' 
                console.log(index + "straight pits at 0 DEG at: " + index);
                break;
            case 90:
                image.parentElement.dataset.incoming = 'up';
                image.parentElement.dataset.incoming2 = 'down'; 
                console.log(index + "straight pits at 90 DEG at: " + index);
                break;
            case 180:
                image.parentElement.dataset.incoming = 'left';
                image.parentElement.dataset.incoming2 = 'right'; 
                console.log(index + "straight pits at 180 DEG at: " + index);
                break;
            case 270:
                image.parentElement.dataset.incoming = 'down';
                image.parentElement.dataset.incoming2 = 'up'; 
                console.log(index + "straight pits at 270 DEG at: " + index);
                break;
            default:
                console.log("NO DIR ASSIGNED");
                // Handle other rotation angles if needed
                break;
            }
        }

        imageSources.splice(randomImageIndex, 1);
        console.log(imageSources.length)
        if(imageSources.length == 0) {
            // Reinitialize possibleRotations array
            imageSources =  ['images/straightPipe.png', 'images/bentPipe.png',  'images/bentPipe.png'];
        }
    }
        image.style.transform = `rotate(${rotation}deg)`;
        image.parentElement.dataset.clicked = "False";
    });
});