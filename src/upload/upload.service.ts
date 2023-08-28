import * as fs from 'fs';
import * as path from 'path';
import * as compressImages from 'compress-images';

export async function uploadService(
  file: Express.Multer.File,
  vitri: string,
  id: string,
) {
  if (!file) {
    return 'Vui lòng chọn một tập tin hợp lệ.';
  }

  // Tạo tên file mới
  const timestamp = new Date().getTime();
  const newFileName = `${vitri}${id}-${timestamp}_${file.originalname}`;

  // Lưu tập tin vào thư mục public/img
  const uploadPath = path.join(process.cwd(), 'public', 'img', newFileName);

  await fs.promises.writeFile(uploadPath, file.buffer);

  // Xóa các tệp ảnh cùng vtriToDelete và id giống newFileName trong thư mục vitri
  const vitriPath = path.join(process.cwd(), 'public', 'img_compress', vitri);
  const filesInVitri = await fs.promises.readdir(vitriPath);
  const filesToDelete = filesInVitri.filter(
    (fileName) => fileName.startsWith(`${vitri}${id}`), // Sử dụng vtriToDelete và id để xác định file cần xóa
  );

  for (const fileToDelete of filesToDelete) {
    const filePathToDelete = path.join(vitriPath, fileToDelete);
    await fs.promises.unlink(filePathToDelete);
  }

  // Nén ảnh và sao chép vào thư mục public/img_compress
  const sourcePath = `${process.cwd()}/public/img/${newFileName}`;
  const outputPath = `./public/img_compress/${vitri}/`;
  await compressImage(sourcePath, outputPath);

  // Xóa ảnh gốc
  await fs.promises.unlink(sourcePath);

  // Trả về tên ảnh đã chỉnh sửa
  return newFileName;
}

export async function compressImage(sourcePath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    compressImages(
      sourcePath,
      outputPath,
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
      { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
      { svg: { engine: 'svgo', command: '--multipass' } },
      {
        gif: {
          engine: 'gifsicle',
          command: ['--colors', '64', '--use-col=web'],
        },
      },
      async (error: Error, completed: boolean) => {
        if (error) {
          reject(error);
        } else {
          if (completed) {
            resolve();
          }
        }
      },
    );
  });
}
