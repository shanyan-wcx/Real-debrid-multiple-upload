const fs = require('fs')
const path = require('path')
const RealDebridClient = require('real-debrid-api')
const config = JSON.parse((fs.readFileSync('./config.json')))
const RD = new RealDebridClient(config.apitoken)

async function uploadTorrents(torrent) {
    try {
        var upload = await RD.torrents.addTorrent(torrent)
        console.log('ID: ' + upload.id)
        var info = (await RD.torrents.info(upload.id)).files
        var ids = []
        for (i in info) {
            try {
                var st = 0
                var extname = config.extname
                for (j in extname) {
                    if (info[i].path.search(extname[j]) != -1) {
                        st = 1
                        break
                    }
                }
            } catch (error) {
                console.log(error)
            }
            if (st) {
                ids.push(info[i].id)
            }
        }
        var files = ''
        for (i in ids) {
            files += ids[i]
            if (i < ids.length - 1) {
                files += ','
            }
        }
        await RD.torrents.selectFiles(upload.id, files, 1)
        console.log('Upload succeeded')
    } catch (error) {
        console.log('Upload failed')
        console.log(error)
        fs.appendFileSync('./Failed.txt', torrent.replace(/torrents\\/g, '') + '\n')
    }
}

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name)
        var stat = fs.statSync(filePath)
        if (stat.isFile()) {
            callback(filePath, stat)
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback)
        }
    })
}

async function walk() {
    var torrents = []
    walkSync('./torrents', async (filePath, stat) => {
        await torrents.push(filePath)
    })
    return torrents
}

async function main() {
    await console.log('Apitoken: ' + config.apitoken)
    await fs.exists('./Failed.txt', (stat) => {
        if (stat) {
            fs.unlinkSync('./Failed.txt')
        }
    })
    var torrents = await walk()
    for (i in torrents) {
        console.log(torrents[i])
        await uploadTorrents(torrents[i])
    }
}

main()