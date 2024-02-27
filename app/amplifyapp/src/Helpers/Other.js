const videoTypes = ["webm", "ogg", "mp4", "x-matroska"];
const videoCodecs = ["should-not-be-supported","vp9", "vp9.0", "vp8", "vp8.0,opus", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];

/**
 * Retrieves the list of supported MIME types based on the provided media type, types, and codecs.
 *
 * @param {string} media - The media type
 * @param {Array} types - The array of media types
 * @param {Array} codecs - The array of codecs
 * @return {Array} The list of supported MIME types
 */
export function getSupportedMimeTypes(media, types = videoTypes, codecs = videoCodecs) {
    const isSupported = MediaRecorder.isTypeSupported;
    const supported = [];
    types.forEach((type) => {
      const mimeType = `${media}/${type}`;
      codecs.forEach((codec) => [
          `${mimeType};codecs=${codec}`,
          `${mimeType};codecs=${codec.toUpperCase()}`,
          // /!\ false positive /!\
          // `${mimeType};codecs:${codec}`,
          // `${mimeType};codecs:${codec.toUpperCase()}` 
        ].forEach(variation => {
          if(isSupported(variation)) 
              supported.push(variation);
      }));
      if (isSupported(mimeType))
        supported.push(mimeType);
    });
    return supported;
  };

export function getFileExtensionForMimeType(mimeType) {
    let type = mimeType.split(';')[0]; // Split the string and take the first part
  
    switch(type) {
      case 'video/webm':
        return '.webm';
      case 'video/mp4':
        return '.mp4';
      case 'audio/ogg':
        return '.ogg';
      case 'audio/mpeg':
        return '.mp3';
      default:
        return '';
    }
  }