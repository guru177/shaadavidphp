const chokidar = require('chokidar');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const convert = require('heic-convert');
const ffmpeg = require('fluent-ffmpeg');

// Path to the public folder
const publicDir = path.resolve(__dirname, '../public');

console.log(`\x1b[36m%s\x1b[0m`, `🚀 Media Optimizer started!`);
console.log(`\x1b[32m%s\x1b[0m`, `Watching: ${publicDir}`);
console.log(`Images: .jpg, .jpeg, .png, .gif, .heic -> .webp`);
console.log(`Videos: .mp4, .mov, .avi, .mkv -> .webm\n`);

const watcher = chokidar.watch(publicDir, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000, // Increased for videos
    pollInterval: 100
  }
});

watcher.on('add', async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  
  const imageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.heic'];
  const videoFormats = ['.mp4', '.mov', '.avi', '.mkv'];

  try {
    if (!fs.existsSync(filePath)) return;

    // Handle Images
    if (imageFormats.includes(ext)) {
      const webpPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
      console.log(`📸 Image Detected: ${path.relative(publicDir, filePath)}`);
      
      if (ext === '.heic') {
        const inputBuffer = fs.readFileSync(filePath);
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 1
        });
        await sharp(outputBuffer)
          .resize({ width: 1280, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(webpPath);
      } else {
        await sharp(filePath)
          .resize({ width: 1280, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(webpPath);
      }

      console.log(`✅ Image Converted: ${path.relative(publicDir, webpPath)}`);
      fs.unlinkSync(filePath);
      console.log(`🗑️  Deleted Original Image: ${path.basename(filePath)}`);
    } 
    
    // Handle Videos
    else if (videoFormats.includes(ext)) {
      const webmPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webm');
      console.log(`🎥 Video Detected: ${path.relative(publicDir, filePath)}`);

      ffmpeg(filePath)
        .videoCodec('libvpx-vp9')
        .audioCodec('libopus')
        .outputOptions([
          '-crf 30', // Quality setting (lower is better, 30 is balanced)
          '-b:v 0',  // Required for CRF in VP9
          '-threads 4'
        ])
        .on('start', (commandLine) => {
          console.log(`⏳ Compressing video...`);
        })
        .on('error', (err) => {
          console.error(`❌ Video Error: ${err.message}`);
        })
        .on('end', () => {
          console.log(`✅ Video Converted: ${path.relative(publicDir, webmPath)}`);
          fs.unlinkSync(filePath);
          console.log(`🗑️  Deleted Original Video: ${path.basename(filePath)}`);
        })
        .save(webmPath);
    }

  } catch (err) {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Error processing ${path.basename(filePath)}:`, err.message);
  }
});
