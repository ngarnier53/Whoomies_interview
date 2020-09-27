const ParseDashboard = require("parse-dashboard");

function toArray(string) {
  return string.split(" ");
}

function getApps() {
  let appNames = toArray(process.env.APP_NAMES);
  let appIds = toArray(process.env.APP_IDS);
  let appMasterKeys = toArray(process.env.MASTER_KEYS);
  let hostNames = toArray(process.env.HOST_ADDRESSES);
  let javascriptKey = toArray(process.env.JS_KEYS);
  let fileKey = toArray(process.env.FILE_KEYS);
  var i = 0;
  return appNames.map(appName => {
    let app = parseApp(
      appName,
      hostNames[i],
      appIds[i],
      appMasterKeys[i],
      javascriptKey[i],
      fileKey[i]
    );
    i++;
    return app;
  });
}

function parseApp(appName, host, appId, masterKey, javascriptKey, fileKey) {
  return {
    appName: appName,
    serverURL: host + "/" + appName,
    // Updated by NG. icon_name -> iconName
    iconName: "whoomies.png",
    appId: appId,
    masterKey: masterKey,
    javascriptKey: javascriptKey,
    fileKey: fileKey
  };
}

const _apps = getApps();

function getParseAdmin() {
  const users = toArray(process.env.ADMIN_WHOOMIES_USERS);
  const creds = toArray(process.env.ADMIN_WHOOMIES_CREDS);

  var i = 0;
  return users.map(user => {
    let dict = {
      user: user,
      pass: creds[i],
      apps: _apps
    };
    i++;
    return dict;
  });
}
const _users = getParseAdmin();

const _dashboard = new ParseDashboard(
  {
    apps: _apps,
    iconsFolder: "icons",
    users: _users,
    trustProxy: process.env.PARSE_DASHBOARD_TRUST_PROXY
  },
  {
    useEncryptedPasswords: false,
    allowInsecureHTTP: process.env.PARSE_DASHBOARD_ALLOW_INSECURE_HTTP
  }
);

exports.dashboard = _dashboard;
