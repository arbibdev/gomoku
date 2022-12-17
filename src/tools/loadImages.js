var imagesLoaded = 0

const loadImages = (imagesToLoad, imgNames) => {
    return new Promise((resolve, reject) => {
        var images = []
        for (var c = 0; c < imagesToLoad.length; c++){
            images[imgNames[c]] = new Image()
            images[imgNames[c]].src = imagesToLoad[c]
            // eslint-disable-next-line
            images[imgNames[c]].onload = () => {
                imagesLoaded += 1
                if (imagesLoaded === imagesToLoad.length)
                    resolve(images)
            }
        }
    })
}

export default loadImages