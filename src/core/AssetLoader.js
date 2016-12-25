import assets from 'config/assets';
import Emitter from 'core/Emitter';
import CONSTANTS from 'config/constants';
import ressources from 'config/ressources';
import { TextureLoader } from 'three';

class AssetLoader {

  constructor() {
    this.assetsToLoad = 0;
    this.assetsLoaded = 0;
    this.emitter = Emitter;

    if (typeof ressources.images !== 'undefined' && ressources.images.length > 0) {
      this.assetsToLoad += ressources.images.length;
      this.loadImages();
    }

    if (typeof ressources.textures !== 'undefined' && ressources.textures.length > 0) {
      this.assetsToLoad += ressources.textures.length;
      this.loadTextures();
    }
    if (typeof ressources.videos !== 'undefined' && ressources.videos.length > 0) {
      this.assetsToLoad += ressources.videos.length;
      this.loadVideos();
    }
  }

  loadImages() {
    const images = ressources.images;

    for ( let i = 0; i < images.length; i += 1 ) {

      this.loadImage( images[i] ).then( ( image ) => {

        assets.images.push( image );
        this.assetsLoaded += 1;

        const percent = (this.assetsLoaded / this.assetsToLoad) * 100;
        console.log('images', percent);
        this.emitter.emit(CONSTANTS.EVENTS.ASSET_LOADED, percent );
        if (percent === 100) this.emitter.emit(CONSTANTS.EVENTS.ASSETS_LOADED);
      }, (err) => {
        console.log(err);
      });

    }
  }

  loadImage(media) {
    return new Promise( ( resolve, reject ) => {
      const image = new Image();
      image.alt = media.description;

      image.onload = () => {
        resolve( { id: media.id, media: image } );
      };

      image.onerror = () => {
        reject(`Erreur lors du chargement de l'image : ${image.src}`);
      };

      image.src = media.url;
    });
  }

  loadTextures() {
    const textures = ressources.textures;

    for ( let i = 0; i < textures.length; i += 1 ) {

      this.loadTexture( textures[i] ).then( ( texture ) => {
        assets.textures.push( texture );
        this.assetsLoaded += 1;

        const percent = (this.assetsLoaded / this.assetsToLoad) * 100;
        console.log('textures', percent);
        this.emitter.emit(CONSTANTS.EVENTS.ASSET_LOADED, percent );
        if (percent === 100) this.emitter.emit(CONSTANTS.EVENTS.ASSETS_LOADED);
      }, (err) => {
        console.log(err);
      });

    }
  }

  loadTexture(media) {
    return new Promise( ( resolve, reject ) => {
      new TextureLoader().load(
        media.url,
        ( texture ) => {
          resolve( { id: media.id, media: texture } );
        },
        ( xhr ) => {
          console.log( `${( ( xhr.loaded / xhr.total ) * 100)} % loaded` );
        },
        ( xhr ) => {
          reject( `Une erreur est survenue lors du chargement de la texture : ${xhr}` );
        }
      );
    });
  }

  loadVideos() {
    const videos = ressources.videos;

    for ( let i = 0; i < videos.length; i += 1 ) {

      this.loadVideo( videos[i] ).then( ( video ) => {
        assets.videos.push( video );
        this.assetsLoaded += 1;
        const percent = (this.assetsLoaded / this.assetsToLoad) * 100;
        console.log('videos', percent);
        this.emitter.emit(CONSTANTS.EVENTS.ASSET_LOADED, percent );
        if (percent === 100) this.emitter.emit(CONSTANTS.EVENTS.ASSETS_LOADED);
      }, (err) => {
        console.log(err);
      });

    }
  }

  loadVideo(media) {
    return new Promise( ( resolve, reject ) => {
      const video = document.createElement('video');

      video.oncanplaythrough = () => {
        resolve( { id: media.id, media: video } );
      };

      video.oncanplay = () => {
        resolve( { id: media.id, media: video } );
      };

      video.onloadedmetadata = () => {
        resolve( { id: media.id, media: video } );
      };

      video.onloadeddata = () => {
        resolve( { id: media.id, media: video } );
      };

      const interval = setInterval( () => {
        if ( video.readyState === 4 ) {
          clearInterval(interval);
          resolve( { id: media.id, media: video } );
        }
      }, 100);

      video.onerror = () => {
        reject(`Une erreur est survenue lors du chargement de la video : ${video}`);
      };

      video.src = media.url;

    });
  }
}

export default new AssetLoader();
