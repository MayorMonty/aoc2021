const { promises: fs, read } = require("fs");
const { exit } = require("process");

function zeros(str, length) {
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

function hexToBinary(hex) {
  return hex
    .split("")
    .map((c) => zeros(parseInt(c, 16).toString(2), 4))
    .join("");
}

function readPacket(binary) {
  binary = binary.split("");
  const version = parseInt(binary.splice(0, 3).join(""), 2);
  const typeID = parseInt(binary.splice(0, 3).join(""), 2);

  if (typeID == 4) {
    let buffer = "";
    while (true) {
      const sub = binary.splice(0, 5).join("").padEnd(5, "0");
      buffer += sub.substring(1);
      if (sub[0] == "0") break;
    }
    const value = parseInt(buffer, 2);

    return { type: "literal", typeID, version, value, remaining: binary.join("") };
  } else {
    const mode = binary.splice(0, 1)[0];
    if (mode == "0") {
      const length = parseInt(binary.splice(0, 15).join(""), 2);
      let buffer = binary.splice(0, length).join("");
      const packets = [];

      while (buffer.length > 0) {
        const packet = readPacket(buffer);
        packets.push(packet);
        buffer = packet.remaining;
      }

      return {
        type: "operator",
        typeID,
        version,
        mode,
        packets,
        remaining: binary.join(""),
      };
    } else {
      const numPackets = parseInt(binary.splice(0, 11).join(""), 2);
      let buffer = binary.join("");

      const packets = [];
      for (let i = 0; i < numPackets; i++) {
        const packet = readPacket(buffer);
        packets.push(packet);
        buffer = packet.remaining;
      }

      return {
        type: "operator",
        typeID,
        version,
        mode,
        packets,
        remaining: buffer,
      };
    }
  }
}

function sumVersions(packet) {
  if (packet.type == "literal") {
    return packet.version;
  } else {
    const versions = packet.packets.map(sumVersions);
    return packet.version + versions.reduce((a, b) => a + b, 0);
  }
}

(async function () {
  const input = await fs.readFile("in", "utf8");
  const binary = hexToBinary(input);
  const packet = readPacket(binary);
  const version = sumVersions(packet);

  console.log(version);
})();
