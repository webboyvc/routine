const _ = require('lodash');

class NodesStorage {
  constructor(buffer) {
    this.buffer = buffer || Buffer.alloc(10000);
  }

  set(i, data) {
    const id = _.padStart(data.id, 16, ' ');
    this.buffer.write(id, i * 28 + 0);
    this.buffer.writeInt32BE(Math.round(Number(data.location[0]) * 10000000), i * 28 + 16);
    this.buffer.writeInt32BE(Math.round(Number(data.location[1]) * 10000000), i * 28 + 20);
    this.buffer.writeInt32BE(data.firstEdgeId, i * 28 + 24);
  }

  get(i) {
    const id = this
      .buffer
      .slice(i * 28, i * 28 + 16)
      .toString('utf-8')
      .trim();
    const longitude = this.buffer.readInt32BE(i * 28 + 16) / 10000000;
    const latitude = this.buffer.readInt32BE(i * 28 + 20) / 10000000;
    const firstEdgeId = this.buffer.readInt32BE(i * 28 + 24);
    return {
      id,
      location: [longitude, latitude],
      firstEdgeId: firstEdgeId,
    };
  }
}

module.exports = NodesStorage;