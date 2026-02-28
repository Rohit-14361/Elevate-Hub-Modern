const cloudinary = require('cloudinary').v2

// Configure Cloudinary timeout
cloudinary.config({
  timeout: 300000, // 5 minutes timeout for large uploads
})


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {
        folder,
        timeout: 300000, // 5 minutes timeout
    };
    
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    
    // Detect if file is video
    const isVideo = file.mimetype && file.mimetype.startsWith('video/');
    options.resource_type = isVideo ? "video" : "auto";

    // For large video files (> 20MB), use chunked upload
    const fileSizeMB = file.size / (1024 * 1024);
    if (isVideo && fileSizeMB > 20) {
        options.chunk_size = 6000000; // 6MB chunks
        options.use_chunked_upload = true;
    }

    try {
        console.log("Uploading to Cloudinary:", {
            fileSize: fileSizeMB.toFixed(2) + "MB",
            mimeType: file.mimetype,
            isVideo: isVideo
        });
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        // If chunked upload fails, try without chunking
        if (options.chunk_size) {
            delete options.chunk_size;
            delete options.use_chunked_upload;
            console.log("Retrying without chunked upload...");
            return await cloudinary.uploader.upload(file.tempFilePath, options);
        }
        throw error;
    }
}
