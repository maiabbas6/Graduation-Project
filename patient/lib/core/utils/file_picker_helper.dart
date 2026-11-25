import 'package:file_selector/file_selector.dart';

enum FileType { any, image, custom }

class FilePickerHelper {
  static const _maxFileSize = 1024 * 1024;
  static const _pdfExtensions = ['pdf'];
  static const _imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'];

  static Future<String?> pickFile({
    FileType type = FileType.any,
    List<String>? allowedExtensions,
  }) async {
    final result = await openFile(
      acceptedTypeGroups: _typeGroups(type, allowedExtensions),
    );
    return result?.path;
  }

  static Future<List<String>?> pickFiles({
    FileType type = FileType.any,
    List<String>? allowedExtensions,
  }) async {
    final results = await openFiles(
      acceptedTypeGroups: _typeGroups(type, allowedExtensions),
    );
    return results.map((file) => file.path).whereType<String>().toList();
  }

  static Future<String?> getImage() => _pickSingle(type: FileType.image);

  static Future<List<String>?> getImages() =>
      _pickMultiple(type: FileType.image);

  static Future<String?> getPdf() =>
      _pickSingle(type: FileType.custom, allowedExtensions: _pdfExtensions);

  static Future<List<String>?> getPdfs() =>
      _pickMultiple(type: FileType.custom, allowedExtensions: _pdfExtensions);

  static List<XTypeGroup> _typeGroups(
    FileType type,
    List<String>? allowedExtensions,
  ) {
    if (type == FileType.any) return const [];
    final extensions = type == FileType.image ? _imageExtensions : allowedExtensions;
    return [XTypeGroup(extensions: extensions)];
  }

  static Future<String?> _pickSingle({
    required FileType type,
    List<String>? allowedExtensions,
  }) async {
    final result = await openFile(
      acceptedTypeGroups: _typeGroups(type, allowedExtensions),
    );
    if (result == null || await result.length() > _maxFileSize) return null;
    return result.path;
  }

  static Future<List<String>?> _pickMultiple({
    required FileType type,
    List<String>? allowedExtensions,
  }) async {
    final results = await openFiles(
      acceptedTypeGroups: _typeGroups(type, allowedExtensions),
    );
    final paths = <String>[];
    for (final file in results) {
      if (await file.length() <= _maxFileSize) {
        paths.add(file.path);
      }
    }
    return paths.isEmpty ? null : paths;
  }
}