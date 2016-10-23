const assets = {
  images: [],
  textures: [],
  videos: [],
  getImage(id) {
    return this.images.find( image => image.id === id );
  },
};

module.exports = assets;
