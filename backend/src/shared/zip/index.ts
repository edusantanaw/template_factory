import AdmZip from "adm-zip";

export class ZipService {
  public async *readZip(path: string) {
    const zip = new AdmZip(path);
    for (const zipEntry of zip.getEntries()) {
      yield zipEntry;
    }
  }

  public async createZip(path: string, output: string) {
    console.log(output);
    const zip = new AdmZip();
    zip.addLocalFolder(path)
    const res = await zip.writeZipPromise(output);
    console.log(res);
}
}
