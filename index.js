const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');


async function run() {

  try {
    
    let version = core.getInput('version');
    let platform = core.getInput('platform');
    let os = core.getInput('os');
    let downloadURL = core.getInput('download_url');

    const fillTemplate = function(s) {
      s = s.replace(/\$\{version\}/g, version)
      s = s.replace(/\$\{platform\}/g, platform)
      s = s.replace(/\$\{os\}/g, os)
      return s
    }
    
    downloadURL = fillTemplate(downloadURL);
    core.info(`bundle donwload URL: ${downloadURL}`)
    
    await installTool(version, downloadURL);    
    await exec.exec('bundle version');
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function installTool(version, url) {
  let cachedPath = tc.find('bundle', version)
  if (cachedPath) {
      core.addPath(cachedPath)
      return
  }

  const file = await tc.downloadTool(url);

  await exec.exec(`rm -rf bundle`)
  await exec.exec(`mkdir bundle`)
  await exec.exec(`tar -C bundle -xzvf ${file} --strip-components 0 --wildcards bundle`)

  cachedPath = await tc.cacheDir('bundle', 'bundle', version);
  core.addPath(cachedPath)
}

run();