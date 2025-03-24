import kols from "./kols.json" with { type: "json" };
console.log(Buffer.from(JSON.stringify(kols)).toString("base64"));
