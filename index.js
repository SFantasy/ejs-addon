'use strict';

/**
 * Module dependencies
 */

const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

function layout(filePath) {
  this.locals.layoutFile = filePath;
}

function loader(assetsFilePaths) {
  if (!Array.isArray(assetsFilePaths)) return;

  let css = '';
  let js = '';

  function appendAssetString(asset, assetPath) {
    switch (path.extname(asset)) {
      case '.js':
        js += `<script type="text/javascript" src="${assetPath}"></script>`;
        break;
      case '.css':
        css += `<link href="${assetPath}" rel="stylesheet" />`;
        break;
      default:
        return;
    }
  }

  assetsFilePaths.forEach((asset) => {
    const pattern = this.settings['public pattern'];
    const publicPath = this.settings['public path'];

    let assetPath = asset;

    // In production and `public pattern` set
    if (process.env.NODE_ENV === 'production' && pattern) {
      const stats = fs.statSync(path.join(publicPath, asset));
      const mtime = new Date(stats.mtime);
      const timestamp = `${mtime.getFullYear()}${(mtime.getMonth() + 1)}${mtime.getDate()}${mtime.getMinutes()}`;

      assetPath = pattern.replace('@version', timestamp).replace('/@path', asset);
    }

    appendAssetString(asset, assetPath);
  });

  this.css = css;
  this.js = js;
}

function renderFile(filePath, opts, callback) {
  const options = opts;

  if (!options.locals) {
    options.locals = {};
  }

  options.layout = layout.bind(options);
  options.loader = loader.bind(options);

  ejs.renderFile(filePath, options, (err, html) => {
    if (err) {
      return callback(err, html);
    }

    let layoutFile  = options.locals.layoutFile;

    // Layout exists
    if (layoutFile) {
      const engine = options.settings['view engine'] || 'ejs';
      const desiredExt = `.${engine}`;

      if (path.extname(layout) !== desiredExt) {
        layoutFile += desiredExt;
      }

      delete options.locals.layoutFile;

      if (layoutFile.length > 0) {
        let views  = options.settings.views;
        const l = layoutFile;

        if (!Array.isArray(views)) {
          views = [views];
        }

        for (let i = 0; i < views.length; i += 1) {
          layoutFile = path.join(views[i], l);

          if (fs.exists(layoutFile)) break;
        }
      }

      options.body = html;
      return renderFile(layoutFile, options, callback);
    }

    // Render raw view file
    return callback(null, html);
  });
}

renderFile.layout = layout;
renderFile.loader = loader;

module.exports = renderFile;
