import jsmediatags from './jsmediatags.min'

var AudioElement = document.createElement('audio')
var CanvasElement = document.createElement('canvas')

const getMetadata = (audioSource) => {
	return new Promise((resolve, reject) => {
		jsmediatags.read(audioSource, {
			onSuccess: song => {
				var tags = song.tags
				var artist = tags.artist
				var title = tags.title
				var album = tags.album
				var picture
				console.log('SONG.tags', song.tags)
				if (tags.picture) picture = getBase64Image(tags.picture)
				// if (tags.APIC.length) picture = getBase64Image(tags.APIC[0].data.data)

				resolve({
					artist,
					title,
					album,
					picture
				})
			},
			onError: err => {
				console.log('ERROR ON JSMEDIATAGS')
				reject('FAILED JSMEDIATAGS')
			}
		})

	})
}

function getBase64Image(image) {
	const dataArray = image.data
	const format = image.format

  var base64String = ''
  for (var i = 0; i < dataArray.length; i++) {
      base64String += String.fromCharCode(dataArray[ i ])
  }
  var base64 = 'data:' + format + ';base64,' + window.btoa(base64String)
  return base64


  // CanvasElement.width = img.width;
  // CanvasElement.height = img.height;

  // // Copy the image contents to the canvas
  // var ctx = CanvasElement.getContext("2d");
  // ctx.drawImage(img, 0, 0);

  // // Get the data-URL formatted image
  // // Firefox supports PNG and JPEG. You could check img.src to
  // // guess the original format, but be aware the using "image/jpg"
  // // will re-encode the image.
  // var dataURL = CanvasElement.toDataURL("image/png");

  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
export default getMetadata