import * as fs from "fs/promises";

    const getImageFileType = async (image: { path: string }): Promise<string> => {
        const determineHeader = (): Promise<string> =>
          new Promise((resolve, reject) => {
            fs.readFile(image.path)
              .then((file: Buffer) => {
                const arr = new Uint8Array(file).subarray(0, 4);
                const header = arr.reduce((result, byte) => result + byte.toString(16), "");
                resolve(header);
              })
              .catch((err: unknown) => {
                reject(new Error(`File read error: ${err instanceof Error ? err.message : "Unknown error"}`));
              });
          });

  try {
    const header = await determineHeader()

    switch(header) {
      case '89504e47':
        return 'image/png';
      case '47494638':
        return "image/gif";
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch {
    return 'unknown';
  }
}

export default getImageFileType;