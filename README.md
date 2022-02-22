# Real-debrid-multiple-upload
Upload multiple torrents simultaneously on real debrid
***
## How to use
1. Make sure that ==node.js== is installed on your machine. If not, please go to [https://nodejs.org](https://nodejs.org) to install the latest version.
2. Click ==Download ZIP==, download the repository and unzip it.
3. Enter the extracted folder and open ==config.json== with a text editor. You will see the following:
```json
{
    "apitoken": "",
    "extname": [
        ".mkv",
        ".mp4"
    ]
}
```
Fill in the ==API token== of your real debrid in ==apitoken==. If you don't have an ==API token==, please go to [https://real-debrid.com/apitoken](https://real-debrid.com/apitoken) To get it. Then fill in the ==extname== with the ==file type== you want to select, separated by "==,==". Make sure there are no errors and close ==config.json== after saving.</br>
4. Put the torrents you want to upload into the torrents folder.</br>
5. Open the terminal in this folder and run the following command:
```
npm i
node upload.js
```
6. You will see the upload start.
***
## Upload failed
If several files fail to upload, it may be caused by the problem of ==real-debrid-api==. Files that fail to upload will be written to ==Failed.txt==, you can upload them manually after the program is executed, or you can run the program again.