import AdmZip from "adm-zip";

export class ZipService {
  public async readZip(path: string) {
    const zip = new AdmZip(path);
    for (const zipEntry of zip.getEntries()) {
      console.log(zipEntry.toString());
    }
  }
}
